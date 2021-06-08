using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace UserRegistrationWithAngular.Models
{
    public class AuthenticationContext : IdentityDbContext
    {
        public AuthenticationContext(DbContextOptions options):base(options)
        {
           
        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

    }
}
