using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Participation
{
    public class UpdateParticipationDTO
    {
        public int UserID { get; set;}
        public int SurveyID { get; set; }
        public DateTime ParticipationDate { get; set; } // Optionally update participation date
        public int? TotalScore { get; set; } // Optional score update
        public string? Feedback { get; set; } // Optional feedback update
    }
}