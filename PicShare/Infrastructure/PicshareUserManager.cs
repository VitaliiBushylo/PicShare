using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using PicShare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PicShare.Infrastructure
{
    public class PicshareUserManager : UserManager<PicshareUser>
    {
        public PicshareUserManager(IUserStore<PicshareUser> store) : base(store)
        {
        }

        public static PicshareUserManager Create(IdentityFactoryOptions<PicshareUserManager> options, IOwinContext context)
        {
            PicshareIdentityDbContext db = context.Get<PicshareIdentityDbContext>();
            PicshareUserManager manager = new PicshareUserManager(new UserStore<PicshareUser>(db));
            
            manager.PasswordValidator = new PasswordValidator
                //new CustomPasswordValidator
            {
                RequiredLength = 1,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false
            };
            
            manager.UserValidator = new UserValidator<PicshareUser>(manager)
                //new CustomUserValidator(manager)
            {
                AllowOnlyAlphanumericUserNames = true,
                RequireUniqueEmail = false
            };
            
            return manager;
        }
    }
}