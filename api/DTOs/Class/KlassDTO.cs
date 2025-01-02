using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Admin;
using api.DTOs.Student;
using api.Models;

namespace api.DTOs.Class
{
    public class KlassDTO
    {
        public int KlassId { get; set; }
        public string Name { get; set; } = null!;
        public ICollection<StudentDTO>? StudentDTOs { get; set; } = new List<StudentDTO>();
    }
}