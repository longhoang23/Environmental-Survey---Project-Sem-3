using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Section;
using api.Enums.Role;
using api.Models;

namespace api.Mappers
{
    public static class SectionMappers
    {
        public static SectionDTO ToSectionDTO(this Section section){
            return new SectionDTO {
                SectionId = section.SectionId,
                Name = section.Name,
                StaffDTOs = section.Users?.Where(u => u.Role == UserRole.Staff).Select(s => s.ToStaffDTO()).ToList()
            };
        }

        public static Section ToCreateSectionResponse(this CreateSectionDTO createSectionDTO){
            return new Section {
                Name = createSectionDTO.Name,
            };
        }

        public static Section ToUpdateSectionResponse(this UpdateSectionDTO updateSectionDTO){
            return new Section {
                Name = updateSectionDTO.Name,
            };
        }
    }
}