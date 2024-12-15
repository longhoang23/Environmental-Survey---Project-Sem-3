using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Class;
using api.Mappers;
using api.Repositories.Class;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KlassController : ControllerBase
    {
        private readonly IKlassRepository _klassRepository;

        public KlassController(IKlassRepository klassRepository)
        {
            _klassRepository = klassRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllClasses()
        {
            var classes = await _klassRepository.GetAllClassesAsync();
            // Map each Klass entity to KlassDTO
            var klassDTOs = classes.Select(k => k.ToClass()).ToList();
            return Ok(klassDTOs);
        }

        [HttpGet("{classId}")]
        public async Task<IActionResult> GetClassById(int classId)
        {
            var klass = await _klassRepository.GetClassByIdAsync(classId);
            if (klass == null) 
                return NotFound("Class not found.");

            var klassDTO = klass.ToClass();
            return Ok(klassDTO);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateClass([FromBody] CreateKlassDTO createKlassDTO)
        {
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            var newClass = createKlassDTO.ToCreateClassResponse();
            var createdClass = await _klassRepository.CreateClassAsync(newClass);
            var klassDTO = createdClass.ToClass();

            return CreatedAtAction(nameof(GetClassById), new { classId = klassDTO.ClassId }, klassDTO);
        }

        [HttpPut("update/{classId}")]
        public async Task<IActionResult> UpdateClass(int classId, [FromBody] UpdateKlassDTO updateKlassDTO)
        {
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            var classToUpdate = updateKlassDTO.ToUpdateClassResponse();
            var updatedClass = await _klassRepository.UpdateClassAsync(classToUpdate, classId);

            if (updatedClass == null) 
                return NotFound("Class not found.");

            var klassDTO = updatedClass.ToClass();
            return Ok(klassDTO);
        }

        [HttpDelete("delete/{classId}")]
        public async Task<IActionResult> DeleteClass(int classId)
        {
            var deletedClass = await _klassRepository.DeleteClassAsync(classId);
            if (deletedClass == null) 
                return NotFound("Class not found.");

            return Ok("Class deleted successfully.");
        }
    }
}