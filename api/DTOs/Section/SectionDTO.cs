using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Staff;

namespace api.DTOs.Section
{
    public class SectionDTO
    {
<<<<<<< HEAD
        public int SectionId { get; set; }
=======
         public int SectionId { get; set; }
>>>>>>> 10d5e6d04ad989a6f36b5471497a06dc55215500
        public string Name { get; set; } = null!;
        public ICollection<StaffDTO>? StaffDTOs { get; set; } = new List<StaffDTO>();
    }
}