using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Competition;
using api.Mappers;
using api.Repositories.Competitions;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompetitionController : ControllerBase
    {
        private readonly ICompetitionRepository _competitionRepository;

        public CompetitionController(ICompetitionRepository competitionRepository)
        {
            _competitionRepository = competitionRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllCompetitions()
        {
            var competitions = await _competitionRepository.GetAllCompetitionsAsync();
            var competitionDTOs = competitions.Select(c => c.ToCompetitionDTO()).ToList();
            return Ok(competitionDTOs);
        }

        [HttpGet("{competitionId}")]
        public async Task<IActionResult> GetCompetitionById(int competitionId)
        {
            var competition = await _competitionRepository.GetCompetitionByIdAsync(competitionId);
            if (competition == null)
                return NotFound("Competition not found.");

            var competitionDTO = competition.ToCompetitionDTO();
            return Ok(competitionDTO);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCompetition([FromBody] CreateCompetitionDTO createCompetitionDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var competitionEntity = createCompetitionDTO.ToCreateCompetitionResponse();
            var createdCompetition = await _competitionRepository.CreateCompetitionAsync(competitionEntity);
            var competitionDTO = createdCompetition.ToCompetitionDTO();

            return CreatedAtAction(nameof(GetCompetitionById), new { competitionId = competitionDTO.CompetitionID }, competitionDTO);
        }

        [HttpPut("update/{competitionId}")]
        public async Task<IActionResult> UpdateCompetition(int competitionId, [FromBody] UpdateCompetitionDTO updateCompetitionDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedCompetitionEntity = updateCompetitionDTO.ToUpdateCompetitionResponse();
            var updatedCompetition = await _competitionRepository.UpdateCompetitionAsync(updatedCompetitionEntity, competitionId);

            if (updatedCompetition == null)
                return NotFound("Competition not found or could not be updated.");

            var competitionDTO = updatedCompetition.ToCompetitionDTO();
            return Ok(competitionDTO);
        }

        [HttpDelete("delete/{competitionId}")]
        public async Task<IActionResult> DeleteCompetition(int competitionId)
        {
            var deleted = await _competitionRepository.DeleteCompetitionAsync(competitionId);
            if (deleted == null)
                return NotFound("Competition not found.");

            return Ok("Competition deleted successfully.");
        }
    }
}