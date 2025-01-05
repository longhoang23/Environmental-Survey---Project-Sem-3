using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using api.DTOs.Response;
using api.Models;

namespace api.Mappers
{
    public static class ResponseMappers
    {
        public static ResponseDTO ToResponseDTO(this Response response)
        {
            return new ResponseDTO
            {
                ResponseID = response.ResponseID,
                ParticipationID = response.ParticipationID,
                QuestionID = response.QuestionID,
                OptionID = response.OptionID,
                ResponseText = response.ResponseText
            };
        }

        public static Response ToCreateResponseResponse(this CreateResponseDTO createResponseDTO)
        {
            return new Response
            {
                ParticipationID = createResponseDTO.ParticipationID,
                QuestionID = createResponseDTO.QuestionID,
                OptionID = createResponseDTO.OptionID,
                ResponseText = createResponseDTO.ResponseText
            };
        }

        public static Response ToUpdateResponseResponse(this UpdateResponseDTO updateResponseDTO)
        {
            return new Response
            {
                ParticipationID = updateResponseDTO.ParticipationID,
                QuestionID = updateResponseDTO.QuestionID,
                OptionID = updateResponseDTO.OptionID,
                ResponseText = updateResponseDTO.ResponseText
            };
        }
    }
}