using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;

namespace SpiralDomeApp.Helper
{
    public class ErrorMessage
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
    }
}