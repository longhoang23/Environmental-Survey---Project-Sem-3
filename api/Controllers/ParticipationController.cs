using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Participation;
using api.Mappers;
using api.Repositories.Participations;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParticipationController : ControllerBase
    {
<<<<<<< HEAD
        private readonly IParticipationRepository _participationRepository;

        public ParticipationController(IParticipationRepository participationRepository)
        {
            _participationRepository = participationRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllParticipations()
        {
            var participations = await _participationRepository.GetAllParticipationsAsync();
            var participationDTOs = participations.Select(p => p.ToParticipationDTO()).ToList();
            return Ok(participationDTOs);
        }

        [HttpGet("{participationId}")]
        public async Task<IActionResult> GetParticipationById(int participationId)
        {
            var participation = await _participationRepository.GetParticipationByIdAsync(participationId);
            if (participation == null)
                return NotFound("Participation not found.");

            var participationDTO = participation.ToParticipationDTO();
            return Ok(participationDTO);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateParticipation([FromBody] CreateParticipationDTO createParticipationDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var participationEntity = createParticipationDTO.ToCreateParticipationResponse();
            var createdParticipation = await _participationRepository.CreateParticipationAsync(participationEntity);
            var participationDTO = createdParticipation.ToParticipationDTO();

            return CreatedAtAction(nameof(GetParticipationById), new { participationId = participationDTO.ParticipationID }, participationDTO);
        }

        [HttpPut("update/{participationId}")]
        public async Task<IActionResult> UpdateParticipation(int participationId, [FromBody] UpdateParticipationDTO updateParticipationDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedParticipationEntity = updateParticipationDTO.ToUpdateParticipation();
            var updatedParticipation = await _participationRepository.UpdateParticipationAsync(updatedParticipationEntity, participationId);

            if (updatedParticipation == null)
                return NotFound("Participation not found or could not be updated.");

            var participationDTO = updatedParticipation.ToParticipationDTO();
            return Ok(participationDTO);
        }

        [HttpDelete("delete/{participationId}")]
        public async Task<IActionResult> DeleteParticipation(int participationId)
        {
            var deletedParticipation = await _participationRepository.DeleteParticipationAsync(participationId);
            if (deletedParticipation == null)
                return NotFound("Participation not found.");

            return Ok("Participation deleted successfully.");
        }
=======
        
>>>>>>> 10d5e6d04ad989a6f36b5471497a06dc55215500
    }
}