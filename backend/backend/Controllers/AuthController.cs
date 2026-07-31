using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public AuthController(
            UserManager<User> userManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto request)
        {
            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
                return BadRequest("User already exists.");
            var user = new User
            {
                UserName = request.Email,
                Email = request.Email,
                Role = "Customer"
            };
            var result = await _userManager.CreateAsync(
                user,
                request.Password
            );
            if (!result.Succeeded)
                return BadRequest(result.Errors);
            return Ok("User registered successfully");

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto request)
        {

            var user = await _userManager.FindByEmailAsync(
                request.Email
            );


            if (user == null)
                return BadRequest("User not found");
            var passwordValid = await _userManager.CheckPasswordAsync(
                user,
                request.Password
            );
       if (!passwordValid)
                return BadRequest("Wrong password");
       var token = CreateToken(user);
            return Ok(new
            {
                token
            });

        }
        private string CreateToken(User user)
        {

            var claims = new List<Claim>
            {

                new Claim(
                    ClaimTypes.NameIdentifier,
                    user.Id
                ),


                new Claim(
                    ClaimTypes.Email,
                    user.Email!
                ),


                new Claim(
                    ClaimTypes.Role,
                    user.Role
                )

            };



            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"]!
                )
            );



            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha512Signature
            );

            var token = new JwtSecurityToken(
    issuer: _configuration["Jwt:Issuer"],
    audience: _configuration["Jwt:Audience"],
    claims: claims,
    expires: DateTime.Now.AddDays(1),
    signingCredentials: credentials
);





            return new JwtSecurityTokenHandler()
                .WriteToken(token);

        }

    }
    public class RegisterDto
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
    public class LoginDto
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }

}