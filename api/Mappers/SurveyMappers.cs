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
                SurveyQuestions = survey.SurveyQuestions?.Select(o => o.ToSurveyQuestionDTO()).ToList(),
                //Participations = survey.Participations.ToList()
            };
        }

        public static Survey toCreateSurveyDTO(this CreateSurveyDTO createSurveyDTO)
        {
            return new Survey
            {
                Title = createSurveyDTO.Title,
                Description = createSurveyDTO.Description,
                TargetAudience = createSurveyDTO.TargetAudience,
                StartDate = createSurveyDTO.StartDate,
                EndDate = createSurveyDTO.EndDate,
                CreatedBy = createSurveyDTO.CreatedBy,
                IsActive = createSurveyDTO.IsActive,
                //Creator = createSurveyDTO.Creator
            };
        }

        public static Survey ToUpdatedSurvey(this UpdateSurveyDTO updateSurveyDTO)
        {
            var survey = new Survey
            {
                Title = updateSurveyDTO.Title,
                Description = updateSurveyDTO.Description,
                TargetAudience = updateSurveyDTO.TargetAudience,
                StartDate = updateSurveyDTO.StartDate,
                EndDate = updateSurveyDTO.EndDate,
                IsActive = updateSurveyDTO.IsActive
            };
            return survey;
        }

    }
}