using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Admin;

namespace api.DTOs.Class
{
    public class UpdateKlassDTO
    {
        public string Name { get; set; } = null!;
        // public ICollection<AdminDTO>? Users { get; set; } = new List<AdminDTO>();
    }
}