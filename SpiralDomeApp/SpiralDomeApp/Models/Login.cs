using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpiralDomeApp.Models
{
    public class Login
    {
        public int Id { get; set; }

        [
         Index(IsUnique = true),
         StringLength(200),
         MinLength(4, ErrorMessage = "Login Id must be atleast 4 characters in length"),
         Required(ErrorMessage = "Login Id is a mandatory field")
        ]
        public string LoginId { get; set; }

        [
         MinLength(4, ErrorMessage = "Password must be atleast 4 characters in length"),
         Required(ErrorMessage = "Password is a mandatory field")
        ]
        public string Password { get; set; }

        [NotMapped]
        public string ConfirmPassword { get; set; }

        public string Token { get; set; }

        public DateTime? LastModified { get; set; }

    }
}