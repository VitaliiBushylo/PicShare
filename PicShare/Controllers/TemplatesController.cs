using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PicShare.Controllers
{
    public class TemplatesController : Controller
    {
        public ActionResult Page(string viewName)
        {
            return View(viewName);
        }
    }
}