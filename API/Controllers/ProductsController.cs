using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using DTOs;
using Microsoft.AspNetCore.Authorization;
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

        public ProductsController(SellingFurnitureContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
        public async Task<ActionResult<ProductDTO>> CreateProduct(ProductDTO productDTO)
        {
            //chuyen doi 1 category tu DTO sang model
            var product = _mapper.Map<ProductDTO, Product>(productDTO);
            _context.Products.Add(product);
            // Luu du lieu len _context
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProducts), new { Id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(ProductDTO productDTO)
        {
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
    }
}