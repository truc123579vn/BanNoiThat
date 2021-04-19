using Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
//test
namespace DTOs
{
    public class OrderDetailDTO
    {
   
        public int Amount { get; set; }
        public decimal Price {get;set;}
        public string ProductName { get; set; }


    }
}