using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Survey;

namespace api.DTOs.SurveyQuestion
{
    public class UpsertSurveyQuestionDTO
    {
        public int QuestionID { get; set; }
        public int SurveyID { get; set; }
        public string QuestionText { get; set; } = null!;
        public string QuestionType { get; set; } = null!;
    }
}