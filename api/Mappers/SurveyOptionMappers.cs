using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Survey;
using api.DTOs.SurveyOption;
using api.Models;

namespace api.Mappers
{
    public static class SurveyOptionMappers
    {
        public static SurveyOptionDTO ToSurveyOptionDTO(this SurveyOption surveyOption)
        {
            return new SurveyOptionDTO
            {
                OptionID = surveyOption.OptionID,
                QuestionID = surveyOption.QuestionID,
                OptionText = surveyOption.OptionText,
                Score = surveyOption.Score
            };
        }

        public static SurveyOption toUpsertSurveyOptionDTO(this UpsertSurveyOptionDTO upsertSurveyOptionDTO)
        {
            return new SurveyOption
            {
                QuestionID = upsertSurveyOptionDTO.QuestionID,
                OptionText = upsertSurveyOptionDTO.OptionText,
                Score = upsertSurveyOptionDTO.Score
            };
        }

    }
}