using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.Class
{
    public interface IKlassRepository
    {
        Task<Klass> CreateClassAsync(Klass classEntity);
        Task<Klass?> GetClassByIdAsync(int classId);
        Task<IEnumerable<Klass>> GetAllClassesAsync();
        Task<Klass?> UpdateClassAsync(Klass updatedClass, int classId);
        Task<Klass?> DeleteClassAsync(int classId);
        Task<bool> ClassExistAsync(int classId);
    }
}