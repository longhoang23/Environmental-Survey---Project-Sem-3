using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.SurveyOptionRepo
{
    public interface ISurveyOptionRepository
    {
        Task<IEnumerable<SurveyOption>> GetAllSurveyOptions();
        Task<SurveyOption?> GetSurveyOptionById(int id);
        Task<SurveyOption?> AddSurveyOption(SurveyOption surveyOption);
        Task<SurveyOption?> UpdateSurveyOption(int id, SurveyOption updateSurveyOption);
        Task<SurveyOption?> DeleteSurveyOption(int id);
    }
}