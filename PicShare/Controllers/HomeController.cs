using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;

namespace PicShare.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string returnUrl)
        {
            try
            {
                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    if (!string.IsNullOrEmpty(returnUrl))
                    {
                        var uriBuilder = new UriBuilder
                        {
                            Scheme = HttpContext.Request.Url.Scheme,
                            Host = HttpContext.Request.Url.Host,
                            Port = HttpContext.Request.Url.Port,
                            Path = returnUrl
                        };
                       return Redirect(uriBuilder.ToString());
                    }
                    else
                    {
                        return RedirectToAction("Board", "User", new { id = HttpContext.User.Identity.Name });
                    }                    
                }
            }
            catch (Exception ex)
            {
                return View("Error", ex);
            }

            return View();
        }
    }
}