using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using PicShare.Infrastructure;
using PicShare.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace PicShare.Controllers
{
    [Authorize]
    [RoutePrefix("api/upload")]
    public class UploadController : ApiController
    {
        // Enable both Get and Post so that our jquery call can send data, and get a status
        [HttpGet]
        [HttpPost]
        [Route("{isAvatarPicture}")]
        public HttpResponseMessage Upload(bool isAvatarPicture = false)
        {
            try
            {
                if (!HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    return Request.CreateResponse(HttpStatusCode.Unauthorized);
                }

                // Get a reference to the file that our jQuery sent.  Even with multiple files, they will all be their own request and be the 0 index
                HttpPostedFile file = HttpContext.Current.Request.Files[0];

                SaveFile(file, isAvatarPicture);

                // Now we need to wire up a response so that the calling script understands what happened
                HttpContext.Current.Response.ContentType = "text/plain";
                var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                var result = new { imgUrl = CreateUrl(file.FileName, isAvatarPicture), title = isAvatarPicture ? "avatar" : file.FileName };

                HttpContext.Current.Response.Write(serializer.Serialize(result));
                HttpContext.Current.Response.StatusCode = 200;

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new ResponseModel { HasError = true, ErrorMessage = ex.Message });
            }
        }

        [HttpPut]
        public async Task<HttpResponseMessage> SaveUploadedFile(Picture picture)
        {
            try
            {
                if (!HttpContext.Current.User.Identity.IsAuthenticated) return Request.CreateResponse(HttpStatusCode.Unauthorized);

                if (picture == null) return Request.CreateResponse(HttpStatusCode.BadRequest);

                await Repository.SavePicture(picture);

                return Request.CreateResponse(HttpStatusCode.OK, picture);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new ResponseModel { HasError = true, ErrorMessage = ex.Message });
            }
        }

        private string CreateUrl(string fileName, bool isAvatarPicture)
        {
            fileName = isAvatarPicture ? "avatar.jpg" : fileName;
            var uriBuilder = new UriBuilder
            {
                Scheme = HttpContext.Current.Request.Url.Scheme,
                Host = HttpContext.Current.Request.Url.Host,
                Port = HttpContext.Current.Request.Url.Port,
                Path = $"/content/Boards/{HttpContext.Current.User.Identity.Name}/{fileName}"
            };

            return uriBuilder.ToString();
        }

        private void SaveFile(HttpPostedFile file, bool isAvatarPicture)
        {
            if (file.ContentLength > 0)
            {
                var fileName = isAvatarPicture ? "avatar.jpg" : file.FileName;
                string fullPathWithFileName = HttpContext.Current.Server.MapPath($"/content/Boards/{HttpContext.Current.User.Identity.Name}/{fileName}");

                VerifyPath(fullPathWithFileName);

                using (var fs = new FileStream(fullPathWithFileName, FileMode.Append, FileAccess.Write))
                {
                    var buffer = new byte[1024];

                    var l = file.InputStream.Read(buffer, 0, 1024);
                    while (l > 0)
                    {
                        fs.Write(buffer, 0, l);
                        l = file.InputStream.Read(buffer, 0, 1024);
                    }
                    fs.Flush();
                    fs.Close();
                }
            }
        }

        private void VerifyPath(string fullPathWithFileName)
        {
            var folder = Path.GetDirectoryName(fullPathWithFileName);

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }            
        }
        
    }
}
