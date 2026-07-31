using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{ 
  public class CartItemDto{
            [Required]
            public int ProductId { get; set; }

            [Required]
            [Range(1, 100, ErrorMessage = "Quantity must be at least 1.")]
            public int Quantity { get; set; }
        }
    
}
