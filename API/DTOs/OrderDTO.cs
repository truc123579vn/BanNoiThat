using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Models;
using API.Models;
using System.Text.Json.Serialization;

namespace DTOs{
    public class OrderDTO
    {

        public int Id { get; set; }

        [JsonIgnore]
        public AppUser AppUser {get;set;}

        public int User_Id { get; set; }
        //public string FullName { get; set; }
        public decimal TotalPrice { get; set; }
        
        public string DateCreated { get; set; }

        public string Address { get; set; }
        
        public string Status { get; set; }

        // thiết lập quan hệ 1-n, 1 user có nhiều order
        
        //public string UserId { get; set; }



        // 1 Order co nhieu OrderDetails
        public  IEnumerable<OrderDetailDTO> OrderDetails { get; set; }
    }
}