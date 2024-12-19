using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api.Models
{
    [Table("Surveys")]
    public class Survey
    {
        [Key]
        public int SurveyID { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        [Required]
        [MaxLength(20)]
        public string TargetAudience { get; set; } = null!;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public int CreatedBy { get; set; }
        public bool IsActive { get; set; } = true;

        // Foreign Key
        [ForeignKey("CreatedBy")]
        public User Creator { get; set; } = null!;

        // Navigation Properties
        public ICollection<SurveyQuestion>? SurveyQuestions { get; set; } = new List<SurveyQuestion>();
        public ICollection<Participation>? Participations { get; set; } = new List<Participation>();
    }
}
