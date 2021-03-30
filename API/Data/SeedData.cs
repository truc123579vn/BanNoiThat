using System.Collections.Generic;
using System.Linq;
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
            context.Database.EnsureCreated();


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
        }

    }
}