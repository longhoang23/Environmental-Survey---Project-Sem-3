using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<IActionResult> GetAllStudents([FromQuery] int? klassId, [FromQuery] string? klassName, [FromQuery] string? firstName, [FromQuery] string? rollOrEmpNo)
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

            // 1. Check if phone number is already in use
            var existingUser = await _studentRepository.GetUserByPhoneAsync(createStudentDTO.PhoneNumber);
            if (existingUser != null)
            {
                return BadRequest("This phone number is already in use by another user.");
            }

            // 2. Create the student
            var user = createStudentDTO.ToCreateStudentResponse();
            var createdStudent = await _studentRepository.CreateStudentAsync(user);

            if (createdStudent != null)
            {
                // Prepare SMS content
                string username = createdStudent.Username;
                string password = createStudentDTO.Password; // Original password
                string messageContent = $"Welcome to our portal! Your username is {username} and password is {password}.";

                // Send SMS
                try
                {
                    if (!string.IsNullOrWhiteSpace(createdStudent.PhoneNumber))
                    {
                        await SendSms(createdStudent.PhoneNumber, messageContent);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending SMS: {ex.Message}");
                }

                var studentDTO = createdStudent.ToStudentDTO();
                return CreatedAtAction(nameof(GetStudentById), new { userId = studentDTO.UserID }, studentDTO);
            }

            return BadRequest("Failed to create student.");
        }



        private async Task SendSms(string toPhoneNumber, string message)
        {
            
            string? accountSid = "";
        
            string? authToken = "";
            // +12316818023
            string? fromPhoneNumber = "";

            if (string.IsNullOrEmpty(accountSid) || string.IsNullOrEmpty(authToken) || string.IsNullOrEmpty(fromPhoneNumber))
            {
                throw new InvalidOperationException("Twilio environment variables are not properly configured.");
            }

            TwilioClient.Init(accountSid, authToken);

            try
            {
                var messageOptions = new CreateMessageOptions(new PhoneNumber(toPhoneNumber))
                {
                    From = new PhoneNumber(fromPhoneNumber),
                    Body = message
                };

                var sentMessage = await MessageResource.CreateAsync(messageOptions);
                Console.WriteLine($"Message sent successfully: SID {sentMessage.Sid}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending SMS: {ex.Message}");
                throw;
            }
        }


        [HttpPut("update/{userId}")]
        public async Task<IActionResult> UpdateStudent(int userId, [FromBody] UpdateStudentDTO updateStudentDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userToUpdate = updateStudentDTO.ToUpdateStudentResponse();
            // Ensure correct ID
            userToUpdate.UserID = userId;

            // If the password is empty, don't overwrite
            if (string.IsNullOrWhiteSpace(updateStudentDTO.Password))
            {
                userToUpdate.PasswordHash = "";
            }

            var updatedStudent = await _studentRepository.UpdateStudentAsync(userToUpdate, userId);
            if (updatedStudent == null)
                return NotFound("Student not found or not a Student role.");

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