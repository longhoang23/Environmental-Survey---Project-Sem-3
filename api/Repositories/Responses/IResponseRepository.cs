using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.Responses
{
    public interface IResponseRepository
    {
        Task<Response> CreateResponseAsync(Response response);
        Task<Response?> GetResponseByIdAsync(int responseId);
        Task<IEnumerable<Response>> GetAllResponsesAsync();
        Task<Response?> UpdateResponseAsync(Response updatedResponse, int responseId);
        Task<Response?> DeleteResponseAsync(int responseId);
        Task<bool> ResponseExistsAsync(int responseId);
    }
}