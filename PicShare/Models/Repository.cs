using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PicShare.Infrastructure;

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
    }
}