namespace SpiralDomeApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Login2 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Logins", new[] { "LoginId" });
            AlterColumn("dbo.Logins", "LoginId", c => c.String(nullable: false, maxLength: 200));
            AlterColumn("dbo.Logins", "Password", c => c.String(nullable: false));
            CreateIndex("dbo.Logins", "LoginId", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.Logins", new[] { "LoginId" });
            AlterColumn("dbo.Logins", "Password", c => c.String());
            AlterColumn("dbo.Logins", "LoginId", c => c.String(maxLength: 200));
            CreateIndex("dbo.Logins", "LoginId", unique: true);
        }
    }
}
