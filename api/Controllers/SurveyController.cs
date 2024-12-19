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
            var surveys = await _surveyRepository.GetAllSurvey();
            var surveyDTOs = surveys.Select(o => o.ToSurveyDTO()).ToList();
            return Ok(surveyDTOs);
        }

        // GET: api/surveys/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSurveyById(int id)
        {
            var survey = await _surveyRepository.GetSurveyById(id);
            if (survey == null)
            {
                return NotFound("Survey not found");
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
            var createdSurvey = await _surveyRepository.AddSurvey(survey);
            var surveyDTO = createdSurvey.ToSurveyDTO();

            return CreatedAtAction(nameof(GetSurveyById), new { id = createSurveyDto.SurveyID }, surveyDTO);
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
            var updatedSurvey = await _surveyRepository.UpdateSurvey(id, surveyUpdate);
            if (updatedSurvey == null)
            {
                return NotFound(new { message = "Survey not found" });
            }
            var SurveyDTO = updatedSurvey.ToSurveyDTO();
            return Ok(SurveyDTO);
        }

        // DELETE: api/surveys/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurvey(int id)
        {
            var existingSurvey = await _surveyRepository.GetSurveyById(id);
            if (existingSurvey == null)
            {
                return NotFound(new { message = "Survey not found" });
            }

            await _surveyRepository.DeleteSurvey(id);
            return Ok("Survey deleted successfully.");
        }
    }
}