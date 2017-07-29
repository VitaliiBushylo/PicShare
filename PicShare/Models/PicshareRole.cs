using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PicShare.Models
{
    public class PicshareRole : IdentityRole
    {
        public PicshareRole() : base() { }
        public PicshareRole(string name) : base(name) { }
    }
}