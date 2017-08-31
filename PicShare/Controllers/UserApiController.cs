using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity.Owin;
using PicShare.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.Threading.Tasks;
using PicShare.Models;

namespace PicShare.Controllers
{
    [Authorize]
    [RoutePrefix("userapi")]
    public class UserApiController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage SearchUsers(string id)
        {
            try
            {
                var userList = Repository.SearchUsers(id);
                var responseList = userList.Select(u => new { id = u.Id, name = u.UserName});
                return Request.CreateResponse(HttpStatusCode.OK, responseList);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(new ResponseModel { HasError = true, ErrorMessage = ex.Message });
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