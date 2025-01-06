using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Enums.Role;
using api.Helpers;   // For UsernameGenerator, RollOrEmpNoGenerator if needed
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
            // Check for conflicts on username, rollOrEmpNo, email, phone if you want them unique:

            // 1. Username
            var existingByUsername = await GetUserByUsernameAsync(user.Username);
            if (existingByUsername != null)
            {
                return null; // conflict
            }

            // 2. RollOrEmpNo
            var existingByRollOrEmpNo = await GetUserByRollOrEmpNoAsync(user.RollOrEmpNo);
            if (existingByRollOrEmpNo != null)
            {
                return null; // conflict
            }

            // 3. Email
            var existingByEmail = await GetUserByEmailAsync(user.Email);
            if (existingByEmail != null)
            {
                return null; // conflict
            }

            // 4. Phone
            var existingByPhone = await GetUserByPhoneAsync(user.PhoneNumber);
            if (existingByPhone != null)
            {
                return null; // conflict
            }

            // Add new student
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetStudentByIdAsync(int userId)
        {
            return await _context.Users
                .Include(u => u.Klass)
                .Include(u => u.Participations)
                .Include(u => u.Winners)
                .Where(u => u.UserID == userId && u.Role == UserRole.Student)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetAllStudentsAsync(int? klassId = null, string? klassName = null, string? firstName = null, string? rollOrEmpNo = null)
        {
            var query = _context.Users
                .Include(u => u.Klass)
                .Include(u => u.Participations)
                .Include(u => u.Winners)
                .Where(u => u.Role == UserRole.Student)
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
                return null; // not found or role mismatch
            }

            // 1. If username changed, check conflict
            if (!string.Equals(existingUser.Username, updatedUser.Username, StringComparison.OrdinalIgnoreCase))
            {
                var userByUsername = await GetUserByUsernameAsync(updatedUser.Username);
                if (userByUsername != null && userByUsername.UserID != userId)
                {
                    return null; // conflict
                }
            }

            // 2. If rollOrEmpNo changed, check conflict
            if (!string.Equals(existingUser.RollOrEmpNo, updatedUser.RollOrEmpNo, StringComparison.OrdinalIgnoreCase))
            {
                var userByRollOrEmpNo = await GetUserByRollOrEmpNoAsync(updatedUser.RollOrEmpNo);
                if (userByRollOrEmpNo != null && userByRollOrEmpNo.UserID != userId)
                {
                    return null; // conflict
                }
            }

            // 3. If email changed
            if (!string.Equals(existingUser.Email, updatedUser.Email, StringComparison.OrdinalIgnoreCase))
            {
                var userByEmail = await GetUserByEmailAsync(updatedUser.Email);
                if (userByEmail != null && userByEmail.UserID != userId)
                {
                    return null; // conflict
                }
            }

            // 4. If phone changed
            if (!string.Equals(existingUser.PhoneNumber, updatedUser.PhoneNumber, StringComparison.OrdinalIgnoreCase))
            {
                var userByPhone = await GetUserByPhoneAsync(updatedUser.PhoneNumber);
                if (userByPhone != null && userByPhone.UserID != userId)
                {
                    return null; // conflict
                }
            }

            // Keep old name for username logic
            string oldFirst = existingUser.FirstName;
            string oldLast = existingUser.LastName;
            string oldUsername = existingUser.Username;

            // Overwrite allowed fields
            existingUser.FirstName     = updatedUser.FirstName;
            existingUser.LastName      = updatedUser.LastName;
            existingUser.Email         = updatedUser.Email;
            existingUser.PhoneNumber   = updatedUser.PhoneNumber;
            existingUser.Role          = updatedUser.Role; // Typically remains Student
            existingUser.KlassId       = updatedUser.KlassId;
            existingUser.Specification = updatedUser.Specification;
            existingUser.Status        = updatedUser.Status;
            existingUser.UpdatedAt     = DateTime.UtcNow;
            // If you allow changing RollOrEmpNo or Username, uncomment accordingly

            // If password is provided
            if (!string.IsNullOrEmpty(updatedUser.PasswordHash))
            {
                existingUser.PasswordHash = updatedUser.PasswordHash;
            }

            // Check if name changed => rebuild username suffix
            bool nameChanged = (oldFirst != updatedUser.FirstName) || (oldLast != updatedUser.LastName);
            if (nameChanged && !string.IsNullOrWhiteSpace(oldUsername))
            {
                string suffix = ExtractSuffix(oldUsername);
                string newPrefix = UsernameGenerator.GenerateUsername(updatedUser.FirstName, updatedUser.LastName);
                existingUser.Username = newPrefix + suffix;
            }

            await _context.SaveChangesAsync();
            return existingUser;
        }

        private string ExtractSuffix(string oldUsername)
        {
            if (oldUsername.Length < 4)
            {
                return UsernameGenerator.Generate4Digits();
            }

            string possibleDigits = oldUsername[^4..];
            if (int.TryParse(possibleDigits, out _))
            {
                return possibleDigits;
            }
            else
            {
                return UsernameGenerator.Generate4Digits();
            }
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
        public async Task<User?> GetUserByPhoneAsync(string phoneNumber)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        }

        // Additional helper methods for conflict checks:
        private async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        private async Task<User?> GetUserByRollOrEmpNoAsync(string rollOrEmpNo)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.RollOrEmpNo == rollOrEmpNo);
        }

        private async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
