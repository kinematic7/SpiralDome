using SpiralDomeApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;

namespace SpiralDomeApp.Helper
{
    public class GenericHelper
    {
        public static string GetValidationMessage(DbEntityValidationException e)
        {
            var errorMsg = "";

            foreach (var eve in e.EntityValidationErrors)
            {
                errorMsg += ("Entity of type " + eve.Entry.Entity.GetType().Name + " in state " + eve.Entry.State + " has the following validation errors: <br/>");
                foreach (var ve in eve.ValidationErrors)
                {
                    errorMsg += ("- Property: " + ve.PropertyName + ", Error: " + ve.ErrorMessage + "<br/>");
                }
            }

            return errorMsg;
        }
        public static bool IsAuthenticToken(string loginid, string token)
        {
            var retVal = false;
            using (var context = new SpiralDomeDbContext())
            {
                var res = (from login in context.Logins
                           where login.LoginId == loginid && login.Token == token
                           select login).SingleOrDefault();

                if (res == null)
                {
                    retVal = false;
                }
                else
                {
                    retVal = true;
                    res.LastModified = DateTime.UtcNow;
                    context.SaveChanges();
                }
            }

            return retVal;
        }

    }
}