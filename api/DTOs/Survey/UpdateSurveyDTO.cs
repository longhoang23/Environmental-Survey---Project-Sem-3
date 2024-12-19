using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Survey
{
    public class UpdateSurveyDTO
    {
        public int SurveyID { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string TargetAudience { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
}