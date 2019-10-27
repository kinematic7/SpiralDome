using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SpiralDomeApp.Models
{
    public class Reminder
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Group { get; set; }
        public string Comment { get; set; }
        public string LoginId { get; set; }
        
        [NotMapped]
        public string StartDateGUI { get; set; }

        [NotMapped]
        public string EndDateGUI { get; set; }

        [NotMapped]
        public string Token { get; set; }
    }
}