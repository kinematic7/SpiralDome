namespace SpiralDomeApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Login1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Logins", "LoginId", c => c.String(maxLength: 200));
            CreateIndex("dbo.Logins", "LoginId", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.Logins", new[] { "LoginId" });
            AlterColumn("dbo.Logins", "LoginId", c => c.String());
        }
    }
}
