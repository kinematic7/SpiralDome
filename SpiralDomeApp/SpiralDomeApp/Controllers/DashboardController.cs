using SpiralDomeApp.Helper;
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

        [HttpPost]
        public JsonResult GetAccountDatabyLoginId(Login obj)
        {
            CallStatus status = new CallStatus();
            try
            {
                if (GenericHelper.IsAuthenticToken(obj.LoginId, obj.Token))
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

        [HttpPost]
        public JsonResult InsertNewAccount(Account obj)
        {
            CallStatus status = new CallStatus();
            try
            {
                if (GenericHelper.IsAuthenticToken(obj.LoginId, obj.Token))
                {
                    using (var context = new SpiralDomeDbContext())
                    {
                        context.Accounts.Add(obj);
                        context.SaveChanges();
                    }

                    status.IsSuccess = true;
                }
                else
                {
                    throw new Exception("Invalid Authentication Token");
                }
            }
            catch(Exception ex)
            {
                status.IsSuccess = false;
                status.Message = ex.Message;
            }

            return Json(status);
        }

        [HttpPost]
        public JsonResult UpdateAccount(Account obj)
        {
            CallStatus status = new CallStatus();
            try
            {
                if (GenericHelper.IsAuthenticToken(obj.LoginId, obj.Token))
                {
                    using (var context = new SpiralDomeDbContext())
                    {
                        var res = (from account in context.Accounts
                                   where account.Name.Trim() == obj.Name.Trim()
                                   select account).SingleOrDefault();

                        if(res != null)
                        {
                            res.Name = obj.Name;
                            res.Username = obj.Username;
                            res.Password = obj.Password;
                            res.Url = obj.Url;
                            res.Comment = obj.Comment;
                            context.SaveChanges();
                        }
                        else
                        {
                            throw new Exception("This record does not exist.");
                        }
                    }

                    status.IsSuccess = true;
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

        [HttpPost]
        public JsonResult DeleteAccount(Account obj)
        {
            CallStatus status = new CallStatus();
            try
            {
                if (GenericHelper.IsAuthenticToken(obj.LoginId, obj.Token))
                {
                    using (var context = new SpiralDomeDbContext())
                    {
                        var res = (from account in context.Accounts
                                   where account.Name.Trim() == obj.Name.Trim()
                                   select account).SingleOrDefault();
                       
                        if (res != null)
                        {
                            context.Accounts.Remove(res);
                        }
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
    }
}