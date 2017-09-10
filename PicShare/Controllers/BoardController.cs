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
    [RoutePrefix("api/board")]
    public class BoardController : ApiController
    {
        [HttpGet]
        public async Task<HttpResponseMessage> GetUserPictures(string id, bool getSharedPictures)
        {
            try
            {
                var user = await UserManager.FindByNameAsync(id);
                if (user == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Could not find a user.");

                var userId = Guid.Parse(user.Id);
                var userPictures = getSharedPictures ? Repository.GetSharedPictures(userId) : Repository.GetUserPictures(userId);

                return Request.CreateResponse(userPictures);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(new ResponseModel { HasError = true, ErrorMessage = ex.Message });
            }
        }

        [HttpPost]
        public async Task<HttpResponseMessage> SharePicture(SharingModel sharingModel)
        {
            try
            {
                if (sharingModel == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                var shareEntries = sharingModel.ShareToUsers.Select(toUserId => new ShareEntry(sharingModel.OwnerUserId, toUserId, sharingModel.PictureId, sharingModel.PictureUrl));
                await Repository.SaveShareEntries(shareEntries);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(new ResponseModel { HasError = true, ErrorMessage = ex.Message });
            }
        }

        
        [Route("{pictureId:guid}/comments")]
        [HttpGet]
        public HttpResponseMessage GetPictureComments(Guid pictureId)
        {
            try
            {
                var comments = Repository.GetPictureComments(pictureId);
                var response = new {
                    comments,
                    pictureId
                };
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(new ResponseModel { HasError = true, ErrorMessage = ex.Message });
            }
        }

        [Route("savecomment")]
        [HttpPost]
        public async Task<HttpResponseMessage> SavePictureComment(PictureComment pictureComment)
        {
            try
            {
                if (pictureComment == null) return Request.CreateResponse(HttpStatusCode.BadRequest);
                //var commentedByUser = Repository.GetUserById(commentedByUserId.ToString());
                pictureComment.UserName =  HttpContext.Current.User.Identity.Name;
                await Repository.SavePictureComment(pictureComment);
                return Request.CreateResponse(HttpStatusCode.OK, pictureComment);
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