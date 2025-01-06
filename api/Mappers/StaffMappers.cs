using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Staff;
using api.Helpers;
using api.Models;

namespace api.Mappers
{
    public static class StaffMappers
    {
        public static StaffDTO ToStaffDTO(this User user){
            return new StaffDTO {
                UserID = user.UserID,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                RollOrEmpNo = user.RollOrEmpNo,
                SectionId = user.SectionId,
                Specification = user.Specification,
                Username = user.Username,
                Password = user.PasswordHash,
                JoinDate = user.JoinDate,
                UpdatedAt = user.UpdatedAt,
                Status = user.Status,
                Participations = user.Participations?.Select(p => p.ToParticipationDTO()).ToList(),
                SeminarsConducted = user.SeminarsConducted?.Select(s => s.ToSeminarDTO()).ToList(),
                Winners = user.Winners?.Select(w => w.ToCompetitionDTO()).ToList()
                
            };
        }

        public static User ToCreateStaffResponse(this CreateStaffDTO createStaffDTO){
            return new User {
                FirstName = createStaffDTO.FirstName,
                LastName = createStaffDTO.LastName,
                Email = createStaffDTO.Email,
                PhoneNumber = createStaffDTO.PhoneNumber,
                Role = createStaffDTO.Role,
                RollOrEmpNo = RollOrEmpNoGenerator.GenerateRollOrEmpNo("staff"),
                SectionId = createStaffDTO.SectionId,
                Specification = createStaffDTO.Specification,
                Username = UsernameGenerator.GenerateUsername(createStaffDTO.FirstName, createStaffDTO.LastName) + UsernameGenerator.Generate4Digits(),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(createStaffDTO.Password),
                JoinDate = DateTime.UtcNow,
                Status = createStaffDTO.Status 
            };
        }

        public static User ToUpdateStaffResponse(this UpdateStaffDTO updateStaffDTO){
            var user = new User
            {
                FirstName = updateStaffDTO.FirstName,
                LastName = updateStaffDTO.LastName,
                Email = updateStaffDTO.Email,
                PhoneNumber = updateStaffDTO.PhoneNumber,
                Role = updateStaffDTO.Role,
                // RollOrEmpNo = updateStaffDTO.RollOrEmpNo,
                SectionId = updateStaffDTO.SectionId,
                Specification = updateStaffDTO.Specification,
                UpdatedAt = DateTime.UtcNow, // Set updated time here
                Status = updateStaffDTO.Status,
                // Username = updateStaffDTO.Username
            };

            if (!string.IsNullOrWhiteSpace(updateStaffDTO.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updateStaffDTO.Password);
            }

            return user;
        }
    }
}