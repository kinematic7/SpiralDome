namespace SpiralDomeApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Reminder2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Reminders", "Group", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Reminders", "Group");
        }
    }
}
