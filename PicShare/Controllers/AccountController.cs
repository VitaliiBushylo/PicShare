using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity.Owin;
using PicShare.Infrastructure;
using PicShare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;

namespace PicShare.Controllers
{
    [RoutePrefix("account")]
    [Authorize]
    public class AccountController : ApiController
    {
        [AllowAnonymous]
        [HttpPut]
        public async Task<IHttpActionResult> Login(LoginModel userDetails)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await UserManager.FindAsync(userDetails.Name, userDetails.Password);
                    if (user == null)
                    {
                        var message = "Invalid name or password.";
                        ModelState.AddModelError("", message);
                        return InternalServerError(new ApplicationException(message));
                    }
                    else
                    {
                        var identity = await UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
                        AuthManager.SignOut();
                        AuthManager.SignIn(new AuthenticationProperties
                        {
                            IsPersistent = true,
                            ExpiresUtc = DateTimeOffset.UtcNow.AddHours(4)
                        }, identity);

                        return Json($"/user/details/{user.Id}");
                    }
                }

                return StatusCode(System.Net.HttpStatusCode.Forbidden);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> Register(LoginModel userDetails)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = new PicshareUser
                    {
                        Id = Guid.NewGuid().ToString(),
                        UserName = userDetails.Name,
                        PasswordHash = userDetails.Password
                    };

                    var result = await UserManager.CreateAsync(user, userDetails.Password);

                    if (result == IdentityResult.Success)
                    {
                        return Ok(user.UserName);
                    }
                    else
                    {
                        var message = result.Errors.Aggregate((prev, curr) => prev + "/n" + curr);
                        ModelState.AddModelError("", message);
                        return InternalServerError(new ApplicationException(message));
                    }
                }

                return StatusCode(System.Net.HttpStatusCode.Forbidden);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private IAuthenticationManager AuthManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().Authentication;
            }
        }
        private PicshareUserManager UserManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().Get<PicshareUserManager>();
            }
        }
    }
}