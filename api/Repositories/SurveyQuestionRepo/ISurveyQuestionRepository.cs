using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.SurveyQuestionRepo
{
    public interface ISurveyQuestionRepository
    {
        Task<IEnumerable<SurveyQuestion>> GetAllSurveyQuestions();
        Task<SurveyQuestion?> GetSurveyQuestionById(int id);
        Task<SurveyQuestion?> AddSurveyQuestion(SurveyQuestion surveyQuestion);
        Task<SurveyQuestion?> UpdateSurveyQuestion(int id, SurveyQuestion updateSurveyQuestion);
        Task<SurveyQuestion?> DeleteSurveyQuestion(int id);
    }
}