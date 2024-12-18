using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Class;
using api.Enums.Role;
using api.Models;

namespace api.Mappers
{
    public static class KlassMappers
    {
        public static KlassDTO ToClassDTO(this Klass klass){
            return new KlassDTO {
                KlassId = klass.KlassId,
                Name = klass.Name,
                StudentDTOs = klass.Users?.Where(u => u.Role == UserRole.Student).Select(s => s.ToStudentDTO()).ToList()
            };
        }

        public static Klass ToCreateClassResponse(this CreateKlassDTO createClassDTO){
            return new Klass {
                Name = createClassDTO.Name
            };
        }

        public static Klass ToUpdateClassResponse(this UpdateKlassDTO UpdateClassDTO){
            return new Klass {
                Name = UpdateClassDTO.Name,
                
            };
        }
    }
}