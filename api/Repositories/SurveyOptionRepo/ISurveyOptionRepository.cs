using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.SurveyOptionRepo
{
    public interface ISurveyOptionRepository
    {
        Task<IEnumerable<SurveyOption>> GetAllSurveyOptionsAsync();
        Task<SurveyOption?> GetSurveyOptionByIdAsync(int id);
        Task<SurveyOption?> AddSurveyOptionAsync(SurveyOption surveyOption);
        Task<SurveyOption?> UpdateSurveyOptionAsync(int id, SurveyOption updateSurveyOption);
        Task<SurveyOption?> DeleteSurveyOptionAsync(int id);
    }
}