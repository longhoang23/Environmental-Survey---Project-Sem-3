using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Login;
using api.DTOs.Registration;
using api.Enums.Role;
using api.Enums.Status;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        public UserController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.RollOrEmpNo == dto.RollOrEmpNo);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (user.Role != UserRole.Staff && user.Role != UserRole.Student)
            {
                return BadRequest("Only staff or student can request activation.");
            }

            if (user.Status == UserStatus.Active)
            {
                return BadRequest("Already active, no need to request.");
            }
            if (user.Status == UserStatus.Pending)
            {
                return BadRequest("Already pending. Please wait for admin approval.");
            }
            if (user.Status == UserStatus.Decline)
            {
                return BadRequest("Your request was declined. Contact admin.");
            }

            // For NotRequested or Decline, we proceed with a new request
            user.Status = UserStatus.Pending;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync(); // Save user status changes

            // Create a RegistrationRequest entry
            var request = new RegistrationRequest
            {
                UserId = user.UserID,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                RollOrEmpNo = dto.RollOrEmpNo,
                ClassId = dto.ClassId,
                SectionId = dto.SectionId,
                Specification = dto.Specification,
                AdmissionDate = dto.AdmissionDate,
                JoinDate = dto.JoinDate,
                RequestedAt = DateTime.UtcNow
            };

            _context.RegistrationRequests.Add(request);
            await _context.SaveChangesAsync();

            return Ok("Request submitted. Waiting for admin approval.");
        }

        [HttpGet("admin/pending-requests")]
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllPendingRequests()
        {
            var pendingRequests = await _context.RegistrationRequests
                .Include(rr => rr.User)
                .Where(rr => rr.User.Status == UserStatus.Pending)
                .ToListAsync();

            return Ok(pendingRequests);
        }
        [HttpPost("admin/approve/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ApproveUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound("User not found.");

            if (user.Status != UserStatus.Pending)
                return BadRequest("User is not pending or already active/declined.");

            user.Status = UserStatus.Active;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok("User has been approved and is now active.");
        }

        [HttpPost("admin/decline/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeclineUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound("User not found.");

            if (user.Status != UserStatus.Pending)
                return BadRequest("User is not pending, cannot decline.");

            user.Status = UserStatus.Decline;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok("User has been declined.");
        }

        
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginDTO.Username);
             if (user == null)
                return Unauthorized("User not found or invalid credentials.");

            // Validate password
            if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.PasswordHash))
                return Unauthorized("User or password is incorrect.");

            // Validate user status (e.g., only active users can log in)
            if (user.Status != UserStatus.Active)
                return Unauthorized("Your account is not active. Please contact the administrator.");


            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("UserID", user.UserID.ToString()),
                new Claim("Username", user.Username.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: signIn
            );

            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new { token = tokenValue, User = user });

        }
    }
}