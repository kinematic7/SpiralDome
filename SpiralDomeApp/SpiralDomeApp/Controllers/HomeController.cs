using SpiralDomeApp.Models;
using System;
using System.Data.Entity.Validation;
using System.Web.Mvc;
using System.Linq;

namespace SpiralDomeApp.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public JsonResult InsertLogin(Login login)
        {
            var result = new CallStatus();

            using (var context = new SpiralDomeDbContext())
            {
                try
                {
                    if (login.Password != login.ConfirmPassword)
                    {
                        throw new Exception("Passwords do not match");
                    }

                    var isUserExists = (from user in context.Logins
                                            where user.LoginId == login.LoginId.Trim()
                                        select user).SingleOrDefault() != null;

                    if(isUserExists)
                    {
                        throw new Exception("Login Id is already taken, please try again.");
                    }

                    context.Logins.Add(login);
                    context.SaveChanges();
                    result.IsSuccess = true;
                }
                catch (DbEntityValidationException e)
                {            
                    result.IsSuccess = false;
                    result.Message = Helper.ErrorMessage.GetValidationMessage(e);
                }
                catch(Exception ex)
                {
                    result.IsSuccess = false;
                    result.Message = ex.Message;
                }
             }

            return Json(result);
        }
    }
}