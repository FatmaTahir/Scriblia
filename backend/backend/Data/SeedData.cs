//using backend.Models;
//using Microsoft.AspNetCore.Identity;

//public static class SeedData
//{
//    public static async Task Initialize(IServiceProvider serviceProvider)
//    {
//        var roleManager =
//            serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

//        var userManager =
//            serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();


//        if (!await roleManager.RoleExistsAsync("Admin"))
//        {
//            await roleManager.CreateAsync(
//                new IdentityRole("Admin")
//            );
//        }


//        var adminEmail = "admin@scriblia.com";

//        var admin = await userManager.FindByEmailAsync(adminEmail);


//        if (admin == null)
//        {
//            admin = new ApplicationUser
//            {
//                UserName = adminEmail,
//                Email = adminEmail
//            };


//            await userManager.CreateAsync(
//                admin,
//                "Admin@123"
//            );


//            await userManager.AddToRoleAsync(
//                admin,
//                "Admin"
//            );
//        }
//    }
//}