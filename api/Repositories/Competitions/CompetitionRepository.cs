using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Competitions
{
    public class CompetitionRepository : ICompetitionRepository
    {
        private readonly ApplicationDbContext _context;

        public CompetitionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Competition> CreateCompetitionAsync(Competition competition)
        {
            await _context.Competitions.AddAsync(competition);
            await _context.SaveChangesAsync();
            return competition;
        }

        public async Task<Competition?> GetCompetitionByIdAsync(int competitionId)
        {
            return await _context.Competitions
                .Include(c => c.FirstPlace)  // if you want to load related winners
                .Include(c => c.SecondPlace)
                .Include(c => c.ThirdPlace)
                .FirstOrDefaultAsync(c => c.CompetitionID == competitionId);
        }

        public async Task<IEnumerable<Competition>> GetAllCompetitionsAsync()
        {
            return await _context.Competitions
                .Include(c => c.FirstPlace)
                .Include(c => c.SecondPlace)
                .Include(c => c.ThirdPlace)
                .ToListAsync();
        }

        public async Task<Competition?> UpdateCompetitionAsync(Competition updatedCompetition, int competitionId)
        {
            var existingCompetition = await _context.Competitions.FindAsync(competitionId);
            if (existingCompetition == null)
            {
                return null;
            }

            existingCompetition.Title = updatedCompetition.Title;
            existingCompetition.Description = updatedCompetition.Description;
            existingCompetition.PrizeDetails = updatedCompetition.PrizeDetails;
            existingCompetition.Winner1 = updatedCompetition.Winner1;
            existingCompetition.Winner2 = updatedCompetition.Winner2;
            existingCompetition.Winner3 = updatedCompetition.Winner3;

            await _context.SaveChangesAsync();
            return existingCompetition;
        }

        public async Task<Competition?> DeleteCompetitionAsync(int competitionId)
        {
            var competition = await _context.Competitions.FindAsync(competitionId);
            if (competition == null)
            {
                return null;
            }

            _context.Competitions.Remove(competition);
            await _context.SaveChangesAsync();
            return competition;
        }

        public async Task<bool> CompetitionExistsAsync(int competitionId)
        {
            return await _context.Competitions
                .AnyAsync(c => c.CompetitionID == competitionId);
        }
    }
}