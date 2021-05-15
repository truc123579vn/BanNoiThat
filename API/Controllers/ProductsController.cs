using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ProductsController : ControllerBase
    {
        private readonly SellingFurnitureContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductsController(SellingFurnitureContext context, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductDTO>> GetProducts()
        {
            // lay DL tu model
            // Include la bao gom khoa ngoai, tuc la co the lay thuoc tinh trong khoa ngoai
            var products = await _context.Products.ToListAsync();
            // Chuyen doi list Products tu model sang DTO     
            var productsDTO = _mapper.Map<List<Product>, List<ProductDTO>>(products);
            return productsDTO;

            // var products = await _context.Products.Include(p => p.Category.Name).ToListAsync();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }
            // Chuyen doi 1 product tu model sang DTO
            var productDTO = _mapper.Map<Product, ProductDTO>(product);
            return productDTO;
        }

        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<ProductDTO>> CreateProduct([FromForm] ProductDTO productDTO)
        {

            var catName = await _context.Categories.FindAsync(productDTO.Category_Id);
            if (productDTO.ImageFile != null)
            {
                string folder = "/Ban" + "/";
                folder += Guid.NewGuid() + productDTO.ImageFile.FileName;

                productDTO.Image = folder;

                string serverFolder = Path.Combine(_webHostEnvironment.ContentRootPath, "../angular/src/assets/picture" + folder);

                productDTO.ImageFile.CopyTo(new FileStream(serverFolder, FileMode.Create));
            }

            //chuyen doi 1 category tu DTO sang model
            var product = _mapper.Map<ProductDTO, Product>(productDTO);
            _context.Products.Add(product);
            // Luu du lieu len _context
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProducts), new { Id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct([FromForm] ProductDTO productDTO)

        {


            if (productDTO.ImageFile != null)
            {
                Boolean flag = false; ;

                string folder = "/Ban" + "/";
                folder += Guid.NewGuid() + productDTO.ImageFile.FileName;
                //Kiểm tra cái hình này có trong cái folder đó hay không
                DirectoryInfo d = new DirectoryInfo("../angular/src/assets/picture/Ban/");//Assuming Test is your Folder
                FileInfo[] Files = d.GetFiles(); //Getting Text files
                foreach (FileInfo file in Files)
                {
                    if (file.Name.Contains(productDTO.ImageFile.FileName))
                    {
                        productDTO.Image = "/Ban" + "/" + file.Name;
                        flag = true;
                        break;

                    }

                }
                if (flag == false)
                {
                    productDTO.Image = folder;
                    string serverFolder = Path.Combine(_webHostEnvironment.ContentRootPath, "../angular/src/assets/picture" + folder);

                    productDTO.ImageFile.CopyTo(new FileStream(serverFolder, FileMode.Create));
                }



            }
            var product = await _context.Products.FindAsync(productDTO.Id);

            if (product == null) return NotFound();

            _mapper.Map<ProductDTO, Product>(productDTO, product);
            _context.Products.Update(product);

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException) when (!ProductExists(product.Id))
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(p => p.Id == id);
        }

        // [HttpPost]
        // [Route("Hello")]
        // public async Task<IActionResult> Upload(IFormFile file)
        // {


        //     return Ok(file);

        // }
    }
}