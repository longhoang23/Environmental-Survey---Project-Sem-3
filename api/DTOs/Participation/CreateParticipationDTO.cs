using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Participation
{
    public class CreateParticipationDTO
    {
        public DateTime ParticipationDate { get; set; } = DateTime.Now; // Default to current time
        public int? TotalScore { get; set; } // Optional score
        public string? Feedback { get; set; } // Optional feedback
    }
}