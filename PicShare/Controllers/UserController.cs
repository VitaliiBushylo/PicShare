﻿using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using PicShare.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PicShare.Models;
using System.Threading.Tasks;

namespace PicShare.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        public async Task<ActionResult> Details(Guid id)
        {
            try
            {
                var user = await UserManager.FindByIdAsync(id.ToString());
                if (user == null) return HttpNotFound("Could not find a user.");

                return View(user);
            }
            catch (Exception ex)
            {
                return View("Error", ex);
            }
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