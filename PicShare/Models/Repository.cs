using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PicShare.Infrastructure;
using System.Threading.Tasks;

namespace PicShare.Models
{
    public class Repository
    {
        public static Board GetUserBoard(Guid userId)
        {
            using (var db = new PicshareDbContext())
            {
                var board = db.Boards.FirstOrDefault(b => b.UserId == userId);
                return board;
            }
        }

        public static async Task<bool> SavePicture(Picture picture)
        {
            using (var db = new PicshareDbContext())
            {
                if (picture.Id == Guid.Empty) picture.Id = Guid.NewGuid();

                if (picture.CreatedOn == DateTime.MinValue) picture.CreatedOn = DateTime.Now;

                if (!db.Pictures.Any(p => p.Id == picture.Id))
                {
                    db.Pictures.Add(picture);
                    await db.SaveChangesAsync();
                }
            }

            return true;
        }
    }
}