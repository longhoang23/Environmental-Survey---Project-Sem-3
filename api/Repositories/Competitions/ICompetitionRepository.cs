using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.Competitions
{
    public interface ICompetitionRepository
    {
        Task<Competition> CreateCompetitionAsync(Competition competition);
        Task<Competition?> GetCompetitionByIdAsync(int competitionId);
        Task<IEnumerable<Competition>> GetAllCompetitionsAsync();
        Task<Competition?> UpdateCompetitionAsync(Competition updatedCompetition, int competitionId);
        Task<Competition?> DeleteCompetitionAsync(int competitionId);
        Task<bool> CompetitionExistsAsync(int competitionId);
    }
}