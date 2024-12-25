using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Responses
{
    public class ResponseRepository : IResponseRepository
    {
        private readonly ApplicationDbContext _context;

        public ResponseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Response> CreateResponseAsync(Response response)
        {
            await _context.Responses.AddAsync(response);
            await _context.SaveChangesAsync();
            return response;
        }

        public async Task<Response?> GetResponseByIdAsync(int responseId)
        {
            return await _context.Responses
                .Include(r => r.Participation) // Include Participation to get related data
                .Include(r => r.Question) // Include Question to get related data
                .Include(r => r.Option) // Include Option to get related data
                .FirstOrDefaultAsync(r => r.ResponseID == responseId);
        }

        public async Task<IEnumerable<Response>> GetAllResponsesAsync()
        {
            return await _context.Responses
                .Include(r => r.Participation) // Include Participation to get related data
                .Include(r => r.Question) // Include Question to get related data
                .Include(r => r.Option) // Include Option to get related data
                .ToListAsync();
        }

        public async Task<Response?> UpdateResponseAsync(Response updatedResponse, int responseId)
        {
            var existingResponse = await _context.Responses.FindAsync(responseId);
            if (existingResponse == null)
            {
                return null;
            }

            existingResponse.ParticipationID = updatedResponse.ParticipationID;
            existingResponse.QuestionID = updatedResponse.QuestionID;
            existingResponse.OptionID = updatedResponse.OptionID;
            existingResponse.ResponseText = updatedResponse.ResponseText;

            await _context.SaveChangesAsync();
            return existingResponse;
        }

        public async Task<Response?> DeleteResponseAsync(int responseId)
        {
            var response = await _context.Responses.FindAsync(responseId);
            if (response == null)
            {
                return null;
            }

            _context.Responses.Remove(response);
            await _context.SaveChangesAsync();
            return response;
        }

        public async Task<bool> ResponseExistsAsync(int responseId)
        {
            return await _context.Responses.AnyAsync(r => r.ResponseID == responseId);
        }
    }
}