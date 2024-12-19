using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api.Models
{
    [Table("SurveyQuestions")]
    public class SurveyQuestion
    {
        [Key]
        public int QuestionID { get; set; }

        public int SurveyID { get; set; }

        [Required]
        [MaxLength(500)]
        public string QuestionText { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string QuestionType { get; set; } = null!;

        // Foreign Key
        [ForeignKey("SurveyID")]
        public Survey Survey { get; set; } = null!;

        // Navigation Properties
        public ICollection<SurveyOption>? Options { get; set; } = new List<SurveyOption>();
    }
}
