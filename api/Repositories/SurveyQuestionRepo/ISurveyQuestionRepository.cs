using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.SurveyQuestionRepo
{
    public interface ISurveyQuestionRepository
    {
        Task<IEnumerable<SurveyQuestion>> GetAllSurveyQuestionsAsync();
        Task<SurveyQuestion?> GetSurveyQuestionByIdAsync(int id);
        Task<SurveyQuestion?> AddSurveyQuestionAsync(SurveyQuestion surveyQuestion);
        Task<SurveyQuestion?> UpdateSurveyQuestionAsync(int id, SurveyQuestion updateSurveyQuestion);
        Task<SurveyQuestion?> DeleteSurveyQuestionAsync(int id);
    }
}