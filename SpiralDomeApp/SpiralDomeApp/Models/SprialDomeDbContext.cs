using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SpiralDomeApp.Models
{
    public class SpiralDomeDbContext : DbContext
    {
        public SpiralDomeDbContext() : base(ConfigurationManager.AppSettings["SpiralDomeDbContext"].ToString())
        {

        }
        public DbSet<Login> Logins { get; set; }
        public DbSet<Account> Accounts { get; set; }
    }
}