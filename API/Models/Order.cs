using System.Collections.Generic;
using API.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using System;

namespace Models
{
    public class Order
    {

        public Order() { }
        public Order( AppUser appUser, string address)
        {
            this.AppUser = appUser;
            Address = address;
            DateCreated = DateTime.Now.ToString("dd/MM/yyyy");
            Status = "Chưa Duyệt";
        }
        public int Id { get; set; }
    
        public decimal TotalPrice { get; set; }
        
        public string DateCreated { get; set; }

        public string Address { get; set; }
        
        public string Status { get; set; }

        // thiết lập quan hệ 1-n, 1 user có nhiều order
        //public string UserId { get; set; }

        public AppUser AppUser { get; set; }
        public int User_Id {get;set;}

        // 1 Order co nhieu OrderDetails

        [JsonIgnore]
        public virtual  IEnumerable<OrderDetail> OrderDetails { get; set; }
    }
}