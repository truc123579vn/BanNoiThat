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

        public OrdersController(SellingFurnitureContext context, IMapper mapper, UserManager<AppUser> userManager)
        {
            _context = context;
            _mapper = mapper;
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
            var ordersDTO = _mapper.Map<List<Order>, List<OrderDTO>>(orders);
            return ordersDTO;

            // var products = await _context.Products.Include(p => p.Category.Name).ToListAsync();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound(order);
            }
            // Chuyen doi 1 product tu model sang DTO
            var orderDTO = _mapper.Map<Order, OrderDTO>(order);
            return orderDTO;
        }

        [HttpPost]

        [Authorize(Policy = "Customer")]
        public async Task<ActionResult<OrderDTO>> CreateOrder(OrderInput orderInput)
        {
            var user = await _userManager.FindByIdAsync(orderInput.user_id.ToString());
            //if (orderInput != null)
            //{

            var order = new Order(user, orderInput.Address);


            order.OrderDetails = orderInput.OrderDetails.Select(item =>
            {
                var product = _context.Products.Find(item.ProductId);
                return new OrderDetail
                {
                    Amount = item.Qty > 0 ? item.Qty : 1,
                    Price = product.Price,
                    Product = product,
                    ProductID = item.ProductId
                };

            }).ToList();

            var subTotal = order.OrderDetails.Sum(od => od.Price * od.Amount) + 300000;
            order.TotalPrice = subTotal;

            foreach (var item in order.OrderDetails)
            {
                var product = _context.Products.Find(item.ProductID);
                // if (product == null){
                //     return BadRequest(item.ProductID);
                // }
                product.Amount = product.Amount - item.Amount;
                _context.Products.Update(product);
            }


            _context.Orders.Add(order);
            await _context.SaveChangesAsync();


            // }
            if (orderInput == null)
            {
                return BadRequest(new { message = "Error" });
            }
            else
            {
                return Ok(_mapper.Map<Order, OrderDTO>(order));
            }


        }



        [HttpPut("{id}")]
        [Authorize(Policy = "Customer")]
        public async Task<ActionResult<OrderDTO>> UpdateOrderStatus(int Id)
        {
            var order = await _context.Orders.FindAsync(Id);
            if (order == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn đật hàng này" });
            }

            order.Status = "Đã Duyệt";
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            var orderDTO = _mapper.Map<OrderDTO>(order);
            return Ok(orderDTO);

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