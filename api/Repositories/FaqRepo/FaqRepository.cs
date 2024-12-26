using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.FaqRepo
{
    public class FaqRepository : IFaqRepository
    {
        private readonly ApplicationDbContext _context;

        public FaqRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<FAQ?> AddFaq(FAQ faq)
        {
            await _context.FAQs.AddAsync(faq);
            await _context.SaveChangesAsync();
            return faq;
        }

        public async Task<FAQ?> DeleteFaq(int id)
        {
            var FAQs = await _context.FAQs.FirstOrDefaultAsync(f => f.FAQID == id);

            if (FAQs != null)
            {
                _context.FAQs.Remove(FAQs);
                await _context.SaveChangesAsync();
                return FAQs;
            }
            return null;
        }

        public async Task<IEnumerable<FAQ>> GetAllFaqs()
        {
            return await _context.FAQs.ToListAsync();
        }

        public async Task<FAQ?> GetFaqById(int id)
        {
             return await _context.FAQs.FirstOrDefaultAsync(f => f.FAQID == id);
        }

        public async Task<FAQ?> UpdateFaq(int id, FAQ updateFaq)
        {
            var existingFaq = await _context.FAQs.FirstOrDefaultAsync(f => f.FAQID == id);

            if (existingFaq != null)
            {
                existingFaq.Question = updateFaq.Question;
                existingFaq.Answer = updateFaq.Answer;

                _context.FAQs.Update(existingFaq);
                await _context.SaveChangesAsync();

                return existingFaq;
            }
            return null;
        }
    }
}
