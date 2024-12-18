using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Section
{
    public class UpdateSectionDTO
    {
        public string Name { get; set; } = null!;
        // public ICollection<AdminDTO>? Users { get; set; } = new List<AdminDTO>();
    }
}