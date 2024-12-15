using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Section
{
    public class SectionDTO
    {
         public int SectionId { get; set; }
        public string Name { get; set; } = null!;
        // public ICollection<AdminDTO>? Users { get; set; } = new List<AdminDTO>();
    }
}