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
        public async Task<HttpResponseMessage> Get(Guid id)
        {
            try
            {
                var user = await UserManager.FindByIdAsync(id.ToString());
                if (user == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Could not find a user.");

                var userBoard = Repository.GetUserBoard(id);

                return Request.CreateResponse(userBoard);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(new ResponseModel { HasError = true, ErrorMessage = ex.Message });
                //return Json(new ResponseModel { HasError = true, ErrorMessage = ex.Message });
            }
        }

        //// POST api/<controller>
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/<controller>/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/<controller>/5
        //public void Delete(int id)
        //{
        //}

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