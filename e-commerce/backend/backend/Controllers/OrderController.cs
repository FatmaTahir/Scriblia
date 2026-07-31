using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreationDto orderDto)
        {
            if (orderDto == null || !orderDto.CartItems.Any())
            {
                return BadRequest("Your shopping cart cannot be empty.");
            }

            // Extract the User ID string from the JWT Claim
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdStr))
            {
                return Unauthorized("User context could not be determined.");
            }

            // NOTE: If your Order model expects an integer for UserId, parse it here:
            // int userId = int.Parse(userIdStr);

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                decimal totalAmount = 0;
                var orderItemsList = new List<OrderItem>();

                foreach (var cartItem in orderDto.CartItems)
                {
                    var product = await _context.products.FindAsync(cartItem.ProductId);

                    if (product == null)
                    {
                        return NotFound($"Product with ID {cartItem.ProductId} was not found.");
                    }

                    // Check stock
                    if (product.Quantity < cartItem.Quantity)
                    {
                        return BadRequest(
                            $"Only {product.Quantity} item(s) left for {product.Name}."
                        );
                    }

                    decimal itemTotal = product.Price * cartItem.Quantity;
                    totalAmount += itemTotal;

                    // Reduce stock
                    product.Quantity -= cartItem.Quantity;

                    var orderItem = new OrderItem
                    {
                        ProductId = cartItem.ProductId,
                        Quantity = cartItem.Quantity,
                        Price = product.Price
                    };

                    orderItemsList.Add(orderItem);
                }

                var order = new Order
                {
                    UserId = userIdStr, // Link the order to the authenticated user's ID
                    FullName = orderDto.FullName,
                    Address = orderDto.Address,
                    City = orderDto.City,
                    PaymentMethod = orderDto.PaymentMethod,
                    PhoneNumber = orderDto.PhoneNumber,
                    TotalAmount = totalAmount,
                    OrderStatus = "Pending",
                    OrderCreated = DateTime.UtcNow
                };

                _context.orders.Add(order);
                await _context.SaveChangesAsync();

                foreach (var item in orderItemsList)
                {
                    item.OrderId = order.Id;
                }

                _context.orderItems.AddRange(orderItemsList);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return Ok(new { message = "Order successfully created!", orderId = order.Id });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, $"An error occurred during order submission: {ex.Message}");
            }
        }

        // ==========================================
        // 2. GET USER HISTORY (GET: api/orders/my-orders)
        // ==========================================
        [HttpGet("my-orders")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdStr))
            {
                return Unauthorized();
            }

            // Fetch only orders belonging to the user token making the request
            var userOrders = await _context.orders
                .Where(o => o.UserId == userIdStr)
                .OrderByDescending(o => o.OrderCreated)
                .ToListAsync();

            return Ok(userOrders);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.orders
                .OrderByDescending(o => o.OrderCreated)
                .Select(o => new
                {
                    o.Id,
                    Customer = o.FullName,
                    Date = o.OrderCreated,
                    Amount = o.TotalAmount,
                    Status = o.OrderStatus,
                    o.PaymentMethod,
                    o.PhoneNumber,
                    o.Address,
                    o.City
                })
                .ToListAsync();

            return Ok(orders);
        }
    }
}