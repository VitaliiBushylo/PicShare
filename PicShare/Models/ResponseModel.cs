using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PicShare.Models
{
    public class ResponseModel
    {
        public string JsonContent { get; set; }
        public bool HasError { get; set; }
        public string ErrorMessage { get; set; }
    }
}