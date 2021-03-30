using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models;



namespace Data
{
    public class SellingFurnitureContext : IdentityDbContext
    {
        public SellingFurnitureContext(DbContextOptions<SellingFurnitureContext> options) : base(options)
        {
        }

        //Lap bang Products và Categories
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories{get;set;}
        public DbSet<AppUser> AppUsers { get; set; }

        //Ung dung Fluent Api
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            //Map entity to table
            modelBuilder.Entity<Product>().ToTable("Products");
            modelBuilder.Entity<Category>().ToTable("Categories");
            

            //Configure primary key
            modelBuilder.Entity<Product>().HasKey(p => p.Id);
        
            modelBuilder.Entity<Category>().HasKey(c => c.Id);

            //Configure Constraint Unique Column
            modelBuilder.Entity<Category>().HasIndex(c => c.Name).IsUnique(); 
            modelBuilder.Entity<Product>().HasIndex(p => p.Name).IsUnique(); 

            //Configure auto increasing Id
            modelBuilder.Entity<Product>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Category>().Property(c => c.Id).ValueGeneratedOnAdd();



            // configures one-to-many relationship
            modelBuilder.Entity<Product>()//bat dau voi Entity Product
                .HasOne<Category>(p => p.Category)//Chi ra co 1 thuoc tinh Category trong Entity Product, dong thoi cau hinh Entity Category
                .WithMany(c => c.Products)// Chi ra Entity Categories chua nhieu Products 
                .HasForeignKey(p => p.Category_Id);// Lap khoa ngoai       
         
        }

    }
}