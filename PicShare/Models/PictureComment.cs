using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PicShare.Models
{
    public class PictureComment
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        
        public string CommentText { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}