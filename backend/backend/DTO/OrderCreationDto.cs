using backend.DTO;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class OrderCreationDto
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;

        [Required]
        public string City { get; set; } = string.Empty;

        public string PaymentMethod { get; set; } = "COD";

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public List<CartItemDto> CartItems { get; set; } = new();
    }
}