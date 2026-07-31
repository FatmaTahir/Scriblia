using backend.Data;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/product
        // GET: api/product?search=pen
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(string? search)
        {
            var products = _context.products.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                search = search.ToLower();

                products = products.Where(p =>
                    p.Name.ToLower().Contains(search)
                );
            }

            return Ok(await products.ToListAsync());
        }

        // GET: api/product/category/{category}
        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string category)
        {
            var products = await _context.products
                .Where(x => x.Category == category)
                .ToListAsync();

            return Ok(products);
        }

        // NEW: GET api/product/related/{id}
        [HttpGet("related/{id}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetRelatedProducts(int id)
        {
            var currentProduct = await _context.products.FindAsync(id);

            if (currentProduct == null)
            {
                return NotFound();
            }

            var relatedProducts = await _context.products
                .Where(p =>
                    p.Category == currentProduct.Category &&
                    p.Id != currentProduct.Id)
                .Take(4)
                .ToListAsync();

            return Ok(relatedProducts);
        }

        // GET: api/product/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _context.products
                .FirstOrDefaultAsync(x => x.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // POST: api/product
        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            _context.products.Add(product);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetProductById),
                new { id = product.Id },
                product
            );
        }

        // PUT: api/product/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product updatedProduct)
        {
            if (id != updatedProduct.Id)
            {
                return BadRequest();
            }

            var product = await _context.products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            product.Name = updatedProduct.Name;
            product.Category = updatedProduct.Category;
            product.Price = updatedProduct.Price;
            product.Quantity = updatedProduct.Quantity;
            product.Image = updatedProduct.Image;
            product.Tag = updatedProduct.Tag;
            product.D1 = updatedProduct.D1;
            product.D2 = updatedProduct.D2;
            product.D3 = updatedProduct.D3;
            product.D4 = updatedProduct.D4;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _context.products.Remove(product);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}