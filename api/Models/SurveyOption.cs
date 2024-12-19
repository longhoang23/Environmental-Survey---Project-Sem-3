using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class SurveyOption
    {
    [Key]
    public int OptionID { get; set; }

    [ForeignKey("Question")]
    public int QuestionID { get; set; }

    [Required]
    [MaxLength(300)]
    public string OptionText { get; set; } = null!;

    public int Score { get; set; } = 0;

    // Navigation Property
    public SurveyQuestion? Question { get; set; } = null!;
    }
}