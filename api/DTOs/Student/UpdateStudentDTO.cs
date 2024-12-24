using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums.Role;
using api.Enums.Status;

namespace api.DTOs.Student
{
    public class UpdateStudentDTO
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        
        public UserRole Role { get; set; } = UserRole.Student;

        // public string RollOrEmpNo { get; set; } = null!;
        public int? KlassId {get;set;}
        public string? Specification { get; set; }
        public UserStatus Status {get; set;} 

        // public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}