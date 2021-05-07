using API.Interfaces;
using API.Models.CartAggregate;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class CartsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICartManager _cartManager;

        public CartsController(ICartManager cartManager, IMapper mapper)
        {
            _cartManager = cartManager;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<Cart> GetCart(string id)
        {
            return await _cartManager.GetByAsync(id);
        }

        [HttpPut]
        public async Task<Cart> UpdateCart(Cart cart)
        {
            return await _cartManager.UpdateAsync(cart);
        }

        [HttpDelete("{id}")]
        public async Task<bool> DeleteCart(string id)
        {
            return await _cartManager.DeleteAsync(id);
        }
    }
}
