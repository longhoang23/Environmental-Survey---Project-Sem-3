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
        public static ParticipationDTO ToParticipationDTO(this Participation participation)
        {
            return new ParticipationDTO
            {
                ParticipationID = participation.ParticipationID,
                UserID = participation.UserID,
                SurveyID = participation.SurveyID,
                ParticipationDate = participation.ParticipationDate,
                TotalScore = participation.TotalScore,
                Feedback = participation.Feedback
            };
        }

        public static Participation ToCreateParticipationResponse(this CreateParticipationDTO createParticipationDTO)
        {
            return new Participation
            {
                ParticipationDate = createParticipationDTO.ParticipationDate,
                TotalScore = createParticipationDTO.TotalScore,
                Feedback = createParticipationDTO.Feedback
            };
        }

        public static Participation ToUpdateParticipation(this UpdateParticipationDTO updateParticipationDTO)
        {
            return new Participation
            {
                ParticipationDate = updateParticipationDTO.ParticipationDate,
                TotalScore = updateParticipationDTO.TotalScore,
                Feedback = updateParticipationDTO.Feedback
            };
        }
    }
}