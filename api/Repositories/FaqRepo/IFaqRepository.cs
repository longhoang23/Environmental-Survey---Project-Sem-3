using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.FAQ;
using api.Models;

namespace api.Repositories.FaqRepo
{
    public interface IFaqRepository
    {
        Task<IEnumerable<FAQs>> GetAllFaqs();
        Task<FAQs?> GetFaqById(int id);
        Task<FAQs?> AddFaq(FAQs faq);
        Task<FAQs?> UpdateFaq(int id, FAQs updateFaq);
        Task<FAQs?> DeleteFaq(int id);
    }
}