using API.DTOs;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUsersController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private SignInManager<AppUser> _signInManager;
        private IMapper _mapper;
        private IJwtService _service;

        public AppUsersController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager,SignInManager<AppUser> signInManager, IMapper mapper,IJwtService service)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _service = service;
        }

       

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<AppUserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.UserName);
            
           
            if(user!=null && await _userManager.CheckPasswordAsync(user, loginDTO.Password))
            {

                var token = _service.Generate(user);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Tài khoản hoặc mật khẩu không đúng" });
            }
        }

       

        [HttpPost]
        [Route("User/Customer")]
        public async Task<Object> Register(RegisterDTO registerDTO)
        {
            var userDTO = new AppUserDTO
            {
                UserName = registerDTO.UserName,
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                
            };
            var user = _mapper.Map<AppUser>(userDTO);
         
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
       
            return Ok(userDTO);

        }
    }
}
