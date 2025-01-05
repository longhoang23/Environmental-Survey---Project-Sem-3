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

            // Build the username
            string username = $"{firstName.ToLower()}.{lastName.ToLower()}";

            return username;
        }
        public static string Generate4Digits()
        {
            int randomNum = _random.Next(1000, 10000);
            return randomNum.ToString();
        }
    }
}