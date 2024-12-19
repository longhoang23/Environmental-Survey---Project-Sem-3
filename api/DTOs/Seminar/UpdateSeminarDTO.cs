using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Seminar
{
    public class UpdateSeminarDTO
    {
        public int ConductedBy { get; set; }
        public string Location { get; set; } = null!;
        public DateTime Date { get; set; }
        public int ParticipantsCount { get; set; }
        public string? Description { get; set; }
    }
}