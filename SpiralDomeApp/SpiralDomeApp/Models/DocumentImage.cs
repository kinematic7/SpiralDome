using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SpiralDomeApp.Models
{
    public class DocumentImage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] ImageData { get; set; }

        [NotMapped]
        public string ImageBase64 { get; set; }

        public string LoginId { get; set; }
    }
}