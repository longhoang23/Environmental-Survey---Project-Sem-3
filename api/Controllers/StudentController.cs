using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using api.DTOs.Student;
using api.Mappers;
using api.Repositories.Student;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // [Authorize(Roles = "Admin")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;

        public StudentController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllStudents(
            [FromQuery] int? klassId,
            [FromQuery] string? klassName,
            [FromQuery] string? firstName,
            [FromQuery] string? rollOrEmpNo)
        {
            var students = await _studentRepository.GetAllStudentsAsync(klassId, klassName, firstName, rollOrEmpNo);
            var studentDTOs = students.Select(s => s.ToStudentDTO()).ToList();
            return Ok(studentDTOs);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetStudentById(int userId)
        {
            var student = await _studentRepository.GetStudentByIdAsync(userId);
            if (student == null)
                return NotFound("Student not found.");

            var studentDTO = student.ToStudentDTO();
            return Ok(studentDTO);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateStudent([FromBody] CreateStudentDTO createStudentDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // 1. Check if phone number is already in use (example)
            var existingUser = await _studentRepository.GetUserByPhoneAsync(createStudentDTO.PhoneNumber);
            if (existingUser != null)
            {
                return Conflict(new { message = "Phone number is already in use by another user." });
            }
            string emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
    
            if (!Regex.IsMatch(createStudentDTO.Email, emailPattern))
            {
                return BadRequest("The provided email is invalid.");
            }

            // 2. Convert the DTO to a User model
            var user = createStudentDTO.ToCreateStudentResponse();
            // 3. Create the student
            var createdStudent = await _studentRepository.CreateStudentAsync(user);

            // If repository returns null => conflict (username/email/rollNo/phone)
            if (createdStudent == null)
            {
                return Conflict(new { message = "Email, Phone is already in use." });
            }

            // If creation was successful, prepare an email
            string subject = "Welcome to the Portal";
            string body = $"Hello {createdStudent.FirstName},\n\n" +
                        $"Your account was created successfully. Username: {createdStudent.Username}\n" +
                        $"RollOrEmpNo: {createdStudent.RollOrEmpNo}\n" +
                        $"Password: {createStudentDTO.Password}\n\n" +
                        $"Best regards,\nEnvironmentPortal Team";

            try
            {
                // only if not empty
                if (!string.IsNullOrEmpty(createdStudent.Email))
                {
                    await SendEmailAsync(createdStudent.Email, subject, body);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending welcome email: " + ex.Message);
                // Decide whether to proceed or return partial success
            }

            // Map to StudentDTO
            var studentDTO = createdStudent.ToStudentDTO();
            return CreatedAtAction(nameof(GetStudentById), new { userId = studentDTO.UserID }, studentDTO);
        }

        private async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            // Retrieve environment variables
            string smtpHost = Environment.GetEnvironmentVariable("SMTP_HOST") ?? "smtp.server.com";
            int smtpPort = int.TryParse(Environment.GetEnvironmentVariable("SMTP_PORT"), out var p) ? p : 587;
            string smtpUser = Environment.GetEnvironmentVariable("SMTP_USER") ?? "";
            string smtpPass = Environment.GetEnvironmentVariable("SMTP_PASS") ?? "";
            string fromEmail = Environment.GetEnvironmentVariable("FROM_EMAIL") ?? "";

            // Configure the SMTP client
            using var client = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(smtpUser, smtpPass),
                EnableSsl = true // Gmail requires SSL/TLS
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail, "Portal Notifications"), // optional display name
                Subject = subject,
                Body = body,
                IsBodyHtml = false // or true if you want HTML
            };

            mailMessage.To.Add(toEmail);

            // If your .NET version supports async:
            await client.SendMailAsync(mailMessage);
            // Otherwise, use client.Send(mailMessage);
        }

        [HttpPut("update/{userId}")]
        public async Task<IActionResult> UpdateStudent(int userId, [FromBody] UpdateStudentDTO updateStudentDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Convert to user
            var userToUpdate = updateStudentDTO.ToUpdateStudentResponse();
            // Ensure correct ID
            userToUpdate.UserID = userId;

            // If the password is empty, don’t overwrite
            if (string.IsNullOrWhiteSpace(updateStudentDTO.Password))
            {
                userToUpdate.PasswordHash = "";
            }

            // Attempt update
            var updatedStudent = await _studentRepository.UpdateStudentAsync(userToUpdate, userId);
            if (updatedStudent == null)
            {
                return Conflict(new { message = "Conflict on email, phone. Or user not found." });
            }

            var studentDTO = updatedStudent.ToStudentDTO();
            return Ok(studentDTO);
        }

        [HttpDelete("delete/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteStudent(int userId)
        {
            var deletedStudent = await _studentRepository.DeleteStudentAsync(userId);
            if (deletedStudent == null)
                return NotFound("Student not found or not a Student role.");

            return Ok("Student deleted successfully.");
        }
    }
}
