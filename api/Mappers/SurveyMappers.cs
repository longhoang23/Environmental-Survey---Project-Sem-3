using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Survey;
using api.Models;

namespace api.Mappers
{
    public static class SurveyMappers
    {
        public static SurveyDTO ToSurveyDTO(this Survey survey)
        {
            return new SurveyDTO
            {
                SurveyID = survey.SurveyID,
                Title = survey.Title,
                Description = survey.Description,
                TargetAudience = survey.TargetAudience,
                StartDate = survey.StartDate,
                EndDate = survey.EndDate,
                IsActive = survey.IsActive,
                SurveyQuestions = survey.SurveyQuestions.Select(o => o.ToSurveyQuestionDTO()).ToList(),
                //Participations = survey.Participations.ToList()
            };
        }
        
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

        public static SurveyQuestionDTO ToSurveyQuestionDTO(this SurveyQuestion surveyQuestion)
        {
            return new SurveyQuestionDTO
            {
                QuestionID = surveyQuestion.QuestionID,
                SurveyID = surveyQuestion.SurveyID,
                QuestionText = surveyQuestion.QuestionText,
                QuestionType = surveyQuestion.QuestionType,
                Options = surveyQuestion.Options.Select(o => o.ToSurveyOptionDTO()).ToList()
            };
        }


    }
}