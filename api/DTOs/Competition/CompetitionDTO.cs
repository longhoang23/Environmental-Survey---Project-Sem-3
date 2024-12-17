using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Competition
{
    public class CompetitionDTO
    {
        [Key]
        public int CompetitionID { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;

        public string? Description { get; set; }
        [MaxLength(200)]
        public string? PrizeDetails { get; set; }
        public int? Winner1 { get; set; }
        public int? Winner2 { get; set; }
        public int? Winner3 { get; set; }
    }
}