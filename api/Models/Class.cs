using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Classes")]
    public class Class
    {
        [Key]
        public int ClassId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = null!;

        // Navigation Property
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
