using SpiralDomeApp.Helper;
using SpiralDomeApp.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Globalization;
using System.IO;
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
                        obj.SearchByName = obj.SearchByName == null ? "" : obj.SearchByName;
                        var res = (from account in context.Accounts
                                   where account.LoginId == obj.LoginId && account.Name.Contains(obj.SearchByName)
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
                                   where account.Name.Trim() == obj.Name.Trim() && account.LoginId == obj.LoginId
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
                            return InsertNewAccount(obj);
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
                                   where account.Name.Trim() == obj.Name.Trim() && account.LoginId == obj.LoginId
                                   select account).SingleOrDefault();
                       
                        if (res != null)
                        {
                            context.Accounts.Remove(res);
                            context.SaveChanges();
                            status.IsSuccess = true;
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

        public ActionResult Reminder()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetReminderDatabyLoginId(Login obj)
        {
            CallStatus status = new CallStatus();
            try
            {
                if (GenericHelper.IsAuthenticToken(obj.LoginId, obj.Token))
                {
                    using (var context = new SpiralDomeDbContext())
                    {
                        obj.SearchByName = obj.SearchByName == null ? "" : obj.SearchByName;
                        var res = (from account in context.Reminders
                                   where account.LoginId == obj.LoginId && account.Name.Contains(obj.SearchByName)
                                   select account).OrderBy(x => x.Group).ThenBy(x=>x.Name).ToList();


                        for (int i = 0; i < res.Count(); i++)
                        {
                            res[i].StartDateGUI = String.Format("{0:MM/dd/yyyy}", res[i].StartDate);
                            res[i].EndDateGUI =  String.Format("{0:MM/dd/yyyy}", res[i].EndDate);
                        }


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
        public JsonResult InsertNewReminder(Reminder obj)
        {
            CallStatus status = new CallStatus();

            try
            {
                if (GenericHelper.IsAuthenticToken(obj.LoginId, obj.Token))
                {
                    using (var context = new SpiralDomeDbContext())
                    {
                        context.Reminders.Add(obj);
                        context.SaveChanges();
                        status.IsSuccess = true;
                    }
                }
                else
                {
                    throw new Exception("Invalid Authentication Token");
                }
            }catch(Exception ex)
            {
                status.Message = ex.Message;
                status.IsSuccess = false;
            }

            return Json(status);
        }

        [HttpPost]
        public JsonResult UpdateReminder(Reminder obj)
        {
            CallStatus status = new CallStatus();
            try
            {
                if (GenericHelper.IsAuthenticToken(obj.LoginId, obj.Token))
                {
                    using (var context = new SpiralDomeDbContext())
                    {
                        var res = (from reminder in context.Reminders
                                   where reminder.Name.Trim() == obj.Name.Trim() && reminder.LoginId == obj.LoginId
                                   select reminder).SingleOrDefault();

                        if (res != null)
                        {
                            res.Name = obj.Name;
                            res.StartDate = obj.StartDate;
                            res.EndDate = obj.EndDate;
                            res.Group = obj.Group;
                            res.Comment = obj.Comment;
                            context.SaveChanges();
                        }
                        else
                        {
                            return InsertNewReminder(obj);
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
        public JsonResult DeleteReminder(Reminder obj)
        {
            CallStatus status = new CallStatus();
            try
            {
                if (GenericHelper.IsAuthenticToken(obj.LoginId, obj.Token))
                {
                    using (var context = new SpiralDomeDbContext())
                    {
                        var res = (from reminder in context.Reminders
                                   where reminder.Name.Trim() == obj.Name.Trim() && reminder.LoginId == obj.LoginId
                                   select reminder).SingleOrDefault();

                        if (res != null)
                        {
                            context.Reminders.Remove(res);
                            context.SaveChanges();
                            status.IsSuccess = true;
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

        public ActionResult Document()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddDocuments(Login login)
        {
            CallStatus status = new CallStatus();

            try
            {
                string[] fileList = Directory.GetFiles(ConfigurationManager.AppSettings["DocumentPath"],
                                                      ConfigurationManager.AppSettings["DocumentType"]);
                for (int i = 0; i < fileList.Length; i++)
                {
                    var imageData = GenericHelper.ImageToByteArray(fileList[i]);
                    using (var context = new SpiralDomeDbContext())
                    {
                        DocumentImage obj = new DocumentImage()
                        {
                            ImageData = imageData,
                            Name = fileList[i].Split('\\')[fileList[i].Split('\\').Length - 1],
                            LoginId = login.LoginId
                        };
                        context.DocumentImages.Add(obj);
                        context.SaveChanges();
                    }
                }
                status.IsSuccess = true;
            }
            catch (Exception ex)
            {
                status.IsSuccess = false;
                status.Message = ex.Message;
            }
            return Json(status);
        }

        [HttpPost]
        public JsonResult GetDocumentsbyLoginId(Login obj)
        {
            CallStatus status = new CallStatus();
            try
            {
                if (GenericHelper.IsAuthenticToken(obj.LoginId, obj.Token))
                {
                    using (var context = new SpiralDomeDbContext())
                    {
                        obj.SearchByName = obj.SearchByName == null ? "" : obj.SearchByName;



                        var res = 
                            
                            obj.SearchByName == "" ?

                            (from document in context.DocumentImages
                                   where document.LoginId == obj.LoginId && document.Name.Contains("Divorce") == false 
                                   select document).OrderBy(x => x.Name).ToList()
                            :

                             (from document in context.DocumentImages
                              where document.LoginId == obj.LoginId && document.Name.Contains(obj.SearchByName)
                              select document).OrderBy(x => x.Name).ToList()
                           ;

                        foreach(var doc in res)
                        {
                            doc.ImageBase64 = Convert.ToBase64String(doc.ImageData);
                        }

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


    }
}