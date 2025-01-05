using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Support;
using api.Mappers;
using api.Repositories.Supports;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupportController : ControllerBase
    {
        private readonly ISupportRepository _supportRepository;
        private readonly ApplicationDbContext _context;

        public SupportController(ISupportRepository supportRepository, ApplicationDbContext context)
        {
            _supportRepository = supportRepository;
            _context = context;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllSupports()
        {
            var supports = await _supportRepository.GetAllSupportsAsync();
            var supportDTOs = supports.Select(s => s.ToSupportDTO()).ToList();
            return Ok(supportDTOs);
        }

        [HttpGet("{supportId}")]
        public async Task<IActionResult> GetSupportById(int supportId)
        {
            var support = await _supportRepository.GetSupportByIdAsync(supportId);
            if (support == null)
                return NotFound("Support not found.");

            var supportDTO = support.ToSupportDTO();
            return Ok(supportDTO);
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateSupport([FromBody] CreateSupportDTO createSupportDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var supportEntity = createSupportDTO.toCreateSupportResponse();
            var createdSupport = await _supportRepository.CreateSupportAsync(supportEntity);
            var supportDTO = createdSupport.ToSupportDTO();

            return CreatedAtAction(nameof(GetSupportById), new { supportId = supportDTO.SupportID }, supportDTO);
        }

        [HttpPut("update/{supportId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSupport(int supportId, [FromBody] UpdateSupportDTO updateSupportDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedSupportEntity = updateSupportDTO.ToUpdateSupportResponse();
            var updatedSupport = await _supportRepository.UpdateSupportAsync(updatedSupportEntity, supportId);

            if (updatedSupport == null)
                return NotFound("Participation not found or could not be updated.");

            var supportDTO = updatedSupport.ToSupportDTO();
            return Ok(supportDTO);
        }

        [HttpDelete("delete/{supportId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSupport(int supportId)
        {
            var deletedSupport = await _supportRepository.DeleteSupportAsync(supportId);
            if (deletedSupport == null)
                return NotFound("Support not found.");

            return Ok("Support deleted successfully.");
        }
    }
}
