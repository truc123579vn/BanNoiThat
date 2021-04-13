using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Models;
using API.Models;

namespace DTOs{
    public class OrderDTO
    {
        [Key]
        public int Id { get; set; }

        public decimal Total { get; set; }
        
        public string Date { get; set; }

        public string Address { get; set; }
        
        public string Status { get; set; }

        // thiết lập quan hệ 1-n, 1 user có nhiều order
        
        // public string UserId { get; set; }

        public int User_Id {get;set;}


        // 1 Order co nhieu OrderDetails
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}