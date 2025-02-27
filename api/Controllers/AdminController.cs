using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using api.DTOs.Admin;
using api.Mappers;
using api.Repositories.Admin;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllAdmins()
        {
            var admins = await _adminRepository.GetAllAdminsAsync();
            var adminDTOs = admins.Select(a => a.ToAdminDTO()).ToList();
            return Ok(adminDTOs);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAdminById(int userId)
        {
            var admin = await _adminRepository.GetAdminByIdAsync(userId);
            if (admin == null)
                return NotFound("Admin not found.");

            var adminDTO = admin.ToAdminDTO();
            return Ok(adminDTO);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAdmin([FromBody] CreateAdminDTO createAdminDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
    
            if (!Regex.IsMatch(createAdminDTO.Email, emailPattern))
            {
                return BadRequest("The provided email is invalid.");
            }

            var user = createAdminDTO.ToCreateAdminResponse();
            var createdAdmin = await _adminRepository.CreateAdminAsync(user);

            if (createdAdmin == null)
            {
                return Conflict(new { message = "Username, email, phone, or Roll/EmpNo is already in use." });
            }

            var adminDTO = createdAdmin.ToAdminDTO();
            return CreatedAtAction(nameof(GetAdminById), new { userId = adminDTO.UserID }, adminDTO);
        }

        [HttpPut("update/{userId}")]
        public async Task<IActionResult> UpdateAdmin(int userId, [FromBody] UpdateAdminDTO updateAdminDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userToUpdate = updateAdminDTO.ToUpdateAdminDTOToUser();
            var updatedAdmin = await _adminRepository.UpdateAdminAsync(userToUpdate, userId);

            if (updatedAdmin == null)
            {
                // If null, it indicates a conflict (duplicate username/email/phone/etc.)
                return Conflict(new { message = "Username, email, phone, or Roll/EmpNo is already in use." });
            }

            var adminDTO = updatedAdmin.ToAdminDTO();
            return Ok(adminDTO);
        }

        [HttpDelete("delete/{userId}")]
        public async Task<IActionResult> DeleteAdmin(int userId)
        {
            var deletedAdmin = await _adminRepository.DeleteAdminAsync(userId);
            if (deletedAdmin == null)
                return NotFound("Admin not found or not an Admin.");

            return Ok("Admin deleted successfully.");
        }
    }
}
