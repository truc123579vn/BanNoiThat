using API.Interfaces;
using API.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class JwtService : IJwtService
    {

        private string key = "This is the private key";


        public string Generate(AppUser user, String roleName)
        {

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] { 
                        new Claim("UserID",user.Id.ToString()),
                        new Claim("Role",roleName)
                    }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHander = new JwtSecurityTokenHandler();
            var securityToken = tokenHander.CreateToken(tokenDescriptor);
            var token = tokenHander.WriteToken(securityToken);
            return token.ToString();
        }
    }
}
