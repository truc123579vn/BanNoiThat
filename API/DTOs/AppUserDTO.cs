using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AppUserDTO 
    {
        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
        
        public String Role {get;set;}

        public String Token {get;set;}
    }
}
