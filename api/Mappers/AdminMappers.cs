using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Admin;
using api.Helpers;
using api.Models;

namespace api.Mappers
{
    public static class AdminMappers
    {
        // public static User ToUser(this AdminDTO dto)
        // {
        //     return new User
        //     {
        //         UserID = dto.UserID,
        //         FirstName = dto.FirstName,
        //         LastName = dto.LastName,
        //         PhoneNumber = dto.PhoneNumber,
        //         Role = dto.Role,
        //         RollOrEmpNo = dto.RollOrEmpNo,
        //         Specification = dto.Specification,
        //         Username = dto.Username,
        //         PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
        //         JoinDate = DateTime.UtcNow,
        //         UpdatedAt = dto.UpdatedAt,
        //         Status = dto.Status
                
        //     };
        // }

        public static AdminDTO ToAdminDTO(this User user){
            return new AdminDTO{
                UserID = user.UserID,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                RollOrEmpNo = user.RollOrEmpNo,
                Specification = user.Specification,
                Username = user.Username,
                Password = user.PasswordHash,
                JoinDate = user.JoinDate,
                UpdatedAt = user.UpdatedAt,
                Status = user.Status,
                SeminarsConducted = user.SeminarsConducted?.Select(s => s.ToSeminarDTO()).ToList()
            };
        }
        
        public static User ToCreateAdminResponse(this CreateAdminDTO dto)
        {
            return new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                PhoneNumber = dto.PhoneNumber,
                Role = dto.Role,
                RollOrEmpNo = RollOrEmpNoGenerator.GenerateRollOrEmpNo("admin"),
                Specification = dto.Specification,
                Username = UsernameGenerator.GenerateUsername(dto.FirstName, dto.LastName) + UsernameGenerator.Generate4Digits(),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                JoinDate = DateTime.UtcNow,
                Status = dto.Status
                
            };
        }
         public static User ToUpdateAdminDTOToUser(this UpdateAdminDTO dto)
        {
          
            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                PhoneNumber = dto.PhoneNumber,
                Role = dto.Role,
                // RollOrEmpNo = dto.RollOrEmpNo,
                Specification = dto.Specification,
                // JoinDate = dto.JoinDate,
                UpdatedAt = DateTime.UtcNow, // Set updated time here
                Status = dto.Status,
                // Username = dto.Username
            };

            if (!string.IsNullOrWhiteSpace(dto.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            }

            return user;
        }
    }
}