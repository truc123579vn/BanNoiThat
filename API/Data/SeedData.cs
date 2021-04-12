using System.Collections.Generic;
using System.Linq;
using API.Models;
using Data;
using Models;

namespace API.Data
{
    //SeedData là mọt clas khoi tao gia tri ban dau cho cac Entity ngay
    //  thay vi phai them tren database, ung dung.
    public class SeedData
    {
        public static void Initialize(SellingFurnitureContext context)
        {

            if (context.Categories.Any())
            {
                return;   // DB has been seeded.
            }   

            if (!context.Categories.Any())
            {
                context.Categories.AddRange(new List<Category>()
                {
                    new Category {
                        Name = "Bàn"
                    },
                    new Category {
                        Name = "Ghế"
                    },
                      new Category {
                        Name = "Giường"
                    },
                    new Category {
                        Name = "Tủ"
                    },
                
                });

                context.SaveChanges();
            }

            if (!context.Products.Any())
            {
                context.Products.AddRange(new List<Product>()
                {
                    new Product {
                    Name = "Product 1",
                    Amount=10,
                    Price=2990000,
                    Details="Bàn cà phê là món đồ dùng không thể thiếu trong bất kỳ phòng khách nào. Đến BAYA và mang về bàn cà phê GONZALES được làm từ chất liệu gỗ MDF cao cấp, bền chắc, phủ lớp sơn đen sang trọng. Chân bàn vững chắc với kết cấu lạ mắt cùng chất liệu kim loại không gỉ. Kết hợp bàn cùng các sản phẩm khác trong cùng bộ sưu tập để hoàn thiện nội thất gia đình bạn. ",
                    Image="/Tủ/1.jpg",
                    Status="Còn hàng",
                    Category=null,
                    
                    },
                    new Product {
                    Name = "Product 2",
                    Amount= 10,
                    Price= 2990000,
                    Details="Bàn cà phê là món đồ dùng không thể thiếu trong bất kỳ phòng khách nào. Đến BAYA và mang về bàn cà phê GONZALES được làm từ chất liệu gỗ MDF cao cấp, bền chắc, phủ lớp sơn đen sang trọng. Chân bàn vững chắc với kết cấu lạ mắt cùng chất liệu kim loại không gỉ. Kết hợp bàn cùng các sản phẩm khác trong cùng bộ sưu tập để hoàn thiện nội thất gia đình bạn. ",
                    Image="/Tủ/2.jpg",
                    Status="Còn hàng",
                    Category=null,
                    Category_Id=1,
                    OrderDetails = null,
                    },           
                });

                context.SaveChanges();
            }if (context.Categories.Any())
            {
                return;   // DB has been seeded.
            }   


            
        }

    }
}