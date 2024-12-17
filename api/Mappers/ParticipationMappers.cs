using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Participation;
using api.Models;

namespace api.Mappers
{
    public static class ParticipationMappers
    {
        public static Participation ToParticipation(CreateParticipationDTO dto)
    {
        return new Participation
        {
            UserID = dto.UserID,
            SurveyID = dto.SurveyID,
            ParticipationDate = dto.ParticipationDate ?? DateTime.Now,
            TotalScore = dto.TotalScore,
            Feedback = dto.Feedback
        };
    }
    }
}