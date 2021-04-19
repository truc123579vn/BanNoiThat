using API.DTOs;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    [AllowAnonymous]

    public class AppUsersController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private RoleManager<IdentityRole<int>> _roleManager;
        private SignInManager<AppUser> _signInManager;
        private IMapper _mapper;
        private IJwtService _service;

        public AppUsersController(UserManager<AppUser> userManager, RoleManager<IdentityRole<int>> roleManager,SignInManager<AppUser> signInManager, IMapper mapper,IJwtService service)
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

        [HttpGet]
        public async Task<IEnumerable<AppUserDTO>> GetUsers()
        {
           
            var users =  await  _userManager.Users.ToListAsync();
            var usersDTO = _mapper.Map<List<AppUser>,List<AppUserDTO>>(users);
            return usersDTO;
        }
        [HttpPost]
        public async Task<ActionResult<AppUserDTO>> CreateUser(RegisterDTO registerDTO)
        {
            var user = _mapper.Map<RegisterDTO,AppUser>(registerDTO);
            await _userManager.CreateAsync(user,registerDTO.Password);

            return CreatedAtAction(nameof(GetUsers), new { Id = user.Id }, user);
        }
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteUser(int id)
        // {
        //     var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
        //     if (user == null) return NotFound();

        //     await _userManager.DeleteAsync(user);
        //     return NoContent();
        // }


      
    }
}
