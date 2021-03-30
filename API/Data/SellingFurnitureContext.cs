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
        public DbSet<Category> Categories { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }

        //Ung dung Fluent Api
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            //Map entity to table
            modelBuilder.Entity<Product>().ToTable("Products");
            modelBuilder.Entity<Category>().ToTable("Categories");
            modelBuilder.Entity<Order>().ToTable("Orders");
            modelBuilder.Entity<OrderDetail>().ToTable("OrderDetails");
            //modelBuilder.Entity<User>().ToTable("Users");


            //Configure primary key
            modelBuilder.Entity<Product>().HasKey(p => p.Id);

            modelBuilder.Entity<Category>().HasKey(c => c.Id);

            modelBuilder.Entity<Order>().HasKey(o => o.Id);

            modelBuilder.Entity<OrderDetail>().HasKey(od => new { od.OrderID, od.ProductID });

            //modelBuilder.Entity<User>().HasKey(u => u.)

            //Configure Constraint Unique Column
            modelBuilder.Entity<Category>().HasIndex(c => c.Name).IsUnique();
            modelBuilder.Entity<Product>().HasIndex(p => p.Name).IsUnique();

            //Configure auto increasing Id
            modelBuilder.Entity<Product>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Category>().Property(c => c.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Order>().Property(o => o.Id).ValueGeneratedOnAdd();



            // configures one-to-many relationship
            modelBuilder.Entity<Product>()//bat dau voi Entity Product
                .HasOne<Category>(p => p.Category)//Chi ra co 1 thuoc tinh Category trong Entity Product, dong thoi cau hinh Entity Category
                .WithMany(c => c.Products)// Chi ra Entity Categories chua nhieu Products 
                .HasForeignKey(p => p.Category_Id);// Lap khoa ngoai;

            modelBuilder.Entity<Product>()
                .Property(p => p.Price).HasColumnType("decimal(7,5)");
                

            modelBuilder.Entity<OrderDetail>()
                .HasOne<Order>(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderID);

            modelBuilder.Entity<Order>()
                .Property(o => o.Total).HasColumnType("decimal(10,5)");


            modelBuilder.Entity<OrderDetail>()
                .HasOne<Product>(od => od.Product)
                .WithMany(p => p.OrderDetails)
                .HasForeignKey(od => od.ProductID);

        }

    }
}