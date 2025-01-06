using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Response;
using api.Mappers;
using api.Repositories.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResponseController : ControllerBase
    {
        private readonly IResponseRepository _responseRepository;

        public ResponseController(IResponseRepository responseRepository)
        {
            _responseRepository = responseRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllResponses()
        {
            var responses = await _responseRepository.GetAllResponsesAsync();
            var responseDTOs = responses.Select(r => r.ToResponseDTO()).ToList();
            return Ok(responseDTOs);
        }

        [HttpGet("{responseId}")]
        public async Task<IActionResult> GetResponseById(int responseId)
        {
            var response = await _responseRepository.GetResponseByIdAsync(responseId);
            if (response == null)
                return NotFound("Response not found.");

            var responseDTO = response.ToResponseDTO();
            return Ok(responseDTO);
        }

        [HttpPost("create")]
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateResponse([FromBody] CreateResponseDTO createResponseDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var responseEntity = createResponseDTO.ToCreateResponseResponse();
            var createdResponse = await _responseRepository.CreateResponseAsync(responseEntity);
            var responseDTO = createdResponse.ToResponseDTO();

            return CreatedAtAction(nameof(GetResponseById), new { responseId = responseDTO.ResponseID }, responseDTO);
        }

        [HttpPut("update/{responseId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateResponse(int responseId, [FromBody] UpdateResponseDTO updateResponseDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedResponseEntity = updateResponseDTO.ToUpdateResponseResponse();
            var updatedResponse = await _responseRepository.UpdateResponseAsync(updatedResponseEntity, responseId);

            if (updatedResponse == null)
                return NotFound("Response not found or could not be updated.");

            var responseDTO = updatedResponse.ToResponseDTO();
            return Ok(responseDTO);
        }

        [HttpDelete("delete/{responseId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteResponse(int responseId)
        {
            var deletedResponse = await _responseRepository.DeleteResponseAsync(responseId);
            if (deletedResponse == null)
                return NotFound("Response not found.");

            return Ok("Response deleted successfully.");
        }
    }
}