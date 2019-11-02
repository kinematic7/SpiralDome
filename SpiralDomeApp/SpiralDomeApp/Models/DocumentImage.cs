using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpiralDomeApp.Models
{
    public class DocumentImage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] ImageData { get; set; }
        public string LoginId { get; set; }
    }
}