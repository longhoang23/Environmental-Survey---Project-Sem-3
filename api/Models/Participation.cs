using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Participations")]
    public class Participation
    {
        [Key]
        public int ParticipationID { get; set; }

        public int UserID { get; set; }
        public int SurveyID { get; set; }
        public DateTime ParticipationDate { get; set; } = DateTime.Now;
        public int? TotalScore { get; set; }
        public string? Feedback { get; set; }

        // Foreign Keys
        [ForeignKey("UserID")]
        public User User { get; set; } = null!;

        [ForeignKey("SurveyID")]
        public Survey Survey { get; set; } = null!;
    }
}
