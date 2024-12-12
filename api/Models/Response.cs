using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Response
    {
    [Key]
    public int ResponseID { get; set; }

    [ForeignKey("Participation")]
    public int ParticipationID { get; set; }

    [ForeignKey("Question")]
    public int QuestionID { get; set; }

    [ForeignKey("Option")]
    public int? OptionID { get; set; }

    public string? ResponseText { get; set; }

    // Navigation Properties
    public Participation Participation { get; set; } = null!;
    public SurveyQuestion Question { get; set; } = null!;
    public SurveyOption? Option { get; set; }
    }
}