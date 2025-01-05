using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Repositories.Section
{
    public interface ISectionRepository
    {
        Task<api.Models.Section> CreateSectionAsync(api.Models.Section sectionEntity);
        Task<api.Models.Section?> GetSectionByIdAsync(int sectionId);
        Task<IEnumerable<api.Models.Section>> GetAllSectionsAsync();
        Task<api.Models.Section?> UpdateSectionAsync(api.Models.Section updatedSection, int sectionId);
        Task<api.Models.Section?> DeleteSectionAsync(int sectionId);
        Task<bool> SectionExistAsync(int sectionId);
    }
}