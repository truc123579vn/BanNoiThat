using Models;

namespace Models
{
    public class OrderDetail
    {
        public int OrderID { get; set; }
        
        public int ProductID { get; set; }

        public int Amount { get; set; }

        public Order Order { get; set; }  

        public Product Product { get; set; }
    }
}