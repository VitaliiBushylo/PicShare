using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PicShare.Models
{
    public class ShareEntry
    {
        public ShareEntry()
        {
            Id = Guid.NewGuid();
        }
        public ShareEntry(Guid ownerUserId, Guid toUserId, Guid pictureId, string pictureUrl) : this()
        {
            OwnerUserId = ownerUserId;
            ToUserId = toUserId;
            PictureId = pictureId;
            PictureUrl = pictureUrl;
        }

        public Guid Id { get; set; }
        public Guid OwnerUserId { get; set; }
        public Guid ToUserId { get; set; }
        public Guid PictureId { get; set; }
        public string PictureUrl { get; set; }
    }
}