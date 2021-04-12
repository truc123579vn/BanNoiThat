using System.Text.Json.Serialization;
using Models;

namespace Models
{
    public class OrderDetail
    {
        public int OrderID { get; set; }
        
        public int ProductID { get; set; }

        public int Amount { get; set; }

        public decimal Price { get; set; }


    [JsonIgnore]

        public Order Order { get; set; }  
    [JsonIgnore]

        public Product Product { get; set; }
    }
}