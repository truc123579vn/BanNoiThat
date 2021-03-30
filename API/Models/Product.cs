using System.Collections.Generic;

namespace Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int Amount {get;set; }
        public decimal Price { get; set; }

        public string Details { get; set; }

        public string Image { get; set; }
        public string Status { get; set; }

        // Thiet lap quan he 1-n, mot loai san pham co nhieu san pham
        public Category Category { get; set; }

        public int Category_Id { get; set; }

        // 1 Product co nhieu OrderDetails
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }




    }
}