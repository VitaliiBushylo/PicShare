using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PicShare.Models
{
    public class PicshareUser : IdentityUser
    {
        public bool IsCurrentPageOwner { get; set; }
    }
}