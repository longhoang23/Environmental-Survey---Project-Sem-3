using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace api.Helpers
{
    public static class RollOrEmpNoGenerator
    {
         public static string GenerateRollOrEmpNo(string prefix)
        {
            // Generate a random 6-digit number
            int number = RandomNumberGenerator.GetInt32(100000, 1000000);
            return $"{prefix}{number}";
        }
    }
}