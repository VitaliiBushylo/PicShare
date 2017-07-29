using PicShare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace PicShare.Controllers
{
    [RoutePrefix("account")]
    [Authorize]
    public class AccountController : ApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public PicshareUser Login()
        {
            return new PicshareUser();
        }
    }
}