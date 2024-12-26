using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Survey;
using api.Repositories.SurveyRepo;
using Microsoft.AspNetCore.Mvc;
using api.Mappers;

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
            var surveys = await _surveyRepository.GetAllSurveysAsync(); // Updated to new async method
            
            var surveyDTOs = surveys.Select(s => s.ToSurveyDTO()).ToList();
            return Ok(surveyDTOs);
        }

        // GET: api/surveys/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSurveyById(int id)
        {
            var survey = await _surveyRepository.GetSurveyByIdAsync(id); // Updated to new async method
            if (survey == null)
            {
                return NotFound(new { message = "Survey not found" });
            }

            var surveyDTO = survey.ToSurveyDTO();
            return Ok(surveyDTO);
        }

        // POST: api/surveys
        [HttpPost]
        public async Task<IActionResult> CreateSurvey([FromBody] CreateSurveyDTO createSurveyDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var survey = createSurveyDto.toCreateSurveyDTO();
            var createdSurvey = await _surveyRepository.AddSurveyAsync(survey); // Updated to new async method
            var surveyDTO = createdSurvey.ToSurveyDTO();

            return CreatedAtAction(nameof(GetSurveyById), new { id = createdSurvey.SurveyID }, surveyDTO);
        }

        // PUT: api/surveys/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSurvey(int id, [FromBody] UpdateSurveyDTO updateSurveyDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var surveyUpdate = updateSurveyDto.ToUpdatedSurvey();
            surveyUpdate.SurveyID = id;

            var updatedSurvey = await _surveyRepository.UpdateSurveyAsync(id, surveyUpdate); // Updated to new async method
            if (updatedSurvey == null)
            {
                return NotFound(new { message = "Survey not found" });
            }

            var surveyDTO = updatedSurvey.ToSurveyDTO();
            return Ok(surveyDTO);
        }

        // DELETE: api/surveys/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurvey(int id)
        {
            var existingSurvey = await _surveyRepository.GetSurveyByIdAsync(id); // Updated to new async method
            if (existingSurvey == null)
            {
                return NotFound(new { message = "Survey not found" });
            }

            await _surveyRepository.DeleteSurveyAsync(id); // Updated to new async method
            return Ok(new { message = "Survey deleted successfully." });
        }
    }
}
