using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Participation
{
    public class ParticipationDTO
    {
        public int ParticipationID { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty; // Combines FirstName and LastName from User
        public int SurveyID { get; set; }
        public string SurveyTitle { get; set; } = string.Empty; // Title of the survey
        public DateTime ParticipationDate { get; set; }
        public int? TotalScore { get; set; }
        public string? Feedback { get; set; }
    }
}