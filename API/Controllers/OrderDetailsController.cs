// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using AutoMapper;
// using Data;
// using DTOs;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Models;

// namespace Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class OrderDetailsController : ControllerBase
//     {
//         private readonly SellingFurnitureContext _context;
//         private readonly IMapper _mapper;

//         public OrderDetailsController(SellingFurnitureContext context, IMapper mapper )
//         {
//             _context = context;
//             _mapper = mapper ;
//         }

//         [HttpGet]
//         public async Task<IEnumerable<OrderDetailDTO>> GetOrderDetails()
//         {
//             // lay DL tu model
//             // Include la bao gom khoa ngoai, tuc la co the lay thuoc tinh trong khoa ngoai
//             var orderdetails = await _context.OrderDetails.ToListAsync();
//             // Chuyen doi list Products tu model sang DTO     
//             var orderdetailsDTO = _mapper.Map<List<OrderDetail>,List<OrderDetailDTO>>(orderdetails);
//             return orderdetailsDTO;

//             // var products = await _context.Products.Include(p => p.Category.Name).ToListAsync();
//         }


//         [HttpPost]
//         public async Task<ActionResult<OrderDetailDTO>> CreateOrderDetail(OrderDetailDTO orderdetailDTO)
//         {
//             //chuyen doi 1 category tu DTO sang model
//             var orderdetail = _mapper.Map<OrderDetailDTO,OrderDetail>(orderdetailDTO);
//             _context.OrderDetails.Add(orderdetail);
            
//             decimal subTotalPrice =  0;
//             subTotalPrice = subTotalPrice + (orderdetail.Price * orderdetail.Amount );

//             var order = await _context.Orders.FindAsync(orderdetail.OrderID);
//             order.Total= order.Total + subTotalPrice;
//             _context.Orders.Update(order);
    
//             var product= await _context.Products.FindAsync(orderdetail.ProductID);
//             product.Amount = product.Amount - orderdetail.Amount;

//             // Luu du lieu len _context
//             await _context.SaveChangesAsync();

//             return CreatedAtAction(nameof(GetOrderDetails), new { Id = orderdetail.OrderID }, orderdetail);
//         }


//         [HttpDelete("{id}")]
//         public async Task<IActionResult> DeleteOrderDetail(int id)
//         {
//             var orderdetail = await _context.OrderDetails.FindAsync(id);
//             if (orderdetail == null) return NotFound();

//             _context.OrderDetails.Remove(orderdetail);
//             await _context.SaveChangesAsync();

//             return NoContent();
//         }

//         private bool OrderDetailExists(int id)
//         {
//             return _context.OrderDetails.Any(od => od.OrderID == id);
//         }
//     }
// }