using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Staff;

namespace api.DTOs.Section
{
    public class SectionDTO
    {

        public int SectionId { get; set; }
        public string Name { get; set; } = null!;
        public ICollection<StaffDTO>? StaffDTOs { get; set; } = new List<StaffDTO>();
    }
}