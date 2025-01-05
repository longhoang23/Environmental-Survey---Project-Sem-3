using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Enums.Role;
using api.Helpers; // For UsernameGenerator, etc.
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Admin
{
    public class AdminRepository : IAdminRepository
    {
        private readonly ApplicationDbContext _context;

        public AdminRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> CreateAdminAsync(User user)
        {
            // Check conflicts: username, roll/emp no, email, phone number (if needed)
            var existingUserByUsername = await GetUserByUsernameAsync(user.Username);
            if (existingUserByUsername != null)
            {
                // Return null => indicates conflict
                return null;
            }

            var existingUserByRollOrEmpNo = await GetUserByRollOrEmpNoAsync(user.RollOrEmpNo);
            if (existingUserByRollOrEmpNo != null)
            {
                return null;
            }

            // Optionally check email
            var existingUserByEmail = await GetUserByEmailAsync(user.Email);
            if (existingUserByEmail != null)
            {
                return null;
            }

            // Optionally check phone
            var existingUserByPhone = await GetUserByPhoneAsync(user.PhoneNumber);
            if (existingUserByPhone != null)
            {
                return null;
            }

            // Add new admin user to the context
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetAdminByIdAsync(int userId)
        {
            // Get admin user by ID
            return await _context.Users
                .Include(u => u.SeminarsConducted)
                .Include(u => u.SurveysCreated)
                .Where(u => u.UserID == userId && u.Role == UserRole.Admin)
                .FirstOrDefaultAsync();
        }

        public async Task<User?> UpdateAdminAsync(User updatedUser, int userId)
        {
            var existingUser = await _context.Users.FindAsync(userId);
            if (existingUser == null || existingUser.Role != UserRole.Admin)
            {
                return null;
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

            // 2. If roll/emp no changed, check conflict
            if (!string.Equals(existingUser.RollOrEmpNo, updatedUser.RollOrEmpNo, StringComparison.OrdinalIgnoreCase))
            {
                var userByRollOrEmpNo = await GetUserByRollOrEmpNoAsync(updatedUser.RollOrEmpNo);
                if (userByRollOrEmpNo != null && userByRollOrEmpNo.UserID != userId)
                {
                    return null; // conflict
                }
            }

            // 3. If email changed, check conflict
            if (!string.Equals(existingUser.Email, updatedUser.Email, StringComparison.OrdinalIgnoreCase))
            {
                var userByEmail = await GetUserByEmailAsync(updatedUser.Email);
                if (userByEmail != null && userByEmail.UserID != userId)
                {
                    return null; // conflict
                }
            }

            // 4. If phone changed, check conflict
            if (!string.Equals(existingUser.PhoneNumber, updatedUser.PhoneNumber, StringComparison.OrdinalIgnoreCase))
            {
                var userByPhone = await GetUserByPhoneAsync(updatedUser.PhoneNumber);
                if (userByPhone != null && userByPhone.UserID != userId)
                {
                    return null; // conflict
                }
            }

            // Store old names
            string oldFirst = existingUser.FirstName;
            string oldLast  = existingUser.LastName;
            string oldUsername = existingUser.Username;

            // Update fields
            existingUser.FirstName       = updatedUser.FirstName;
            existingUser.LastName        = updatedUser.LastName;
            existingUser.Email           = updatedUser.Email;
            existingUser.PhoneNumber     = updatedUser.PhoneNumber;
            existingUser.Role            = updatedUser.Role;
            // existingUser.RollOrEmpNo     = updatedUser.RollOrEmpNo; 
            existingUser.Specification   = updatedUser.Specification;
            existingUser.UpdatedAt       = DateTime.UtcNow;
            existingUser.Status          = updatedUser.Status;
            // existingUser.Username        = updatedUser.Username; // we'll handle username below

            // If password is provided
            if (!string.IsNullOrEmpty(updatedUser.PasswordHash))
            {
                existingUser.PasswordHash = updatedUser.PasswordHash;
            }

            // 5. If first or last name changed => rebuild username, preserving suffix
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

        public async Task<User?> DeleteAdminAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null || user.Role != UserRole.Admin)
            {
                return null;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<IEnumerable<User>> GetAllAdminsAsync()
        {
            return await _context.Users
                .Where(u => u.Role == UserRole.Admin)
                .Include(u => u.SeminarsConducted)
                .Include(u => u.SurveysCreated)
                .ToListAsync();
        }

        public async Task<bool> AdminExistAsync(int userId)
        {
            return await _context.Users
                .AnyAsync(u => u.UserID == userId && u.Role == UserRole.Admin);
        }

        // Additional helpers from interface

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User?> GetUserByRollOrEmpNoAsync(string rollOrEmpNo)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.RollOrEmpNo == rollOrEmpNo);
        }

        // If we want to check email and phone
        private async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        private async Task<User?> GetUserByPhoneAsync(string phoneNumber)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        }
    }
}
