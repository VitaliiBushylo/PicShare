using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Web;

namespace PicShare.Models
{
    public class SharingModel
    {
        public Guid OwnerUserId { get; set; }
        public Guid PictureId { get; set; }
        public string PictureUrl { get; set; }
        public Guid[] ShareToUsers { get; set; }
    }
}