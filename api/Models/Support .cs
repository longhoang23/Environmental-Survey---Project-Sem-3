using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
   [Table("Supports")]
    public class Support
    {
       [Key]
        public int SupportID { get; set; }
        public string ContactInfo { get; set; } = null!;
    }
}