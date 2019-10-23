namespace SpiralDomeApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Account : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Accounts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 300),
                        Url = c.String(),
                        Username = c.String(),
                        Password = c.String(),
                        Comment = c.String(),
                        LoginId = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Accounts", new[] { "Name" });
            DropTable("dbo.Accounts");
        }
    }
}
