using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace api.Repositories.Seminar
{
    public interface ISeminarRepository
    {
        Task<Models.Seminar> CreateSeminarAsync(Models.Seminar seminar);
        Task<Models.Seminar?> GetSeminarByIdAsync(int seminarId);
        Task<IEnumerable<Models.Seminar>> GetAllSeminarsAsync();
        Task<Models.Seminar?> UpdateSeminarAsync(Models.Seminar updatedSeminar, int seminarId);
        Task<Models.Seminar?> DeleteSeminarAsync(int seminarId);
        Task<bool> SeminarExistsAsync(int seminarId);
    }
}