using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using PicShare.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PicShare
{
    public class IdentityConfig
    {
        public void Configuration(IAppBuilder app)
        {
            app.CreatePerOwinContext<PicshareIdentityDbContext>(PicshareIdentityDbContext.Create);
            app.CreatePerOwinContext<PicshareUserManager>(PicshareUserManager.Create);
            app.CreatePerOwinContext<PicshareRoleManager>(PicshareRoleManager.Create);

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Home/Index"),
            });
        }
    }
}