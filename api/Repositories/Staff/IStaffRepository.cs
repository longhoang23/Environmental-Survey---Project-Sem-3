using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.Staff
{
    public interface IStaffRepository
    {
        Task<User> CreateStaffAsync(User user);
        Task<User?> GetStaffByIdAsync(int userId);
        Task<IEnumerable<User>> GetAllStaffAsync();
        Task<User?> UpdateStaffAsync(User updatedUser, int userId);
        Task<User?> DeleteStaffAsync(int userId);
        Task<bool> StaffExistsAsync(int userId);
        Task<User?> GetUserByPhoneAsync(string phoneNumber);
    }
}