using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.Supports
{
    public interface ISupportRepository
    {
        Task<Support> CreateSupportAsync(Support support);
        Task<Support?> GetSupportByIdAsync(int supportID);
        Task<IEnumerable<Support>> GetAllSupportsAsync(); // Added optional klassId parameter
        Task<Support?> UpdateSupportAsync(Support updatedSupport, int supportID);
        Task<Support?> DeleteSupportAsync(int supportId);
        Task<bool> SupportExistsAsync(int supportId);
    }
}