using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Support;
using api.Models;

namespace api.Mappers
{
    public static class SupportMappers
    {
        public static SupportDTO ToSupportDTO(this Support support)
        {
            return new SupportDTO
            {
                SupportID = support.SupportID,
                ContactInfo = support.ContactInfo
            };
        }

        public static Support toCreateSupportDTO(this CreateSupportDTO createSupportDTO)
        {
            return new Support
            {
               ContactInfo = createSupportDTO.ContactInfo
            };
        }

        public static Support ToUpdatedSupport(this UpdateSupportDTO updateSupportDTO)
        {
            return new Support
            {
                ContactInfo = updateSupportDTO.ContactInfo
            };
        }
    }
}