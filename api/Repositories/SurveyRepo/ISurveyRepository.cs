using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.SurveyRepo
{
    public interface ISurveyRepository
    {
        Task<IEnumerable<Survey>> GetAllSurvey();
        Task<Survey?> GetSurveyById(int id);
        Task<Survey?> AddSurvey(Survey survey);
        Task<Survey?> UpdateSurvey(int id, Survey updateSurvey);
        Task<Survey?> DeleteSurvey(int id);
    }
}