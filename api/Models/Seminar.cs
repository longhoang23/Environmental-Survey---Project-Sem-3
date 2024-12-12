using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Seminars")]
    public class Seminar
    {
        [Key]
        public int SeminarID { get; set; }

        public int ConductedBy { get; set; }

        [Required]
        [MaxLength(200)]
        public string Location { get; set; } = null!;

        public DateTime Date { get; set; }
        public int ParticipantsCount { get; set; }
        public string? Description { get; set; }

        // Foreign Key
        [ForeignKey("ConductedBy")]
        public User Conductor { get; set; } = null!;
    }
}
