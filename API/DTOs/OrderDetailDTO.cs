using Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
//test
namespace DTOs
{
    public class OrderDetailDTO
    {
        public int OrderID { get; set; }
        
        public int ProductID { get; set; }

        public int Amount { get; set; }

        public decimal Price {get;set;}

        public virtual Order Order { get; set; }  

        public virtual Product Product { get; set; }
    }
}