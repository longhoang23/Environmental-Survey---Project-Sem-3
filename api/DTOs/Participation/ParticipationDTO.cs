using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Participation
{
   public class ParticipationDTO
    {
        public int ParticipationID { get; set; }
        public int UserID { get; set;}
        public int SurveyID { get; set; }
        public DateTime ParticipationDate { get; set; }
        public int? TotalScore { get; set; }
        public string? Feedback { get; set; }
    }
}