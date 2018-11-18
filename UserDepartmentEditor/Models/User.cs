using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace UserDepartmentEditor.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string UserName { get; set; }
        public int DepartmentId { get; set; }
    }
}