using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Response
{
    public class CreateResponseDTO
    {
    public int ParticipationID { get; set; }
    public int QuestionID { get; set; }
    public int? OptionID { get; set; }
    public string? ResponseText { get; set; }
    }
}