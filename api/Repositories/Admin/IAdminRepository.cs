using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.Admin
{
    public interface IAdminRepository
    {
        Task<User> CreateAdminAsync(User user);
        Task<User?> GetAdminByIdAsync(int userId);
        Task<User?> UpdateAdminAsync(User user, int userID);
        Task<User?> DeleteAdminAsync(int userId);
        Task<IEnumerable<User>> GetAllAdminsAsync();
        Task<bool> AdminExistAsync(int userId);
    
    }
}