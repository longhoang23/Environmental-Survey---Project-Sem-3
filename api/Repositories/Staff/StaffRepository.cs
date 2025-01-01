using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Enums.Role;
using api.Helpers;
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

        public async Task<User> CreateStaffAsync(User user)
        {
            // Add new staff user
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetStaffByIdAsync(int userId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.UserID == userId && u.Role == UserRole.Staff);
        }

        public async Task<IEnumerable<User>> GetAllStaffAsync()
        {
            return await _context.Users
                .Where(u => u.Role == UserRole.Staff)
                .ToListAsync();
        }

        public async Task<User?> UpdateStaffAsync(User updatedUser, int userId)
        {
            var existingUser = await _context.Users.FindAsync(userId);
            if (existingUser == null || existingUser.Role != UserRole.Staff)
            {
                return null; // Not found or not staff
            }

            // Keep old first/last and username
            string oldFirst = existingUser.FirstName;
            string oldLast  = existingUser.LastName;
            string oldUsername = existingUser.Username;

            // Overwrite fields you allow
            existingUser.FirstName = updatedUser.FirstName;
            existingUser.LastName = updatedUser.LastName;
            existingUser.PhoneNumber = updatedUser.PhoneNumber;
            existingUser.Role = updatedUser.Role;
            // existingUser.RollOrEmpNo = updatedUser.RollOrEmpNo; // if needed
            existingUser.SectionId = updatedUser.SectionId;
            existingUser.Specification = updatedUser.Specification;
            // existingUser.JoinDate = updatedUser.JoinDate; // if you want to allow updates
            existingUser.UpdatedAt = updatedUser.UpdatedAt;
            existingUser.Status = updatedUser.Status;
            // existingUser.Username = updatedUser.Username; // do not overwrite directly

            // Update password if present
            if (!string.IsNullOrEmpty(updatedUser.PasswordHash))
            {
                existingUser.PasswordHash = updatedUser.PasswordHash;
            }

            // 1. Check if first or last name changed
            bool nameChanged = (oldFirst != updatedUser.FirstName) || (oldLast != updatedUser.LastName);

            // 2. If name changed, rebuild username, preserving old suffix
            if (nameChanged && !string.IsNullOrWhiteSpace(oldUsername))
            {
                // Extract old 4-digit suffix
                string suffix = ExtractSuffix(oldUsername);

                // Build new prefix => "firstname.lastname"
                string newPrefix = UsernameGenerator.GenerateUsername(updatedUser.FirstName, updatedUser.LastName);

                // Combine them
                existingUser.Username = newPrefix + suffix;
            }

            await _context.SaveChangesAsync();
            return existingUser;
        }

        /// <summary>
        /// Try to read the last 4 chars as digits. If not digits, generate new 4 digits.
        /// </summary>
        private string ExtractSuffix(string oldUsername)
        {
            if (oldUsername.Length < 4)
            {
                // fallback
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
    }
}