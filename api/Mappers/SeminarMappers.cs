using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Seminar;
using api.Models;

namespace api.Mappers
{
    public static class SeminarMappers
    {
        public static SeminarDTO ToSeminarDTO(this Seminar seminar){
            return new SeminarDTO {
                SeminarID = seminar.SeminarID,
                ConductedBy = seminar.ConductedBy,
                Location = seminar.Location,
                Date = seminar.Date,
                ParticipantsCount = seminar.ParticipantsCount,
                Description = seminar.Description
            };
        }

        public static Seminar ToCreateSeminarResponse(this CreateSeminarDTO createSeminarDTO){
            return new Seminar {
                ConductedBy = createSeminarDTO.ConductedBy,
                Location = createSeminarDTO.Location,
                Date = createSeminarDTO.Date,
                ParticipantsCount = createSeminarDTO.ParticipantsCount,
                Description = createSeminarDTO.Description
            };
        }

        public static Seminar ToUpdateSeminarResponse(this UpdateSeminarDTO updateSeminarDTO){
             return new Seminar {
                ConductedBy = updateSeminarDTO.ConductedBy,
                Location = updateSeminarDTO.Location,
                Date = updateSeminarDTO.Date,
                ParticipantsCount = updateSeminarDTO.ParticipantsCount,
                Description = updateSeminarDTO.Description
            };
        }
    }
}