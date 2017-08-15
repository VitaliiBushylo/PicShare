using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PicShare.Models
{
    public class Picture
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Title { get; set; }

        [Column(TypeName = "image")]
        public byte[] Image { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}