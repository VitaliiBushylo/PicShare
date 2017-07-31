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
        [HttpGet]
        public IHttpActionResult Login()
        {
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    //return View("Error", new string[] { "Access Denied" });
                    return Redirect(Url.Route("Default", new { controller = "User", id = HttpContext.Current.User.Identity.GetUserId() }));
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpPatch]
        public async Task<IHttpActionResult> Login(LoginModel userDetails)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await UserManager.FindAsync(userDetails.Name, userDetails.Password);
                    if (user == null)
                    {
                        ModelState.AddModelError("", "Invalid name or password.");
                    }
                    else
                    {
                        var identity = await UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
                        AuthManager.SignOut();
                        AuthManager.SignIn(new AuthenticationProperties { IsPersistent = true }, identity);

                        return Redirect(Url.Route("Default", new { controller = "User", id = user.Id }));
                    }

                    return Ok();
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
                        return Json($"user/details/{user.Id}");
                        //return Redirect(Url.Route("Default", new { controller = "User", id = user.Id })); //RedirectToRoute("api/user", user.Id);
                    }
                    else
                    {
                        ModelState.AddModelError("", result.Errors.Aggregate((prev, curr) => prev + "/n" + curr));
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