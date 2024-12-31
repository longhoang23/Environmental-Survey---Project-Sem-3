using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using api.Repositories.Supports;
using api.DTOs.Support;
using api.Models;
using api.Mappers;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupportController : ControllerBase
    {
        private readonly ISupportRepository _supportRepository;

        public SupportController(ISupportRepository supportRepository)
        {
            _supportRepository = supportRepository;
        }

        // GET: api/Support
        [HttpGet]
        public async Task<IActionResult> GetAllSupports()
        {
            var supports = await _supportRepository.GetAllSupportsAsync();
            return Ok(supports.Select(s => s.ToSupportDTO()));
        }

        // GET: api/Support/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupportById(int id)
        {
            var support = await _supportRepository.GetSupportByIdAsync(id);
            if (support == null)
            {
                return NotFound(new { Message = $"Support with ID {id} not found." });
            }

            return Ok(support.ToSupportDTO());
        }

        // POST: api/Support
        [HttpPost]
        public async Task<IActionResult> CreateSupport([FromBody] CreateSupportDTO createSupportDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newSupport = createSupportDTO.toCreateSupportDTO();
            var createdSupport = await _supportRepository.CreateSupportAsync(newSupport);

            return CreatedAtAction(nameof(GetSupportById), new { id = createdSupport.SupportID }, createdSupport.ToSupportDTO());
        }

        // PUT: api/Support/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupport(int id, [FromBody] UpdateSupportDTO updateSupportDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var supportExists = await _supportRepository.SupportExistsAsync(id);
            if (!supportExists)
            {
                return NotFound(new { Message = $"Support with ID {id} not found." });
            }

            var updatedSupport = updateSupportDTO.ToUpdatedSupport();
            var result = await _supportRepository.UpdateSupportAsync(updatedSupport, id);

            if (result == null)
            {
                return StatusCode(500, new { Message = "An error occurred while updating the support." });
            }

            return Ok(result.ToSupportDTO());
        }

        // DELETE: api/Support/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupport(int id)
        {
            var supportExists = await _supportRepository.SupportExistsAsync(id);
            if (!supportExists)
            {
                return NotFound(new { Message = $"Support with ID {id} not found." });
            }

            var deletedSupport = await _supportRepository.DeleteSupportAsync(id);
            if (deletedSupport == null)
            {
                return StatusCode(500, new { Message = "An error occurred while deleting the support." });
            }

            return Ok(deletedSupport.ToSupportDTO());
        }
    }
}
