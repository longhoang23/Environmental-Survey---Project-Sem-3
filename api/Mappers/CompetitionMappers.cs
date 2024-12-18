using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Competition;
using api.Models;

namespace api.Mappers
{
    public static class CompetitionMappers
    {
        public static CompetitionDTO ToCompetitionDTO(this Competition competition){
            return new CompetitionDTO {
                CompetitionID = competition.CompetitionID,
                Title = competition.Title,
                Description = competition.Description,
                PrizeDetails = competition.PrizeDetails,
                Winner1 = competition.Winner1,
                Winner2 = competition.Winner2,
                Winner3 = competition.Winner3
            };
        }

        public static Competition ToCreateCompetitionResponse(this CreateCompetitionDTO createCompetitionDTO){
            return new Competition {
                Title = createCompetitionDTO.Title,
                Description = createCompetitionDTO.Description,
                PrizeDetails = createCompetitionDTO.PrizeDetails,
                Winner1 = createCompetitionDTO.Winner1,
                Winner2 = createCompetitionDTO.Winner2,
                Winner3 = createCompetitionDTO.Winner3
            };
        }

        public static Competition ToUpdateCompetitionResponse(this UpdateCompetitionDTO updateCompetitionDTO){
            return new Competition {
                Title = updateCompetitionDTO.Title,
                Description = updateCompetitionDTO.Description,
                PrizeDetails = updateCompetitionDTO.PrizeDetails,
                Winner1 = updateCompetitionDTO.Winner1,
                Winner2 = updateCompetitionDTO.Winner2,
                Winner3 = updateCompetitionDTO.Winner3
            };
        }
    }
}