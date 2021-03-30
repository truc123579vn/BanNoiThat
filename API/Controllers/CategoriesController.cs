using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController: ControllerBase
    {
        //Khai bao database context
        private readonly SellingFurnitureContext _context;
         //Khai bao Auto Mapper
        private readonly IMapper _mapper;
        public CategoriesController(SellingFurnitureContext context, IMapper mapper )
        {
            _context = context;
            _mapper = mapper ;
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryDTO>> GetCategories()
        {
            // lay DL tu model
            var categories =  await _context.Categories.ToListAsync();
            // Chuyen doi list category tu model sang DTO
            var categoriesDTO = _mapper.Map<List<Category>,List<CategoryDTO>>(categories);
            //Tra ve DL DTO
            return categoriesDTO;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetCategoryById(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }
            // Chuyen doi 1 category tu model sang DTO
            var categoryDTO = _mapper.Map<Category,CategoryDTO>(category);
            //Tra ve DL DTO
            return categoryDTO ; 
        }

       [HttpPost]
        public async Task<ActionResult<CategoryDTO>> CreateCategory(CategoryDTO categoryDTO)
        {
            //chuyen doi 1 category tu DTO sang model
            var category = _mapper.Map<CategoryDTO,Category>(categoryDTO);
            _context.Categories.Add(category);
            // Luu du lieu len _context
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategories), new { Id = category.Id }, category);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(CategoryDTO categoryDTO)
        {
            var category = await _context.Categories.FindAsync(categoryDTO.Id);

            if (category == null) return NotFound();

            _mapper.Map<CategoryDTO,Category>(categoryDTO,category);
            //category = _mapper.Map<Category>(categoryDTO);
            _context.Categories.Update(category);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ProductExists(category.Id))
            {
                return NotFound();
            }

           return CreatedAtAction(nameof(GetCategories), new { Id = category.Id }, category);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return NotFound();

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Categories.Any(c => c.Id == id);
        }
    }
      
    }