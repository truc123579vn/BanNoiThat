using API.DTOs;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : Controller
    {
        private UserManager<AppUser> _userManager;
        private IMapper _mapper;

        public UserProfileController(UserManager<AppUser> userManager,IMapper mapper)
        {
            _userManager = userManager;  
            _mapper = mapper;
          
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<AppUserDTO>> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
           
            
            var user = await _userManager.FindByIdAsync(userId);
             var role = await _userManager.GetRolesAsync(user);
            
            if (user == null)
            {
                return BadRequest(new { message = "khong tim thay user" });
            }
            var userDTO = _mapper.Map<AppUserDTO>(user);
            userDTO.Role = role[0];
            return Ok(userDTO);
        }
    }
}
