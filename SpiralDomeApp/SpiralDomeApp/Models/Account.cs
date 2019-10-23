using System;
using System.Activities.Expressions;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SpiralDomeApp.Models
{
    public class Account
    {
        public int Id { get; set; }
        [Index(IsUnique = true), StringLength(300)]
        public string Name { get; set; }
        public string Url { get; set;  }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Comment { get; set; }
        public string LoginId { get; set; }
        [NotMapped]
        public string Token { get; set; }
    }
}