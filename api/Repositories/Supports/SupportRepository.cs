using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Supports
{
    public class SupportRepository : ISupportRepository
    {
        private readonly ApplicationDbContext _context;

        public SupportRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create a new Support
        public async Task<Support> CreateSupportAsync(Support support)
        {
            await _context.Supports.AddAsync(support);
            await _context.SaveChangesAsync();
            return support;
        }

        // Get a Support by ID
        public async Task<Support?> GetSupportByIdAsync(int supportID)
        {
            return await _context.Supports.FirstOrDefaultAsync(s => s.SupportID == supportID);
        }

        // Get all Supports
        public async Task<IEnumerable<Support>> GetAllSupportsAsync()
        {
            return await _context.Supports.ToListAsync();
        }

        // Update an existing Support
        public async Task<Support?> UpdateSupportAsync(Support updatedSupport, int supportID)
        {
            var existingSupport = await _context.Supports.FirstOrDefaultAsync(s => s.SupportID == supportID);

            if (existingSupport == null)
                return null;

            // Update the properties
            existingSupport.ContactInfo = updatedSupport.ContactInfo;
            
            _context.Supports.Update(existingSupport);
            await _context.SaveChangesAsync();

            return existingSupport;
        }

        // Delete a Support by ID
        public async Task<Support?> DeleteSupportAsync(int supportId)
        {
            var support = await _context.Supports.FirstOrDefaultAsync(s => s.SupportID == supportId);

            if (support == null)
                return null;

            _context.Supports.Remove(support);
            await _context.SaveChangesAsync();

            return support;
        }

        // Check if a Support exists by ID
        public async Task<bool> SupportExistsAsync(int supportId)
        {
            return await _context.Supports.AnyAsync(s => s.SupportID == supportId);
        }
    }
}
