using System.Collections.Generic;
using System.Linq;
using api.DTOs.FAQ;
using api.Models;

namespace api.Mappers
{
    public static class FaqMappers
    {
        public static FaqDTO ToFaqDTO(this FAQs faq)
        {
            return new FaqDTO
            {
                FAQID = faq.FAQID,
                Question = faq.Question,
                Answer = faq.Answer
            };
        }

        public static FAQs ToCreateFaq(this UpsertFaqDTO upsertFaqDTO)
        {
            return new FAQs
            {
                Question = upsertFaqDTO.Question,
                Answer = upsertFaqDTO.Answer
            };
        }
    }
}