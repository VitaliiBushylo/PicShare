using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PicShare.Models
{
    public class Board
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public IList<Picture> Pictures { get; set; }

        public IList<PictureComment> Comments { get; set; }
    }
}