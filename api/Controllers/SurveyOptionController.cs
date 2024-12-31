using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.SurveyOption;
using api.Repositories.SurveyOptionRepo;
using Microsoft.AspNetCore.Mvc;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;

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
        [HttpGet("all")]
        public async Task<IActionResult> GetAllSurveyOptions()
        {
            var surveyOptions = await _surveyOptionRepository.GetAllSurveyOptionsAsync(); // Updated to async method
            var surveyOptionDTOs = surveyOptions.Select(o => o.ToSurveyOptionDTO()).ToList();
            return Ok(surveyOptionDTOs);
        }

        // GET: api/surveyoptions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSurveyOptionById(int id)
        {
            var surveyOption = await _surveyOptionRepository.GetSurveyOptionByIdAsync(id); // Updated to async method
            if (surveyOption == null)
            {
                return NotFound(new { message = "Survey option not found" });
            }
            var surveyOptionDTO = surveyOption.ToSurveyOptionDTO();
            return Ok(surveyOptionDTO);
        }

        // POST: api/surveyoptions
        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateSurveyOption([FromBody] UpsertSurveyOptionDTO upsertSurveyOptionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var surveyOption = upsertSurveyOptionDto.toUpsertSurveyOptionDTO(); // Fixed mapping method
            var createdSurveyOption = await _surveyOptionRepository.AddSurveyOptionAsync(surveyOption); // Updated to async method
            var surveyOptionDTO = createdSurveyOption.ToSurveyOptionDTO();

            return CreatedAtAction(nameof(GetSurveyOptionById), new { id = createdSurveyOption.OptionID }, surveyOptionDTO);
        }

        // PUT: api/surveyoptions/{id}
        [HttpPut("update/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSurveyOption(int id, [FromBody] UpsertSurveyOptionDTO upsertSurveyOptionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var surveyOptionUpdate = upsertSurveyOptionDto.toUpsertSurveyOptionDTO(); // Fixed mapping method
            surveyOptionUpdate.OptionID = id;

            var updatedSurveyOption = await _surveyOptionRepository.UpdateSurveyOptionAsync(id, surveyOptionUpdate); // Updated to async method
            if (updatedSurveyOption == null)
            {
                return NotFound(new { message = "Survey option not found" });
            }

            var surveyOptionDTO = updatedSurveyOption.ToSurveyOptionDTO();
            return Ok(surveyOptionDTO);
        }

        // DELETE: api/surveyoptions/{id}
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSurveyOption(int id)
        {
            var existingSurveyOption = await _surveyOptionRepository.GetSurveyOptionByIdAsync(id); // Updated to async method
            if (existingSurveyOption == null)
            {
                return NotFound(new { message = "Survey option not found" });
            }

            await _surveyOptionRepository.DeleteSurveyOptionAsync(id); // Updated to async method
            return Ok(new { message = "Survey option deleted successfully." });
        }
    }
}
