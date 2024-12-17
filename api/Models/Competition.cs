using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Competitions")]
    public class Competition
    {
        [Key]
        public int CompetitionID { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;

        public string? Description { get; set; }//Can put date of competition in here
        [MaxLength(200)]
        public string? PrizeDetails { get; set; }
        public int? Winner1 { get; set; }
        public int? Winner2 { get; set; }
        public int? Winner3 { get; set; }

        // Foreign Keys
        [ForeignKey("Winner1")]
        public User? FirstPlace { get; set; }

        [ForeignKey("Winner2")]
        public User? SecondPlace { get; set; }

        [ForeignKey("Winner3")]
        public User? ThirdPlace { get; set; }
    }
}
