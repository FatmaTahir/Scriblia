using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Product
    {
        public int  Id { get; set; }
        public string Name { get; set; } = string.Empty;
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string D1 { get; set; } = string.Empty;
        public string D2 { get; set; } = string.Empty;
        public string D3 { get; set; } = string.Empty;
        public string D4 { get; set; } = string.Empty;
        public double Rating { get; set; }
        public string Tag { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
}
