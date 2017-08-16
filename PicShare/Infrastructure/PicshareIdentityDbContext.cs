using Microsoft.AspNet.Identity.EntityFramework;
using PicShare.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PicShare.Infrastructure
{
    public class PicshareIdentityDbContext : IdentityDbContext<PicshareUser>
    {
        public PicshareIdentityDbContext() : base("PicshareIdentityDb") { }

        static PicshareIdentityDbContext()
        {
            Database.SetInitializer<PicshareIdentityDbContext>(new IdentityDbInit());
        }

        public static PicshareIdentityDbContext Create()
        {
            return new PicshareIdentityDbContext();
        }
    }

    public class IdentityDbInit : DropCreateDatabaseIfModelChanges<PicshareIdentityDbContext>
    {
        protected override void Seed(PicshareIdentityDbContext context)
        {
            PerformInitialSetup(context);
            base.Seed(context);
        }
        public async void PerformInitialSetup(PicshareIdentityDbContext context)
        {
            // initial configuration will go here
            PicshareUserManager userMgr = new PicshareUserManager(new UserStore<PicshareUser>(context));
            PicshareRoleManager roleMgr = new PicshareRoleManager(new RoleStore<PicshareRole>(context));
            string roleName = "Administrators";
            string userName = "Admin";
            string password = "AdminSecret";

            if (!await roleMgr.RoleExistsAsync(roleName))
            {
               await roleMgr.CreateAsync(new PicshareRole(roleName));
            }

            PicshareUser user = await userMgr.FindByNameAsync(userName);
            if (user == null)
            {
                await userMgr.CreateAsync(new PicshareUser { UserName = userName }, password);
                user = await userMgr.FindByNameAsync(userName);
            }

            if (!await userMgr.IsInRoleAsync(user.Id, roleName))
            {
                await userMgr.AddToRoleAsync(user.Id, roleName);
            }
        }
    }
}