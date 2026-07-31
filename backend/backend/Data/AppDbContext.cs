using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace backend.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> products { get; set; }
        public DbSet<Order> orders { get; set; }
        public DbSet<OrderItem> orderItems { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Category = "artSupplies", Name = "Color Pencils", Image = "/categories/ArtColor.png", Price = 200, Rating = 4.5, Quantity = 1,Tag="SALE", D1 = "Unleash your colorful imagination", D2 = "Set of 24 vibrant colors", D3 = "Plastic Shell Material ", D4 = "Packed In Cardbox" },
                new Product { Id = 2, Category = "stickyItems", Name = "Gel Pen", Image = "/categories/Tapes.png", Price = 120, Rating = 4.5, Quantity = 1, Tag = "NEW", D1 = "Smooth writing pen", D2 = "Set of 24 vibrant colors", D3 = "Plastic Shell Material ", D4 = "Packed In Cardbox" },
                new Product { Id = 3, Category = "pens", Name = "Gel Pen", Image = "/categories/Pens.png", Price = 120, Rating = 4.5, Quantity = 1, Tag = "SALE", D1 = "Smooth writing pen", D2 = "Set of 24 vibrant colors", D3 = "Plastic Shell Material ", D4 = "Packed In Cardbox" },
                new Product { Id = 4, Category = "organizing", Name = "Gel Pen", Image = "/categories/OfficeEssentials.png", Price = 120, Rating = 3.5, Quantity = 1, Tag = "NEW", D1 = "Smooth writing pen", D2 = "Set of 24 vibrant colors", D3 = "Plastic Shell Material ", D4 = "Packed In Cardbox" },
                new Product { Id = 5, Category = "journals", Name = "Gel Pen", Image = "/categories/Filing.png", Price = 120, Rating = 4.5, Quantity = 1, Tag = "NEW", D1 = "Smooth writing pen", D2 = "Set of 24 vibrant colors", D3 = "Plastic Shell Material ", D4 = "Packed In Cardbox" }

                );
        }   
        
    }
}
