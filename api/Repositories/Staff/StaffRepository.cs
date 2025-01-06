using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Enums.Role;
using api.Helpers;  // For UsernameGenerator, RollOrEmpNoGenerator, etc.
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Staff
{
    public class StaffRepository : IStaffRepository
    {
        private readonly ApplicationDbContext _context;

        public StaffRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create a new staff user
        public async Task<User> CreateStaffAsync(User user)
        {
            // 1. Check for username conflict
            var existingByUsername = await GetUserByUsernameAsync(user.Username);
            if (existingByUsername != null)
            {
                return null; // conflict
            }

            // 2. Check rollOrEmpNo conflict
            var existingByRollOrEmpNo = await GetUserByRollOrEmpNoAsync(user.RollOrEmpNo);
            if (existingByRollOrEmpNo != null)
            {
                return null;
            }

            // 3. Check email
            var existingByEmail = await GetUserByEmailAsync(user.Email);
            if (existingByEmail != null)
            {
                return null;
            }

            // 4. Check phone
            var existingByPhone = await GetUserByPhoneAsync(user.PhoneNumber);
            if (existingByPhone != null)
            {
                return null;
            }

            // Add new staff user
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        // Get a single staff by ID
        public async Task<User?> GetStaffByIdAsync(int userId)
        {
            return await _context.Users
                .Where(u => u.UserID == userId && u.Role == UserRole.Staff)
                .Include(u => u.Participations)
                .Include(u => u.Winners)
                .Include(u => u.SeminarsConducted)
                .FirstOrDefaultAsync();
        }

        // Get all staff
        public async Task<IEnumerable<User>> GetAllStaffAsync()
        {
            return await _context.Users
                .Where(u => u.Role == UserRole.Staff)
                .Include(u => u.Participations)
                .Include(u => u.Winners)
                .Include(u => u.SeminarsConducted)
                .ToListAsync();
        }

        // Update an existing staff
        public async Task<User?> UpdateStaffAsync(User updatedUser, int userId)
        {
            var existingUser = await _context.Users.FindAsync(userId);
            if (existingUser == null || existingUser.Role != UserRole.Staff)
            {
                return null; // not found or not a staff
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

            // Keep old names for possible username rebuild
            string oldFirst = existingUser.FirstName;
            string oldLast  = existingUser.LastName;
            string oldUsername = existingUser.Username;

            // Overwrite allowed fields
            existingUser.FirstName       = updatedUser.FirstName;
            existingUser.LastName        = updatedUser.LastName;
            existingUser.Email           = updatedUser.Email;
            existingUser.PhoneNumber     = updatedUser.PhoneNumber;
            existingUser.Role            = updatedUser.Role;        // Usually Staff
            existingUser.SectionId       = updatedUser.SectionId;
            existingUser.Specification   = updatedUser.Specification;
            existingUser.Status          = updatedUser.Status;
            existingUser.UpdatedAt       = DateTime.UtcNow;
            // existingUser.RollOrEmpNo     = updatedUser.RollOrEmpNo; // if you allow changes
            // existingUser.Username        = updatedUser.Username;     // rebuilt if name changed

            // If password provided
            if (!string.IsNullOrEmpty(updatedUser.PasswordHash))
            {
                existingUser.PasswordHash = updatedUser.PasswordHash;
            }

            // Rebuild username if name changed
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

        // Delete staff
        public async Task<User?> DeleteStaffAsync(int userId)
        {
            var staffUser = await _context.Users.FindAsync(userId);
            if (staffUser == null || staffUser.Role != UserRole.Staff)
            {
                return null;
            }

            _context.Users.Remove(staffUser);
            await _context.SaveChangesAsync();
            return staffUser;
        }

        public async Task<bool> StaffExistsAsync(int userId)
        {
            return await _context.Users
                .AnyAsync(u => u.UserID == userId && u.Role == UserRole.Staff);
        }

        // Additional helper methods
        public async Task<User?> GetUserByPhoneAsync(string phoneNumber)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        }

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
    }
}
