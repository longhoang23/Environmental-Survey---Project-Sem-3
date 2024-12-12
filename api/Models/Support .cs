using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Support
    {
        [Key]
        public int SupportID { get; set; }
        public string ContactInfo { get; set; } = null!;
    }
}