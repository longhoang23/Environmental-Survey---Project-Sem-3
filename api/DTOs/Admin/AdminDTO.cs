using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Seminar;
using api.DTOs.Survey;
using api.Enums.Role;
using api.Enums.Status;
using api.Models;

namespace api.DTOs.Admin
{
    public class AdminDTO
    {
        public int UserID { get; set; }

        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email {get; set;} = null!;   
        public string PhoneNumber { get; set; } = null!;
        
        public UserRole Role { get; set; } = UserRole.Admin;

        public string RollOrEmpNo { get; set; } = null!;

        public string? Specification { get; set; }

        public DateTime? JoinDate { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public UserStatus Status { get; set; } = UserStatus.Active;

        public string Username { get; set; } = null!;

        public string Password { get; set; } = null!;
        public ICollection<SurveyDTO>? SurveysCreated { get; set; } = new List<SurveyDTO>();
        public ICollection<SeminarDTO>? SeminarsConducted { get; set; } = new List<SeminarDTO>();
    }
}