using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.SurveyQuestion;

namespace api.DTOs.Survey
{
    public class SurveyOptionDTO
    {
        public int OptionID { get; set; }

        public int QuestionID { get; set; }

        public string OptionText { get; set; } = null!;

        public int Score { get; set; } = 0;

        public SurveyQuestionDTO? Question { get; set; } = null!;
    }
}