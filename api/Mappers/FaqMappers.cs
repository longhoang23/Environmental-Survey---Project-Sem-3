using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Faq;
using api.Models;

namespace api.Mappers
{
    public static class FaqMappers
    {
        public static FaqDTO ToFaqDTO(this FAQ faq)
        {
            return new FaqDTO
            {
                FAQID = faq.FAQID,
                Question = faq.Question,
                Answer = faq.Answer
            };
        }

        public static FAQ ToUpsertFaqDTO(this UpsertFaqDTO upsertFaqDTO)
        {
            return new FAQ
            {
                Question = upsertFaqDTO.Question,
                Answer = upsertFaqDTO.Answer
            };
        }
    }
}