using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.SurveyOption
{
    public class UpsertSurveyOptionDTO
    {
        public int OptionID { get; set; }
        public int QuestionID { get; set; }
        public string OptionText { get; set; } = null!;
        public int Score { get; set; } = 0;
    }
}