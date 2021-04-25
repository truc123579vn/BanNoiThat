using API.DTOs;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Data;
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

    public class AppUsersController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private RoleManager<IdentityRole<int>> _roleManager;
        private SignInManager<AppUser> _signInManager;
        private IMapper _mapper;
        private IJwtService _service;

        public AppUsersController(UserManager<AppUser> userManager, RoleManager<IdentityRole<int>> roleManager, SignInManager<AppUser> signInManager, IMapper mapper, IJwtService service)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _service = service;
        }

        [HttpGet]
        [Authorize(Policy = "Admin")]
        [Route("GetDemo")]
        public String Demo()
        {
            return "Hello";
        }

        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public async Task<ActionResult<AppUserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.UserName);
            if (user == null)
            {
                return BadRequest(new { message = "Tài khoản này chưa tồn tại" });
            }
            else
            {
                if (await _userManager.CheckPasswordAsync(user, loginDTO.Password))
                {
                    var role = await _userManager.GetRolesAsync(user);
                    var roleName = "";
                    if (role.Contains("Customer"))
                    {
                        roleName = "Customer";
                    }
                    else if (role.Contains("Admin"))
                    {
                        roleName = "Admin";
                    }
                    else if (role.Contains("Manager"))
                    {
                        roleName = "Manager";
                    }
                    var appUserDTO = _mapper.Map<AppUserDTO>(user);
                    appUserDTO.Role = roleName;
                    appUserDTO.Token = _service.Generate(user, roleName);

                    return Ok(appUserDTO);
                }
                else
                {
                    return BadRequest(new { message = "Mật khẩu không đúng" });
                }
            }


        }

        [HttpPost]
        [Route("User/Customer")]
        [AllowAnonymous]
        public async Task<Object> Register(RegisterDTO registerDTO)
        {
            var user = await _userManager.FindByNameAsync(registerDTO.UserName);
            if (user != null)
            {
                return BadRequest(new { message = "Username này đã tồn tại" });
            }
            else
            {
                var userDTO = new AppUserDTO
                {
                    UserName = registerDTO.UserName,
                    FirstName = registerDTO.FirstName,
                    LastName = registerDTO.LastName,
                    Role = "Customer"
                };
                user = _mapper.Map<AppUser>(userDTO);
                var result = await _userManager.CreateAsync(user, registerDTO.Password);
                var setRole = await _userManager.AddToRoleAsync(user, userDTO.Role);
                if (!setRole.Succeeded)
                {
                    return BadRequest(new { message = "Không set được quyền" });
                }
                return Ok(_userManager.GetRolesAsync(user));
            }
        }

        //Tạo tài khoản cho Manager
        [HttpPost]
        [Route("User/Manager")]
        [AllowAnonymous]
        public async Task<Object> CreateManager(RegisterDTO registerDTO)
        {
            var user = await _userManager.FindByNameAsync(registerDTO.UserName);
            if (user != null)
            {
                return BadRequest(new { message = "Username này đã tồn tại" });
            }
            else
            {
                var userDTO = new AppUserDTO
                {
                    UserName = registerDTO.UserName,
                    FirstName = registerDTO.FirstName,
                    LastName = registerDTO.LastName,
                    Role = "Manager"
                };
                user = _mapper.Map<AppUser>(userDTO);
                var result = await _userManager.CreateAsync(user, registerDTO.Password);
                var setRole = await _userManager.AddToRoleAsync(user, userDTO.Role);
                if (!setRole.Succeeded)
                {
                    return BadRequest(new { message = "Không set được quyền" });
                }
                return Ok(_userManager.GetRolesAsync(user));
            }
        }

        //Cập nhật tài khoản
        [HttpPut("{userName}")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateProduct(AppUserDTO appuserDTO)
        {
            AppUser user = await _userManager.FindByNameAsync(appuserDTO.UserName);

            if (user == null) 
                return NotFound();
            

           // _mapper.Map<AppUser>(user);
            _mapper.Map<AppUserDTO,AppUser>(appuserDTO,user);
            IdentityResult result = await _userManager.UpdateAsync(user);

            //await _signInManager.RefreshSignInAsync(user);

            
            if(!result.Succeeded)
            {
                return BadRequest(new { message = "Không cập nhật được tài khoản" });
            }
            return NoContent();
        }

        //Xóa tài khoản
         [HttpDelete("{username}")]
         [AllowAnonymous]
        public async Task<IActionResult> DeleteProduct(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) return NotFound();
            IdentityResult result = await _userManager.DeleteAsync(user);
            if(!result.Succeeded)
                return BadRequest(new { message = "Không xóa được tài khoản" });
            return NoContent();
        }

        //Get users by Role
        [HttpGet]
        [Route("GetByRole/{role}")]
        [AllowAnonymous]
        public async Task<IEnumerable<AppUserDTO>> GetManagers(String role)
        {
            var users = (await  _userManager.GetUsersInRoleAsync(role)).ToList();

            var usersDTO = _mapper.Map<List<AppUser>,List<AppUserDTO>>(users);
            return usersDTO;
        }

        //Get users by UserName
        [HttpGet("{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<AppUserDTO>> GetUserByName(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }
         
            var userDTO = _mapper.Map<AppUser,AppUserDTO>(user);
            return userDTO;
        }

        /*[HttpGet]
        public async Task<IEnumerable<AppUserDTO>> GetUsers()
        {
           
            var users =  await  _userManager.Users.ToListAsync();
            var usersDTO = _mapper.Map<List<AppUser>,List<AppUserDTO>>(users);
            return usersDTO;
        }
        [HttpPost]
        public async Task<ActionResult<AppUserDTO>> CreateUser(AppUserDTO appUserDTO)
        {
            var user = _mapper.Map<AppUserDTO,AppUser>(appUserDTO);
            await _userManager.CreateAsync(user,appUserDTO.Password);

            return CreatedAtAction(nameof(GetUsers), new { Id = user.Id }, user);
        }*/
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
