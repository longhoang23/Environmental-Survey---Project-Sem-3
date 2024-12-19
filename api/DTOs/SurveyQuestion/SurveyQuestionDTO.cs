using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace api.DTOs.Survey
{
    public class SurveyQuestionDTO
    {
        public int QuestionID { get; set; }

        public int SurveyID { get; set; }

        public string QuestionText { get; set; } = null!;

        public string QuestionType { get; set; } = null!;

        public SurveyDTO Survey { get; set; } = null!;

        // Navigation Properties
        public ICollection<SurveyOptionDTO>? Options { get; set; } = new List<SurveyOptionDTO>();
    }
}