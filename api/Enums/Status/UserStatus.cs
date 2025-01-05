namespace api.Enums.Status
{
    public enum UserStatus
    {
        NotRequested = 0, // User has never requested activation
        Pending = 1,      // User requested activation, waiting for admin
        Active = 2,       // Admin approved the request
        Decline = 3       // Admin declined the request
  
    }
}