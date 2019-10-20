namespace SpiralDomeApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Login5 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Logins", "LastModified", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Logins", "LastModified", c => c.DateTime(nullable: false));
        }
    }
}
