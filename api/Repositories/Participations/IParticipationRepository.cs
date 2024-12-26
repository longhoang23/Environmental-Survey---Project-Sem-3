using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.Participations
{
    public interface IParticipationRepository
    {
        Task<Participation> CreateParticipationAsync(Participation participation);
        Task<Participation?> GetParticipationByIdAsync(int participationId);
        Task<IEnumerable<Participation>> GetAllParticipationsAsync();
        Task<Participation?> UpdateParticipationAsync(Participation updatedParticipation, int participationId);
        Task<Participation?> DeleteParticipationAsync(int participationId);
        Task<bool> ParticipationExistsAsync(int participationId);
    }
}