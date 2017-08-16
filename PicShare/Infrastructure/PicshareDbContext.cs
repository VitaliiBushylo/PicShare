using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using PicShare.Models;

namespace PicShare.Infrastructure
{
    public class PicshareDbContext : DbContext
    {
        public PicshareDbContext() : base("PicshareDb")
        {
        }

        public DbSet<Picture> Pictures { get; set; }

        public DbSet<PictureComment> PictureComments { get; set; }

        public DbSet<Board> Boards { get; set; }
    }
}