using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Admin;
using api.Models;

namespace api.DTOs.Class
{
    public class KlassDTO
    {
        public int ClassId { get; set; }
        public string Name { get; set; } = null!;
        // public ICollection<AdminDTO>? Users { get; set; } = new List<AdminDTO>();
    }
}