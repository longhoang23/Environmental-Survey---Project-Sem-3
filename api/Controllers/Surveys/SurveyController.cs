using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Survey;
using api.Repositories.SurveyRepo;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Surveys
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly ISurveyRepository _surveyRepository;

        public SurveyController(ISurveyRepository surveyRepository)
        {
            _surveyRepository = surveyRepository;
        }

        // GET: api/surveys
        [HttpGet]
        public async Task<IActionResult> GetAllSurveys()
        {
            var surveys = await _surveyRepository.GetAllAsync();
            return Ok(surveys);
        }

        // GET: api/surveys/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSurveyById(int id)
        {
            var survey = await _surveyRepository.GetByIdAsync(id);
            if (survey == null)
            {
                return NotFound(new { message = "Survey not found" });
            }
            return Ok(survey);
        }

        // POST: api/surveys
        [HttpPost]
        public async Task<IActionResult> CreateSurvey([FromBody] SurveyDTO surveyDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _surveyRepository.AddAsync(surveyDto);
            return CreatedAtAction(nameof(GetSurveyById), new { id = surveyDto.SurveyID }, surveyDto);
        }

        // PUT: api/surveys/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSurvey(int id, [FromBody] SurveyDTO updatedSurveyDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingSurvey = await _surveyRepository.GetByIdAsync(id);
            if (existingSurvey == null)
            {
                return NotFound(new { message = "Survey not found" });
            }

            await _surveyRepository.UpdateAsync(id, updatedSurveyDto);
            return NoContent();
        }

        // DELETE: api/surveys/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurvey(int id)
        {
            var existingSurvey = await _surveyRepository.GetByIdAsync(id);
            if (existingSurvey == null)
            {
                return NotFound(new { message = "Survey not found" });
            }

            await _surveyRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}