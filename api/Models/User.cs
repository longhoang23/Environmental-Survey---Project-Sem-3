using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Enums.Role;
using api.Enums.Status;

namespace api.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; } = null!;

        [Required]
        [MaxLength(10)]
        public string PhoneNumber { get; set; } = null!;

        [Required]
        [MaxLength(20)]
        public UserRole Role { get; set; }

        [Required]
        [MaxLength(50)]
        public string RollOrEmpNo { get; set; } = null!;
        
        public int? KlassId { get; set; }
        public int? SectionId { get; set; }

        [MaxLength(100)]
        public string? Specification { get; set; }
        public DateTime? AdmissionDate { get; set; }
        public DateTime? JoinDate { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [Required]
        [MaxLength(10)]
         public UserStatus Status { get; set; } = UserStatus.Pending;

        [Required]
        [MaxLength(50)]
        public string Username { get; set; } = null!;

        [Required]
        [MaxLength(255)]
        public string PasswordHash { get; set; } = null!;

        // Foreign Keys
        [ForeignKey("KlassId")]
        public Klass? Klass { get; set; }

        [ForeignKey("SectionId")]
        public Section? Section { get; set; }

        // Navigation Properties
        public ICollection<Survey> SurveysCreated { get; set; } = new List<Survey>();
        public ICollection<Participation> Participations { get; set; } = new List<Participation>();
        public ICollection<Seminar> SeminarsConducted { get; set; } = new List<Seminar>();
    }
}
