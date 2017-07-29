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
    public class PicshareRoleManager : RoleManager<PicshareRole>, IDisposable
    {
        public PicshareRoleManager(RoleStore<PicshareRole> store) : base(store)
        {
        }

        public static PicshareRoleManager Create(IdentityFactoryOptions<PicshareRoleManager> options, IOwinContext context)
        {
            return new PicshareRoleManager(new RoleStore<PicshareRole>(context.Get<PicshareIdentityDbContext>()));                
        }
    }
}