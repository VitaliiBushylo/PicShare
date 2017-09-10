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
    [RoutePrefix("api/userapi")]
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

        [Route("getuserbyid/{userId}")]
        [HttpGet]
        public HttpResponseMessage GetUser(string userId)
        {
            try
            {
                if (string.IsNullOrEmpty(userId)) return Request.CreateResponse(HttpStatusCode.BadRequest);

                var user = Repository.GetUserById(userId);
                return Request.CreateResponse(HttpStatusCode.OK, new { userName = user.UserName });
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