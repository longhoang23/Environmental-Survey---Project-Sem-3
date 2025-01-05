using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Participations
{
   public class ParticipationRepository : IParticipationRepository
    {
        private readonly ApplicationDbContext _context;

        public ParticipationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Participation> CreateParticipationAsync(Participation participation)
        {
            await _context.Participations.AddAsync(participation);
            await _context.SaveChangesAsync();
            return participation;
        }

        public async Task<Participation?> GetParticipationByIdAsync(int participationId)
        {
            return await _context.Participations
                .Include(p => p.User) // Include User to get related data
                .Include(p => p.Survey) // Include Survey to get related data
                .FirstOrDefaultAsync(p => p.ParticipationID == participationId);
        }

        public async Task<IEnumerable<Participation>> GetAllParticipationsAsync()
        {
            return await _context.Participations
                .Include(p => p.User) // Include User to get related data
                .Include(p => p.Survey) // Include Survey to get related data
                .ToListAsync();
        }

        public async Task<Participation?> UpdateParticipationAsync(Participation updatedParticipation, int participationId)
        {
            var existingParticipation = await _context.Participations.FindAsync(participationId);
            if (existingParticipation == null)
            {
                return null;
            }
            
            existingParticipation.ParticipationDate = updatedParticipation.ParticipationDate;
            existingParticipation.TotalScore = updatedParticipation.TotalScore;
            existingParticipation.Feedback = updatedParticipation.Feedback;

            await _context.SaveChangesAsync();
            return existingParticipation;
        }

        public async Task<Participation?> DeleteParticipationAsync(int participationId)
        {
            var participation = await _context.Participations.FindAsync(participationId);
            if (participation == null)
            {
                return null;
            }

            _context.Participations.Remove(participation);
            await _context.SaveChangesAsync();
            return participation;
        }

        public async Task<bool> ParticipationExistsAsync(int participationId)
        {
            return await _context.Participations.AnyAsync(p => p.ParticipationID == participationId);
        }
    }
}