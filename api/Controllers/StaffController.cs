using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Staff;
using api.Mappers;
using api.Repositories.Staff;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffController : ControllerBase
    {
        private readonly IStaffRepository _staffRepository;

        public StaffController(IStaffRepository staffRepository)
        {
            _staffRepository = staffRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllStaff()
        {
            var staffs = await _staffRepository.GetAllStaffAsync();
            var staffDTOs = staffs.Select(s => s.ToStaffDTO()).ToList();
            return Ok(staffDTOs);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetStaffById(int userId)
        {
            var staffUser = await _staffRepository.GetStaffByIdAsync(userId);
            if (staffUser == null)
                return NotFound("Staff user not found.");

            var staffDTO = staffUser.ToStaffDTO();
            return Ok(staffDTO);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateStaff([FromBody] CreateStaffDTO createStaffDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Map DTO to User entity
            var user = createStaffDTO.ToCreateStaffResponse();

            // Create the staff user
            var createdStaff = await _staffRepository.CreateStaffAsync(user);

            // Map back to DTO for the response
            var staffDTO = createdStaff.ToStaffDTO();
            return CreatedAtAction(nameof(GetStaffById), new { userId = staffDTO.UserID }, staffDTO);
        }

        [HttpPut("update/{userId}")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<IActionResult> UpdateStaff(int userId, [FromBody] UpdateStaffDTO updateStaffDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Map DTO to a User entity for update
            var userToUpdate = updateStaffDTO.ToUpdateStaffResponse();
            // Make sure the userToUpdate has the correct ID
            userToUpdate.UserID = userId;

            // If the password is empty, we won't update the hash in the repository
            if (string.IsNullOrWhiteSpace(updateStaffDTO.Password))
            {
                userToUpdate.PasswordHash = "";
            }

            var updatedStaff = await _staffRepository.UpdateStaffAsync(userToUpdate, userId);

            if (updatedStaff == null)
                return NotFound("Staff user not found or not a Staff.");

            var staffDTO = updatedStaff.ToStaffDTO();
            return Ok(staffDTO);
        }

        [HttpDelete("delete/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteStaff(int userId)
        {
            var deletedStaff = await _staffRepository.DeleteStaffAsync(userId);
            if (deletedStaff == null)
                return NotFound("Staff user not found or not a Staff.");

            return Ok("Staff user deleted successfully.");
        }
    }
}