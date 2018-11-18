using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserDepartmentEditor.Models
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Department { get; set; }
        public int DepartmentId { get; set; }
    }
}