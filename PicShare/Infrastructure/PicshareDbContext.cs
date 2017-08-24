using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using PicShare.Models;
using System.Data.Entity.Migrations;
using PicShare.Migrations;

namespace PicShare.Infrastructure
{
    public class PicshareDbContext : DbContext
    {
        static PicshareDbContext()
        {
            Database.SetInitializer<PicshareDbContext>(new PicshareDbInit());
        }

        public PicshareDbContext() : base("PicshareDb")
        {
        }

        public DbSet<Picture> Pictures { get; set; }

        public DbSet<PictureComment> PictureComments { get; set; }

        public DbSet<Board> Boards { get; set; }
    }

    public class PicshareConfiguration : DbMigrationsConfiguration<PicshareDbContext>
    {
        public PicshareConfiguration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
            
        }
    }

    public class PicshareDbInit : MigrateDatabaseToLatestVersion<PicshareDbContext, Configuration>
    {
    }
}