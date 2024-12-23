using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.SurveyQuestion;
using api.Repositories.SurveyQuestionRepo;
using Microsoft.AspNetCore.Mvc;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyQuestionController : ControllerBase
    {
        private readonly ISurveyQuestionRepository _surveyQuestionRepository;

        public SurveyQuestionController(ISurveyQuestionRepository surveyQuestionRepository)
        {
            _surveyQuestionRepository = surveyQuestionRepository;
        }

        // GET: api/surveyquestions
        [HttpGet]
        public async Task<IActionResult> GetAllSurveyQuestions()
        {
            var surveyQuestions = await _surveyQuestionRepository.GetAllSurveyQuestions();
            var surveyQuestionDTOs = surveyQuestions.Select(q => q.ToSurveyQuestionDTO()).ToList();
            return Ok(surveyQuestionDTOs);
        }

        // GET: api/surveyquestions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSurveyQuestionById(int id)
        {
            var surveyQuestion = await _surveyQuestionRepository.GetSurveyQuestionById(id);
            if (surveyQuestion == null)
            {
                return NotFound("Survey question not found");
            }
            var surveyQuestionDTO = surveyQuestion.ToSurveyQuestionDTO();
            return Ok(surveyQuestionDTO);
        }

        // POST: api/surveyquestions
        [HttpPost]
        public async Task<IActionResult> CreateSurveyQuestion([FromBody] UpsertSurveyQuestionDTO upsertSurveyQuestionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var surveyQuestion = upsertSurveyQuestionDto.toUpsertSurveyDTO();
            var createdSurveyQuestion = await _surveyQuestionRepository.AddSurveyQuestion(surveyQuestion);
            var surveyQuestionDTO = createdSurveyQuestion.ToSurveyQuestionDTO();

            return CreatedAtAction(nameof(GetSurveyQuestionById), new { id = createdSurveyQuestion.QuestionID }, surveyQuestionDTO);
        }

        // PUT: api/surveyquestions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSurveyQuestion(int id, [FromBody] UpsertSurveyQuestionDTO upsertSurveyQuestionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var surveyQuestionUpdate = upsertSurveyQuestionDto.toUpsertSurveyDTO();
            surveyQuestionUpdate.QuestionID = id;
            var updatedSurveyQuestion = await _surveyQuestionRepository.UpdateSurveyQuestion(id, surveyQuestionUpdate);
            if (updatedSurveyQuestion == null)
            {
                return NotFound(new { message = "Survey question not found" });
            }
            var surveyQuestionDTO = updatedSurveyQuestion.ToSurveyQuestionDTO();
            return Ok(surveyQuestionDTO);
        }

        // DELETE: api/surveyquestions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurveyQuestion(int id)
        {
            var existingSurveyQuestion = await _surveyQuestionRepository.GetSurveyQuestionById(id);
            if (existingSurveyQuestion == null)
            {
                return NotFound(new { message = "Survey question not found" });
            }

            await _surveyQuestionRepository.DeleteSurveyQuestion(id);
            return Ok("Survey question deleted successfully.");
        }
    }
}