using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Faq
{
    public class UpsertFaqDTO
    {
        public string Question { get; set; } = null!;
        public string? Answer { get; set; }
    }
}