using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.DTOs.SurveyQuestion;

namespace api.DTOs.Survey
{
    public class SurveyDTO
    {
        public int SurveyID { get; set; }

        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public string TargetAudience { get; set; } = null!;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool IsActive { get; set; } = true;
        
        public ICollection<SurveyQuestionDTO>? SurveyQuestions { get; set; } = new List<SurveyQuestionDTO>();
        public ICollection<Models.Participation>? Participations { get; set; } = new List<Models.Participation>();
    }
}