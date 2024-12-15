using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Class;
using api.Models;

namespace api.Mappers
{
    public static class KlassMappers
    {
        public static KlassDTO ToClass(this Klass klass){
            return new KlassDTO {
                ClassId = klass.KlassId,
                Name = klass.Name,
                
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