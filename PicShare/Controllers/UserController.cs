using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using PicShare.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PicShare.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        public ActionResult Index(Guid id)
        {
            return View();
        }

        private IAuthenticationManager AuthManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }
        private PicshareUserManager UserManager
        {
            get
            {
                return HttpContext.GetOwinContext().Get<PicshareUserManager>();
            }
        }
    }
}