using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.FaqRepo
{
    public interface IFaqRepository
    {
         Task<IEnumerable<FAQ>> GetAllFaqs();
        Task<FAQ?> GetFaqById(int id);
        Task<FAQ?> AddFaq(FAQ faq);
        Task<FAQ?> UpdateFaq(int id, FAQ updateFaq);
        Task<FAQ?> DeleteFaq(int id);
    }
}