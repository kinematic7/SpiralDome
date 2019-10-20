using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SpiralDomeApp.Models
{
    public class CallStatus
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public JsonResult JsonObject { get; set; }
    }
}