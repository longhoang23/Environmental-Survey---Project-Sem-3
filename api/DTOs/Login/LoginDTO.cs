using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Login
{
    public class LoginDTO
    {
        public string PhoneNumber { get; set; } = null!;

        public string Password { get; set; } = null!;
    }
}