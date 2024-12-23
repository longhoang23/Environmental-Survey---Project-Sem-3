using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.SurveyOption;
using api.Repositories.SurveyOptionRepo;
using Microsoft.AspNetCore.Mvc;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyOptionController : ControllerBase
    {
        private readonly ISurveyOptionRepository _surveyOptionRepository;

        public SurveyOptionController(ISurveyOptionRepository surveyOptionRepository)
        {
            _surveyOptionRepository = surveyOptionRepository;
        }

        // GET: api/surveyoptions
        [HttpGet]
        public async Task<IActionResult> GetAllSurveyOptions()
        {
            var surveyOptions = await _surveyOptionRepository.GetAllSurveyOptions();
            var surveyOptionDTOs = surveyOptions.Select(o => o.ToSurveyOptionDTO()).ToList();
            return Ok(surveyOptionDTOs);
        }

        // GET: api/surveyoptions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSurveyOptionById(int id)
        {
            var surveyOption = await _surveyOptionRepository.GetSurveyOptionById(id);
            if (surveyOption == null)
            {
                return NotFound("Survey option not found");
            }
            var surveyOptionDTO = surveyOption.ToSurveyOptionDTO();
            return Ok(surveyOptionDTO);
        }

        // POST: api/surveyoptions
        [HttpPost]
        public async Task<IActionResult> CreateSurveyOption([FromBody] UpsertSurveyOptionDTO upsertSurveyOptionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var surveyOption = upsertSurveyOptionDto.toUpsertSurveyOptionDTO();
            var createdSurveyOption = await _surveyOptionRepository.AddSurveyOption(surveyOption);
            var surveyOptionDTO = createdSurveyOption.ToSurveyOptionDTO();

            return CreatedAtAction(nameof(GetSurveyOptionById), new { id = createdSurveyOption.OptionID }, surveyOptionDTO);
        }

        // PUT: api/surveyoptions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSurveyOption(int id, [FromBody] UpsertSurveyOptionDTO upsertSurveyOptionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var surveyOptionUpdate = upsertSurveyOptionDto.toUpsertSurveyOptionDTO();
            surveyOptionUpdate.OptionID = id;
            var updatedSurveyOption = await _surveyOptionRepository.UpdateSurveyOption(id, surveyOptionUpdate);
            if (updatedSurveyOption == null)
            {
                return NotFound(new { message = "Survey option not found" });
            }
            var surveyOptionDTO = updatedSurveyOption.ToSurveyOptionDTO();
            return Ok(surveyOptionDTO);
        }

        // DELETE: api/surveyoptions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurveyOption(int id)
        {
            var existingSurveyOption = await _surveyOptionRepository.GetSurveyOptionById(id);
            if (existingSurveyOption == null)
            {
                return NotFound(new { message = "Survey option not found" });
            }

            await _surveyOptionRepository.DeleteSurveyOption(id);
            return Ok("Survey option deleted successfully.");
        }
    }
}