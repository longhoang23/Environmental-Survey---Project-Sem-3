using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.SurveyRepo
{
    public interface ISurveyRepository
    {
        Task<IEnumerable<Survey>> GetAllSurveysAsync();
        Task<Survey?> GetSurveyByIdAsync(int id);
        Task<Survey?> AddSurveyAsync(Survey survey);
        Task<Survey?> UpdateSurveyAsync(int id, Survey updateSurvey);
        Task<Survey?> DeleteSurveyAsync(int id);
    }
}