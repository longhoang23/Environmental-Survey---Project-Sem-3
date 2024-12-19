using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Section;
using api.Mappers;
using api.Repositories.Section;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SectionController : ControllerBase
    {
        private readonly ISectionRepository _sectionRepository;

        public SectionController(ISectionRepository sectionRepository)
        {
            _sectionRepository = sectionRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllSections()
        {
            var sections = await _sectionRepository.GetAllSectionsAsync();
            var sectionDTOs = sections.Select(s => s.ToSectionDTO()).ToList();
            return Ok(sectionDTOs);
        }

        [HttpGet("{sectionId}")]
        public async Task<IActionResult> GetSectionById(int sectionId)
        {
            var section = await _sectionRepository.GetSectionByIdAsync(sectionId);
            if (section == null)
                return NotFound("Section not found.");

            var sectionDTO = section.ToSectionDTO();
            return Ok(sectionDTO);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateSection([FromBody] CreateSectionDTO createSectionDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newSection = createSectionDTO.ToCreateSectionResponse();
            var createdSection = await _sectionRepository.CreateSectionAsync(newSection);
            var sectionDTO = createdSection.ToSectionDTO();

            return CreatedAtAction(nameof(GetSectionById),
                                   new { sectionId = sectionDTO.SectionId },
                                   sectionDTO);
        }

        [HttpPut("update/{sectionId}")]
        public async Task<IActionResult> UpdateSection(int sectionId, [FromBody] UpdateSectionDTO updateSectionDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var sectionToUpdate = updateSectionDTO.ToUpdateSectionResponse();
            var updatedSection = await _sectionRepository.UpdateSectionAsync(sectionToUpdate, sectionId);

            if (updatedSection == null)
                return NotFound("Section not found.");

            var sectionDTO = updatedSection.ToSectionDTO();
            return Ok(sectionDTO);
        }

        [HttpDelete("delete/{sectionId}")]
        public async Task<IActionResult> DeleteSection(int sectionId)
        {
            var deletedSection = await _sectionRepository.DeleteSectionAsync(sectionId);
            if (deletedSection == null)
                return NotFound("Section not found.");

            return Ok("Section deleted successfully.");
        }
    }
}