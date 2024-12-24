using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Enums.Role;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Student
{
    public class StudentRepository : IStudentRepository
    {
         private readonly ApplicationDbContext _context;

        public StudentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> CreateStudentAsync(User user)
        {
            // Add new student user
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetStudentByIdAsync(int userId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.UserID == userId && u.Role == UserRole.Student);
        }

        public async Task<IEnumerable<User>> GetAllStudentsAsync(int? klassId = null, string? klassName = null, string? firstName = null, string? rollOrEmpNo = null)
        {
            var query = _context.Users
                .Include(u => u.Klass) // Include Klass for joining to search for klassName
                .Where(u => u.Role == UserRole.Student) // Filter by student role
                .AsQueryable();

            if (klassId.HasValue)
            {
                query = query.Where(u => u.KlassId == klassId.Value);
            }

            if (!string.IsNullOrWhiteSpace(klassName))
            {
                query = query.Where(u => u.Klass != null && u.Klass.Name.Contains(klassName));
            }

            if (!string.IsNullOrWhiteSpace(firstName))
            {
                query = query.Where(u => u.FirstName.Contains(firstName));
            }

            if (!string.IsNullOrWhiteSpace(rollOrEmpNo))
            {
                query = query.Where(u => u.RollOrEmpNo.Contains(rollOrEmpNo));
            }

            return await query.ToListAsync();
        }

        public async Task<User?> UpdateStudentAsync(User updatedUser, int userId)
        {
            var existingUser = await _context.Users.FindAsync(userId);
            if (existingUser == null || existingUser.Role != UserRole.Student)
            {
                return null; // Student not found or role mismatch
            }

            // Update the fields you wish to allow
            existingUser.FirstName = updatedUser.FirstName;
            existingUser.LastName = updatedUser.LastName;
            existingUser.PhoneNumber = updatedUser.PhoneNumber;
            existingUser.Role = updatedUser.Role;
            existingUser.KlassId = updatedUser.KlassId;
            existingUser.Specification = updatedUser.Specification;
            existingUser.Status = updatedUser.Status;
            // existingUser.Username = updatedUser.Username;
            existingUser.UpdatedAt = updatedUser.UpdatedAt;

            // Only update password if provided
            if (!string.IsNullOrEmpty(updatedUser.PasswordHash))
            {
                existingUser.PasswordHash = updatedUser.PasswordHash;
            }

            // AdmissionDate/JoinDate can be handled similarly if relevant for updates
            
            await _context.SaveChangesAsync();
            return existingUser;
        }

        public async Task<User?> DeleteStudentAsync(int userId)
        {
            var student = await _context.Users.FindAsync(userId);
            if (student == null || student.Role != UserRole.Student)
            {
                return null;
            }

            _context.Users.Remove(student);
            await _context.SaveChangesAsync();
            return student;
        }

        public async Task<bool> StudentExistsAsync(int userId)
        {
            return await _context.Users
                .AnyAsync(u => u.UserID == userId && u.Role == UserRole.Student);
        }
    }
}