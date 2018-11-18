namespace UserDepartmentEditor.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using UserDepartmentEditor.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<UserDepartmentEditorContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(UserDepartmentEditorContext context)
        {

            context.Departments.AddOrUpdate(x => x.Id,
                new Department() { Id = 1, Title = "IT Department"},
                new Department() { Id = 2, Title = "Marketing" }
                );

            context.Users.AddOrUpdate(x => x.Id,
                new User() { Id = 1, UserName = "johnny81", DepartmentId = 1 },
                new User() { Id = 2, UserName = "missmary", DepartmentId = 2 },
                new User() { Id = 3, UserName = "jijames", DepartmentId = 1 }
                );

        }
    }
}
