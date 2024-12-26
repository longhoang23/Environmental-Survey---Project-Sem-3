using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class FAQs
    {
    [Key]
    public int FAQID { get; set; }
    public string Question { get; set; } = null!;
    public string? Answer { get; set; }
    }
}