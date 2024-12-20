using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums.Role;

namespace api.DTOs.Registration
{
    public class RegisterDTO
    {
        public string FirstName { get; set; } // User's first name
        public string LastName { get; set; } // User's last name
        public string RollOrEmpNo { get; set; } = null!; 
        public int? ClassId { get; set; }
        public int? SectionId { get; set; }
        public string? Specification { get; set; }
        public DateTime? AdmissionDate { get; set; }  // For Students
        public DateTime? JoinDate { get; set; }  //For Staff
        
    }
}