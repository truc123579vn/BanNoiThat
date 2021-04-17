using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.InputModels;
using API.Models;
using AutoMapper;
using Data;
using DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly SellingFurnitureContext _context;
        private readonly IMapper _mapper;
        private UserManager<AppUser> _userManager;

        public OrdersController(SellingFurnitureContext context, IMapper mapper, UserManager<AppUser> userManager  )
        {
            _context = context;
            _mapper = mapper ;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IEnumerable<OrderDTO>> GetOrders()
        {
            // lay DL tu model
            // Include la bao gom khoa ngoai, tuc la co the lay thuoc tinh trong khoa ngoai
            var orders = await _context.Orders.Include(u => u.AppUser).
            Include(oDetail => oDetail.OrderDetails).ThenInclude(p => p.Product).
            ToListAsync();
            // Chuyen doi list Products tu model sang DTO     
            var ordersDTO = _mapper.Map<List<Order>,List<OrderDTO>>(orders);
            return ordersDTO;

            // var products = await _context.Products.Include(p => p.Category.Name).ToListAsync();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }
         // Chuyen doi 1 product tu model sang DTO
            var orderDTO = _mapper.Map<Order,OrderDTO>(order);
            return orderDTO;
        }

        [HttpPost]
        public async Task<ActionResult<OrderDTO>> CreateOrder(OrderInput orderInput)
        {
            var user = await _userManager.FindByNameAsync(orderInput.Username);

            var order = new Order(user,orderInput.FirstName,orderInput.LastName, orderInput.Address);

            order.OrderDetails = orderInput.OrderDetails.Select(item =>
            {
                var product = _context.Products.Find(item.ProductId);
                return new OrderDetail
                {
                    Amount = item.Amount > 0 ? item.Amount : 1,
                    Price = product.Price,
                    Product = product
                };
            }).ToList();

            var subTotal = order.OrderDetails.Sum(od => od.Price * od.Amount);
            order.TotalPrice = subTotal;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<Order,OrderDTO>(order));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(OrderDTO orderDTO)
        {
            var order = await _context.Orders.FindAsync(orderDTO.Id);

            if (order == null) return NotFound();

            _mapper.Map<OrderDTO,Order>(orderDTO,order);
            _context.Orders.Update(order);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!OrderExists(order.Id))
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Products.Any(p => p.Id == id);
        }
    }
}