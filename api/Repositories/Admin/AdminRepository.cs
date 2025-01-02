using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Enums.Role;
using api.Helpers;
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
            var existingUser = await GetUserByUsernameAsync(user.Username);
            if (existingUser != null)
            {
                return null;
            }

            // Check if a user with the given RollOrEmpNo already exists
            var existingUserByRollOrEmpNo = await GetUserByRollOrEmpNoAsync(user.RollOrEmpNo);
            if (existingUserByRollOrEmpNo != null)
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
            

            if (!string.Equals(existingUser.Username, updatedUser.Username, StringComparison.OrdinalIgnoreCase))
            {
                var userByUsername = await GetUserByUsernameAsync(updatedUser.Username);
                // If user with this username exists and is not the current user
                if (userByUsername != null && userByUsername.UserID != userId)
                {
                    // Return null to indicate conflict
                    return null;
                }
            }

            // Check RollOrEmpNo if it changed
            if (!string.Equals(existingUser.RollOrEmpNo, updatedUser.RollOrEmpNo, StringComparison.OrdinalIgnoreCase))
            {
                var userByRollOrEmpNo = await GetUserByRollOrEmpNoAsync(updatedUser.RollOrEmpNo);
                if (userByRollOrEmpNo != null && userByRollOrEmpNo.UserID != userId)
                {
                    // Return null to indicate conflict
                    return null;
                }
            }
            string oldFirst = existingUser.FirstName;
            string oldLast  = existingUser.LastName;
            string oldUsername = existingUser.Username;
            // Update fields (you can map all fields you want to allow updates on)
            existingUser.FirstName = updatedUser.FirstName;
            existingUser.LastName = updatedUser.LastName;
            existingUser.PhoneNumber = updatedUser.PhoneNumber;
            existingUser.Role = updatedUser.Role;
            // existingUser.RollOrEmpNo = updatedUser.RollOrEmpNo;
            existingUser.Specification = updatedUser.Specification;
            // existingUser.JoinDate = updatedUser.JoinDate;
            existingUser.UpdatedAt = DateTime.UtcNow;
            existingUser.Status = updatedUser.Status;
            // existingUser.Username = updatedUser.Username;
            // You can handle password updates similarly, hashing it before assignment:
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
                .ToListAsync();
        }

        public async Task<bool> AdminExistAsync(int userId)
        {
            return await _context.Users
                .AnyAsync(u => u.UserID == userId && u.Role == UserRole.Admin);
        }

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

        
    }
}
