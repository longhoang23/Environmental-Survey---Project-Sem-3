using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.Student
{
    public interface IStudentRepository
    {
        Task<User> CreateStudentAsync(User user);
        Task<User?> GetStudentByIdAsync(int userId);
        Task<IEnumerable<User>> GetAllStudentsAsync();
        Task<User?> UpdateStudentAsync(User updatedUser, int userId);
        Task<User?> DeleteStudentAsync(int userId);
        Task<bool> StudentExistsAsync(int userId);
    }
}