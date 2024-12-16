using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Seminar
{
    public class SeminarRepository : ISeminarRepository
    {
        private readonly ApplicationDbContext _context;

        public SeminarRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Models.Seminar> CreateSeminarAsync(Models.Seminar seminar)
        {
            await _context.Seminars.AddAsync(seminar);
            await _context.SaveChangesAsync();
            return seminar;
        }

        public async Task<Models.Seminar?> GetSeminarByIdAsync(int seminarId)
        {
            return await _context.Seminars
                .Include(s => s.Conductor) // If you want to load the related 'User'
                .FirstOrDefaultAsync(s => s.SeminarID == seminarId);
        }

        public async Task<IEnumerable<Models.Seminar>> GetAllSeminarsAsync()
        {
            return await _context.Seminars
                .Include(s => s.Conductor) // If you want to load the related 'User'
                .ToListAsync();
        }

        public async Task<Models.Seminar?> UpdateSeminarAsync(Models.Seminar updatedSeminar, int seminarId)
        {
            var existingSeminar = await _context.Seminars.FindAsync(seminarId);
            if (existingSeminar == null)
            {
                return null;
            }

            existingSeminar.ConductedBy = updatedSeminar.ConductedBy;
            existingSeminar.Location = updatedSeminar.Location;
            existingSeminar.Date = updatedSeminar.Date;
            existingSeminar.ParticipantsCount = updatedSeminar.ParticipantsCount;
            existingSeminar.Description = updatedSeminar.Description;

            await _context.SaveChangesAsync();
            return existingSeminar;
        }

        public async Task<Models.Seminar?> DeleteSeminarAsync(int seminarId)
        {
            var seminar = await _context.Seminars.FindAsync(seminarId);
            if (seminar == null)
            {
                return null;
            }

            _context.Seminars.Remove(seminar);
            await _context.SaveChangesAsync();
            return seminar;
        }

        public async Task<bool> SeminarExistsAsync(int seminarId)
        {
            return await _context.Seminars.AnyAsync(s => s.SeminarID == seminarId);
        }
    }
}