using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using PicShare.Infrastructure;
using PicShare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace PicShare.Controllers
{
    [Authorize]
    [RoutePrefix("board")]
    public class BoardController : ApiController
    {
        public async Task<HttpResponseMessage> Get(string id)
        {
            try
            {
                var user = await UserManager.FindByNameAsync(id);
                if (user == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Could not find a user.");

                //var userBoard = Repository.GetUserBoard(Guid.Parse(user.Id));
                var userPictures = Repository.GetUserPictures(Guid.Parse(user.Id));

                return Request.CreateResponse(userPictures);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(new ResponseModel { HasError = true, ErrorMessage = ex.Message });
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