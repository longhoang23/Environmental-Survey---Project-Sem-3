using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Competition;
using api.DTOs.Participation;
using api.DTOs.Seminar;
using api.Enums.Role;
using api.Enums.Status;

namespace api.DTOs.Staff
{
    public class StaffDTO
    {
        public int UserID { get; set; }

        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email {get; set;} = null!;
        public string PhoneNumber { get; set; } = null!;
        
        public UserRole Role { get; set; } = UserRole.Staff;

        public string RollOrEmpNo { get; set; } = null!;
        public int? SectionId { get; set; }

        public string? Specification { get; set; }

        public DateTime? JoinDate { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public UserStatus Status { get; set; } = UserStatus.Active;

        public string Username { get; set; } = null!;

        public string Password { get; set; } = null!;

        public ICollection<ParticipationDTO>? Participations { get; set; } = new List<ParticipationDTO>();
        public ICollection<SeminarDTO>? SeminarsConducted { get; set; } = new List<SeminarDTO>();
        public ICollection<CompetitionDTO>? Winners {get; set;} = new List<CompetitionDTO>();
    }
    
}