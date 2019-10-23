namespace SpiralDomeApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Account1 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Accounts", new[] { "Name" });
            AlterColumn("dbo.Accounts", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Accounts", "LoginId", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Accounts", "LoginId", c => c.String());
            AlterColumn("dbo.Accounts", "Name", c => c.String(maxLength: 300));
            CreateIndex("dbo.Accounts", "Name", unique: true);
        }
    }
}
