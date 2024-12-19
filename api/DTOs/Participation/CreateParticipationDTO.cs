using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Participation
{
    public class CreateParticipationDTO
    {
        public DateTime ParticipationDate { get; set; } // Optionally update participation date
        public int? TotalScore { get; set; } // Optional score update
        public string? Feedback { get; set; } // Optional feedback update
    }
}