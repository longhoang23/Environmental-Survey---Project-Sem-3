using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Student;
using api.Mappers;
using api.Repositories.Student;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;

        public StudentController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _studentRepository.GetAllStudentsAsync();
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

            var user = createStudentDTO.ToCreateStudentResponse();
            var createdStudent = await _studentRepository.CreateStudentAsync(user);
            var studentDTO = createdStudent.ToStudentDTO();

            return CreatedAtAction(nameof(GetStudentById), new { userId = studentDTO.UserID }, studentDTO);
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
        public async Task<IActionResult> DeleteStudent(int userId)
        {
            var deletedStudent = await _studentRepository.DeleteStudentAsync(userId);
            if (deletedStudent == null)
                return NotFound("Student not found or not a Student role.");

            return Ok("Student deleted successfully.");
        }
    }
}