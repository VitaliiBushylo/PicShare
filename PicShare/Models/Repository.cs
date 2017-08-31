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

        public static IList<Picture> GetUserPictures(Guid userId)
        {
            using (var db = new PicshareDbContext())
            {
                return db.Pictures.Where(p => p.UserId == userId).ToList();
            }
        }

        public static IList<PicshareUser> SearchUsers(string userName)
        {
            using (var db = new PicshareIdentityDbContext())
            {
                return db.Users.Where(u => u.UserName.Contains(userName)).ToList();
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

        public static async Task SaveShareEntries(IEnumerable<ShareEntry> shareEntries)
        {
            using (var db = new PicshareDbContext())
            {
                foreach (var shareEntry in shareEntries)
                {
                    if (db.ShareEntries.Any(se => se.OwnerUserId == shareEntry.OwnerUserId && se.ToUserId == shareEntry.ToUserId && se.PictureId == shareEntry.PictureId))
                    {
                        continue;
                    }

                    db.ShareEntries.Add(shareEntry);
                }
                
                await db.SaveChangesAsync();
            }
        }
    }
}