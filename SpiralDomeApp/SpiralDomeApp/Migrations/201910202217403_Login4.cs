namespace SpiralDomeApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Login4 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Logins", "Token", c => c.String());
            AddColumn("dbo.Logins", "LastModified", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Logins", "LastModified");
            DropColumn("dbo.Logins", "Token");
        }
    }
}
