using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Models;

namespace DTOs{
    public class OrderDTOs
    {
        [Key]
        public int Id { get; set; }

        public decimal Total { get; set; }
        
        public string Date { get; set; }

        public string Address { get; set; }
        
        public string Status { get; set; }

        // 1 Order co nhieu OrderDetails
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}