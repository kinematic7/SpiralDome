using SpiralDomeApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SpiralDomeApp.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public ActionResult Account()
        {
            return View();
        }

        public JsonResult GetAccountDatabyLoginId(Login obj)
        {
            CallStatus status = new CallStatus();
            try
            {
                if (IsAuthenticToken(obj.LoginId, obj.Token))
                {
                    using (var context = new SpiralDomeDbContext())
                    {
                        var res = (from account in context.Accounts
                                   where account.LoginId == obj.LoginId
                                   select account).OrderBy(x=>x.Name).ToList();
                        status.IsSuccess = true;
                        status.JsonObject = Json(res);
                    }
                }
                else
                {
                    throw new Exception("Invalid Authentication Token");
                }
            }
            catch (Exception ex)
            {
                status.IsSuccess = false;
                status.Message = ex.Message;
            }
            return Json(status);
        }

        public bool IsAuthenticToken(string loginid, string token)
        {
            var retVal = false;
            using(var context = new SpiralDomeDbContext())
            {
                var res = (from login in context.Logins
                           where login.LoginId == loginid && login.Token == token
                           select login).SingleOrDefault();
                
                if(res == null)
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