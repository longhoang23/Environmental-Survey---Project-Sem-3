using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Survey;
using api.DTOs.SurveyQuestion;
using api.Models;

namespace api.Mappers
{
    public static class SurveyQuestionMappers
    {
        public static SurveyQuestionDTO ToSurveyQuestionDTO(this SurveyQuestion surveyQuestion)
        {
            return new SurveyQuestionDTO
            {
                QuestionID = surveyQuestion.QuestionID,
                SurveyID = surveyQuestion.SurveyID,
                QuestionText = surveyQuestion.QuestionText,
                QuestionType = surveyQuestion.QuestionType,
                Options = surveyQuestion.Options?.Select(o => o.ToSurveyOptionDTO()).ToList()
            };
        }

        public static SurveyQuestion toUpsertSurveyDTO(this UpsertSurveyQuestionDTO upsertSurveyQuestionDTO)
        {
            return new SurveyQuestion
            {
                SurveyID = upsertSurveyQuestionDTO.SurveyID,
                QuestionText = upsertSurveyQuestionDTO.QuestionText,
                QuestionType = upsertSurveyQuestionDTO.QuestionType
            };
        }
    
    }
}