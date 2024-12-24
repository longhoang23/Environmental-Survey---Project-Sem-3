using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.DTOs.Survey
{
    public class CreateSurveyDTO
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string TargetAudience { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; } = true;
        
    }
}