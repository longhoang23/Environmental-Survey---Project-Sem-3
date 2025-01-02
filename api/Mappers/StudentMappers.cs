using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Student;
using api.Helpers;
using api.Models;

namespace api.Mappers
{
    public static class StudentMappers
    {
        public static StudentDTO ToStudentDTO(this User user){
            return new StudentDTO {
                UserID = user.UserID,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                RollOrEmpNo = user.RollOrEmpNo,
                KlassId = user.KlassId,
                Specification = user.Specification,
                Username = user.Username,
                Password = user.PasswordHash,
                AdmissionDate = user.AdmissionDate,
                UpdatedAt = user.UpdatedAt,
                Status = user.Status
            };
        }

        public static User ToCreateStudentResponse(this CreateStudentDTO createStudentDTO){
            return new User {
                FirstName = createStudentDTO.FirstName,
                LastName = createStudentDTO.LastName,
                PhoneNumber = createStudentDTO.PhoneNumber,
                Role = createStudentDTO.Role,
                RollOrEmpNo = RollOrEmpNoGenerator.GenerateRollOrEmpNo("student"),
                KlassId = createStudentDTO.KlassId,
                Specification = createStudentDTO.Specification,
                Username = UsernameGenerator.GenerateUsername(createStudentDTO.FirstName, createStudentDTO.LastName) + UsernameGenerator.Generate4Digits(),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(createStudentDTO.Password),
                AdmissionDate = DateTime.UtcNow,
                Status = createStudentDTO.Status 
            };
        }

        public static User ToUpdateStudentResponse(this UpdateStudentDTO updateStudentDTO){
            var user = new User
            {
                FirstName = updateStudentDTO.FirstName,
                LastName = updateStudentDTO.LastName,
                PhoneNumber = updateStudentDTO.PhoneNumber,
                Role = updateStudentDTO.Role,
                // RollOrEmpNo = updateStaffDTO.RollOrEmpNo,
                KlassId = updateStudentDTO.KlassId,
                Specification = updateStudentDTO.Specification,
                UpdatedAt = DateTime.UtcNow, // Set updated time here
                Status = updateStudentDTO.Status,
                // Username = updateStudentDTO.Username
            };

            if (!string.IsNullOrWhiteSpace(updateStudentDTO.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updateStudentDTO.Password);
            }

            return user;
        }
    }
}