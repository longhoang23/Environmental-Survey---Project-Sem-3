using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public static class UsernameGenerator
    {
          private static readonly Random _random = new Random();
        public static string GenerateUsername(string firstName, string lastName)
        {
            // Generate a random 4-digit number (1000-9999)
            int randomNum = _random.Next(1000, 10000);

            // Build the username
            string username = $"{firstName.ToLower()}.{lastName.ToLower()}{randomNum}";

            return username;
        }
    }
}