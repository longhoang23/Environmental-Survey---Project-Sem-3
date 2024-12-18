using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Enums.Role;
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
                return null; // Not found or not Staff
            }

            // Update necessary fields
            existingUser.FirstName = updatedUser.FirstName;
            existingUser.LastName = updatedUser.LastName;
            existingUser.PhoneNumber = updatedUser.PhoneNumber;
            existingUser.Role = updatedUser.Role;
            // existingUser.RollOrEmpNo = updatedUser.RollOrEmpNo;
            existingUser.SectionId = updatedUser.SectionId;
            existingUser.Specification = updatedUser.Specification;
            // existingUser.JoinDate = updatedUser.JoinDate;
            existingUser.UpdatedAt = updatedUser.UpdatedAt;
            existingUser.Status = updatedUser.Status;
            // existingUser.Username = updatedUser.Username;

            if (!string.IsNullOrEmpty(updatedUser.PasswordHash))
            {
                existingUser.PasswordHash = updatedUser.PasswordHash;
            }

            await _context.SaveChangesAsync();
            return existingUser;
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