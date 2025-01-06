using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Section
{
    public class SectionRepository : ISectionRepository
    {
        private readonly ApplicationDbContext _context;

        public SectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<api.Models.Section> CreateSectionAsync(api.Models.Section sectionEntity)
        {
            await _context.Sections.AddAsync(sectionEntity);
            await _context.SaveChangesAsync();
            return sectionEntity;
        }

        public async Task<api.Models.Section?> GetSectionByIdAsync(int sectionId)
        {
            return await _context.Sections
                .Include(s => s.Users) // If you want to load related Users
                .FirstOrDefaultAsync(s => s.SectionId == sectionId);
        }

        public async Task<IEnumerable<api.Models.Section>> GetAllSectionsAsync()
        {
            return await _context.Sections
                .Include(s => s.Users) // If you want to load related Users
                .ToListAsync();
        }

        public async Task<api.Models.Section?> UpdateSectionAsync(api.Models.Section updatedSection, int sectionId)
        {
            var existingSection = await _context.Sections.FindAsync(sectionId);
            if (existingSection == null)
            {
                return null;
            }

            // Update the fields you want to allow changes on
            existingSection.Name = updatedSection.Name;

            // If you need to update Users, you'd do it separately or handle in detail
            await _context.SaveChangesAsync();
            return existingSection;
        }

        public async Task<api.Models.Section?> DeleteSectionAsync(int sectionId)
        {
            var section = await _context.Sections.FindAsync(sectionId);
            if (section == null)
            {
                return null;
            }

            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();
            return section;
        }

        public async Task<bool> SectionExistAsync(int sectionId)
        {
            return await _context.Sections.AnyAsync(s => s.SectionId == sectionId);
        }
    }
}