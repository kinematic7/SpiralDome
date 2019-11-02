namespace SpiralDomeApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DocumentImage : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DocumentImages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        ImageData = c.Binary(),
                        LoginId = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.DocumentImages");
        }
    }
}
