using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Faq;
using api.Mappers;
using api.Models;
using api.Repositories.FaqRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FaqController : ControllerBase
    {
        private readonly IFaqRepository _faqRepository;

        public FaqController(IFaqRepository faqRepository)
        {
            _faqRepository = faqRepository;
        }

        // GET: api/faqs/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllFaqs()
        {
            var faqs = await _faqRepository.GetAllFaqs();
            var faqDTOs = faqs.Select(f => f.ToFaqDTO()).ToList();
            return Ok(faqDTOs);
        }

        // GET: api/faqs/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFaqById(int id)
        {
            var faq = await _faqRepository.GetFaqById(id);
            if (faq == null)
                return NotFound(new { message = "FAQ not found." });

            var faqDTO = faq.ToFaqDTO();
            return Ok(faqDTO);
        }

        // POST: api/faqs/create
        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateFaq([FromBody] UpsertFaqDTO createFaqDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var faq = createFaqDTO.ToUpsertFaqDTO();
            var createdFaq = await _faqRepository.AddFaq(faq);
            var faqDTO = createdFaq.ToFaqDTO();

            return CreatedAtAction(nameof(GetFaqById), new { id = faqDTO.FAQID }, faqDTO);
        }

        // PUT: api/faqs/update/{id}
        [HttpPut("update/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateFaq(int id, [FromBody] UpsertFaqDTO updateFaqDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var getUpdateFaq = updateFaqDTO.ToUpsertFaqDTO();
            getUpdateFaq.FAQID = id;
            var updatedFaq = await _faqRepository.UpdateFaq(id, getUpdateFaq);

            if (updatedFaq == null)
                return NotFound(new { message = "FAQ not found." });

            var faqDTO = updatedFaq.ToFaqDTO();
            return Ok(faqDTO);
        }

        // DELETE: api/faqs/delete/{id}
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteFaq(int id)
        {
            var existingFaq = await _faqRepository.GetFaqById(id);
            if (existingFaq == null)
            {
                return NotFound(new { message = "FAQ not found." });
            }
            await _faqRepository.DeleteFaq(id);    
            return Ok(new { message = "FAQ deleted successfully." });
        }
    }
}