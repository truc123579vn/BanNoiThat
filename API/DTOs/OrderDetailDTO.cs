using Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
//test
namespace DTOs
{
    public class OrderDetailDTO
    {
        [Key]
        public int OrderID { get; set; }
        
        [Key]
        public int ProductID { get; set; }

        public int Amount { get; set; }

        [ForeignKey("OrderID")]
        public virtual Order Order { get; set; }  

        [ForeignKey("ProductID ")]
        public virtual Product Product { get; set; }
    }
}