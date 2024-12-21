using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("RegistrationRequests")]
    public class RegistrationRequest
    {
        [Key]
        public int RegistrationRequestId { get; set; }
        
        public int UserId { get; set; }
        
        // Fields from RegisterDTO
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string RollOrEmpNo { get; set; } = null!;
        public int? ClassId { get; set; }
        public int? SectionId { get; set; }
        public string? Specification { get; set; }
        public DateTime? AdmissionDate { get; set; }  // For Students
        public DateTime? JoinDate { get; set; }       // For Staff
        
        public DateTime RequestedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}