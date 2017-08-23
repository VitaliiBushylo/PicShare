using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using PicShare.Infrastructure;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace PicShare.Controllers
{
    [Authorize]
    public class UploadController : ApiController
    {
        // Enable both Get and Post so that our jquery call can send data, and get a status
        [HttpGet]
        [HttpPost]
        public HttpResponseMessage Upload()
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized);
            }

            // Get a reference to the file that our jQuery sent.  Even with multiple files, they will all be their own request and be the 0 index
            HttpPostedFile file = HttpContext.Current.Request.Files[0];

            // do something with the file in this space 
            // {....}
            // end of file doing
            SaveFile(file);

            // Now we need to wire up a response so that the calling script understands what happened
            HttpContext.Current.Response.ContentType = "text/plain";
            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            var result = new { name = file.FileName };

            HttpContext.Current.Response.Write(serializer.Serialize(result));
            HttpContext.Current.Response.StatusCode = 200;

            // For compatibility with IE's "done" event we need to return a result as well as setting the context.response
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        private void SaveFile(HttpPostedFile file)
        {
            if (file.ContentLength > 0)
            {
                string fullPathWithFileName = HttpContext.Current.Server.MapPath($"/content/Boards/{HttpContext.Current.User.Identity.Name}/{file.FileName}");

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
