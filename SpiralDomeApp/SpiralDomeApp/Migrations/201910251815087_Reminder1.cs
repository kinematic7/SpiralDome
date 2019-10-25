namespace SpiralDomeApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Reminder1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Reminders", "LoginId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Reminders", "LoginId");
        }
    }
}
