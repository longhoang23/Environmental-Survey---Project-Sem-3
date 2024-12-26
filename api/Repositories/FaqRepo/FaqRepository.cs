using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.FAQ;
using api.Mappers;
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

        public async Task<IEnumerable<FAQs>> GetAllFaqs()
        {
            return await _context.FAQs.ToListAsync();
        }

        public async Task<FAQs?> GetFaqById(int id)
        {
            return await _context.FAQs.FirstOrDefaultAsync(f => f.FAQID == id);
        }

        public async Task<FAQs> AddFaq(FAQs faq)
        {
            await _context.FAQs.AddAsync(faq);
            await _context.SaveChangesAsync();
            return faq;
        }

        public async Task<FAQs?> UpdateFaq(int id, FAQs updateFaq)
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

        public async Task<FAQs?> DeleteFaq(int id)
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
    }
}