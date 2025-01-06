using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Seminar;
using api.Mappers;
using api.Repositories.Seminar;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeminarController : ControllerBase
    {
        private readonly ISeminarRepository _seminarRepository;

        public SeminarController(ISeminarRepository seminarRepository)
        {
            _seminarRepository = seminarRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllSeminars()
        {
            var seminars = await _seminarRepository.GetAllSeminarsAsync();
            var seminarDTOs = seminars.Select(s => s.ToSeminarDTO()).ToList();
            return Ok(seminarDTOs);
        }

        [HttpGet("{seminarId}")]
        public async Task<IActionResult> GetSeminarById(int seminarId)
        {
            var seminar = await _seminarRepository.GetSeminarByIdAsync(seminarId);
            if (seminar == null)
                return NotFound("Seminar not found.");

            var seminarDTO = seminar.ToSeminarDTO();
            return Ok(seminarDTO);
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<IActionResult> CreateSeminar([FromBody] CreateSeminarDTO createSeminarDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var seminarEntity = createSeminarDTO.ToCreateSeminarResponse();
            var createdSeminar = await _seminarRepository.CreateSeminarAsync(seminarEntity);
            var seminarDTO = createdSeminar.ToSeminarDTO();

            return CreatedAtAction(nameof(GetSeminarById), new { seminarId = seminarDTO.SeminarID }, seminarDTO);
        }

        [HttpPut("update/{seminarId}")]
        [Authorize(Roles = "Admin,Staff")]

        public async Task<IActionResult> UpdateSeminar(int seminarId, [FromBody] UpdateSeminarDTO updateSeminarDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Convert the incoming DTO to a Seminar object
            var seminarToUpdate = updateSeminarDTO.ToUpdateSeminarResponse();
            var updatedSeminar = await _seminarRepository.UpdateSeminarAsync(seminarToUpdate, seminarId);

            if (updatedSeminar == null)
                return NotFound("Seminar not found.");

            var seminarDTO = updatedSeminar.ToSeminarDTO();
            return Ok(seminarDTO);
        }

        [HttpDelete("delete/{seminarId}")]
        [Authorize(Roles = "Admin,Staff")]

        public async Task<IActionResult> DeleteSeminar(int seminarId)
        {
            var deletedSeminar = await _seminarRepository.DeleteSeminarAsync(seminarId);
            if (deletedSeminar == null)
                return NotFound("Seminar not found.");

            return Ok("Seminar deleted successfully.");
        }
    }
}