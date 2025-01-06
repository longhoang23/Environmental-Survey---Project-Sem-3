using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums.Role;
using api.Enums.Status;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<User> Users {get; set;}
        public DbSet<Klass> Klasses {get; set;}
        public DbSet<Competition> Competitions {get; set;}
        public DbSet<FAQ> FAQs {get; set;}
        public DbSet<Participation> Participations {get; set;}
        public DbSet<Response> Responses {get; set;}
        public DbSet<Section> Sections {get; set;}
        public DbSet<Seminar> Seminars {get; set;}
        public DbSet<Support> Supports {get; set;}
        public DbSet<Survey> Surveys {get; set;}
        public DbSet<SurveyQuestion> SurveyQuestions {get; set;}
        public DbSet<SurveyOption> SurveyOptions {get; set;}
        public DbSet<RegistrationRequest> RegistrationRequests {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<int>(); // Ensures Role is stored as an integer in the DB.

            // Survey and SurveyQuestion relationship
            modelBuilder.Entity<Survey>()
                .HasMany(s => s.SurveyQuestions)
                .WithOne(q => q.Survey)
                .HasForeignKey(q => q.SurveyID)
                .OnDelete(DeleteBehavior.Cascade);

            // Competition to User relationships
            modelBuilder.Entity<Competition>()
                .HasOne(c => c.FirstPlace)
                .WithMany()
                .HasForeignKey(c => c.Winner1)
                .IsRequired(false) // Allow null for Winner1
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Competition>()
                .HasOne(c => c.SecondPlace)
                .WithMany()
                .HasForeignKey(c => c.Winner2)
                .IsRequired(false) // Allow null for Winner2
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Competition>()
                .HasOne(c => c.ThirdPlace)
                .WithMany()
                .HasForeignKey(c => c.Winner3)
                .IsRequired(false) // Allow null for Winner3
                .OnDelete(DeleteBehavior.Restrict);

            // Survey and Participation relationship
            modelBuilder.Entity<Survey>()
                .HasMany(s => s.Participations)
                .WithOne(p => p.Survey)
                .HasForeignKey(p => p.SurveyID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Participation>()
                .HasOne(p => p.User)
                .WithMany(u => u.Participations)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Response>()
                .HasOne(r => r.Question)
                .WithMany() // or WithOne()
                .HasForeignKey(r => r.QuestionID)
                .OnDelete(DeleteBehavior.Restrict); // Change from Cascade to Restrict or NoAction

           // Configure Participation -> Survey relationship
            modelBuilder.Entity<Participation>()
                .HasOne(p => p.Survey)
                .WithMany(s => s.Participations)
                .HasForeignKey(p => p.SurveyID)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure Participation -> User relationship
            modelBuilder.Entity<Participation>()
                .HasOne(p => p.User)
                .WithMany(u => u.Participations)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Restrict);
                
            
            modelBuilder.Entity<Klass>().HasData(
                new Klass
                {
                    KlassId = 1, // Ensure no conflicts with existing IDs
                    Name = "C2304L"
                },
                new Klass
                {
                    KlassId = 2,
                    Name = "C2222L"
                },
                new Klass
                {
                    KlassId = 3,
                    Name = "C1234X"
                }
            );

            modelBuilder.Entity<Section>().HasData(
                new Section
                {
                    SectionId = 1, // Ensure no conflicts with existing IDs
                    Name = "Section A"
                },
                new Section
                {
                    SectionId = 2,
                    Name = "Section B"
                },
                new Section
                {
                    SectionId = 3,
                    Name = "Section C"
                }
            );
            modelBuilder.Entity<User>().HasData(
                // Admins
                new User
                {
                    UserID = 1,
                    FirstName = "Super",
                    LastName = "Admin",
                    Email = "super.admin@example.com",
                    PhoneNumber = "0001112222",
                    Role = UserRole.Admin,
                    RollOrEmpNo = "EMP1001",
                    Status = UserStatus.Active,
                    Username = "superadmin",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123"),
                    JoinDate = new DateTime(2023, 01, 01),
                    UpdatedAt = DateTime.UtcNow
                },
                new User
                {
                    UserID = 2,
                    FirstName = "System",
                    LastName = "Administrator",
                    Email = "system.admin@example.com",
                    PhoneNumber = "0001113333",
                    Role = UserRole.Admin,
                    RollOrEmpNo = "EMP1002",
                    Status = UserStatus.Active,
                    Username = "sysadmin",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123"),
                    JoinDate = new DateTime(2023, 02, 01),
                    UpdatedAt = DateTime.UtcNow
                },
                new User
                {
                    UserID = 3,
                    FirstName = "Head",
                    LastName = "Admin",
                    Email = "head.admin@example.com",
                    PhoneNumber = "0001114444",
                    Role = UserRole.Admin,
                    RollOrEmpNo = "EMP1003",
                    Status = UserStatus.Active,
                    Username = "headadmin",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123"),
                    JoinDate = new DateTime(2023, 03, 01),
                    UpdatedAt = DateTime.UtcNow
                }
            );

            // Students
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserID = 101,
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@example.com",
                    PhoneNumber = "1234567890",
                    Role = UserRole.Student,
                    RollOrEmpNo = "student111111",
                    KlassId = 1,
                    Specification = "Computer Science",
                    AdmissionDate = new DateTime(2023, 01, 10),
                    UpdatedAt = DateTime.UtcNow,
                    Status = UserStatus.NotRequested,
                    Username = "john.doe",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
                },
                new User
                {
                    UserID = 102,
                    FirstName = "Jane",
                    LastName = "Smith",
                    Email = "jane.smith@example.com",
                    PhoneNumber = "9876543210",
                    Role = UserRole.Student,
                    RollOrEmpNo = "student123456",
                    KlassId = 1,
                    Specification = "Mathematics",
                    AdmissionDate = new DateTime(2023, 02, 15),
                    UpdatedAt = DateTime.UtcNow,
                    Status = UserStatus.NotRequested,
                    Username = "jane.smith",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
                },
                new User
                {
                    UserID = 103,
                    FirstName = "Alice",
                    LastName = "Johnson",
                    Email = "alice.johnson@example.com",
                    PhoneNumber = "4567891230",
                    Role = UserRole.Student,
                    RollOrEmpNo = "student135790",
                    KlassId = 2,
                    Specification = "Physics",
                    AdmissionDate = new DateTime(2023, 03, 20),
                    UpdatedAt = DateTime.UtcNow,
                    Status = UserStatus.NotRequested,
                    Username = "alice.johnson",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
                },
                new User
                {
                    UserID = 104,
                    FirstName = "Bob",
                    LastName = "Brown",
                    Email = "bob.brown@example.com",
                    PhoneNumber = "3216549870",
                    Role = UserRole.Student,
                    RollOrEmpNo = "student987654",
                    KlassId = 2,
                    Specification = "Chemistry",
                    AdmissionDate = new DateTime(2023, 04, 25),
                    UpdatedAt = DateTime.UtcNow,
                    Status = UserStatus.NotRequested,
                    Username = "bob.brown",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
                },
                new User
                {
                    UserID = 105,
                    FirstName = "Charlie",
                    LastName = "White",
                    Email = "charlie.white@example.com",
                    PhoneNumber = "6543217890",
                    Role = UserRole.Student,
                    RollOrEmpNo = "student234567",
                    KlassId = 3,
                    Specification = "Biology",
                    AdmissionDate = new DateTime(2023, 05, 30),
                    UpdatedAt = DateTime.UtcNow,
                    Status = UserStatus.NotRequested,
                    Username = "charlie.white",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
                }
            );

            // Staff
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserID = 201,
                    FirstName = "Alice",
                    LastName = "Brown",
                    Email = "alice.brown@example.com",
                    PhoneNumber = "1122334455",
                    Role = UserRole.Staff,
                    RollOrEmpNo = "STAFF001",
                    SectionId = 1,
                    Specification = "IT Support",
                    JoinDate = new DateTime(2022, 01, 15),
                    UpdatedAt = DateTime.UtcNow,
                    Status = UserStatus.Active,
                    Username = "alice.brown",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
                },
                new User
                {
                    UserID = 202,
                    FirstName = "Bob",
                    LastName = "Johnson",
                    Email = "bob.johnson@example.com",
                    PhoneNumber = "2233445566",
                    Role = UserRole.Staff,
                    RollOrEmpNo = "STAFF002",
                    SectionId = 2,
                    Specification = "Library Manager",
                    JoinDate = new DateTime(2022, 02, 20),
                    UpdatedAt = DateTime.UtcNow,
                    Status = UserStatus.Active,
                    Username = "bob.johnson",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
                },
                new User
                {
                    UserID = 203,
                    FirstName = "Charlie",
                    LastName = "Smith",
                    Email = "charlie.smith@example.com",
                    PhoneNumber = "3344556677",
                    Role = UserRole.Staff,
                    RollOrEmpNo = "STAFF003",
                    SectionId = 3,
                    Specification = "Accounts Manager",
                    JoinDate = new DateTime(2022, 03, 10),
                    UpdatedAt = DateTime.UtcNow,
                    Status = UserStatus.Active,
                    Username = "charlie.smith",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
                },
                new User
                {
                    UserID = 204,
                    FirstName = "Diana",
                    LastName = "White",
                    Email = "diana.white@example.com",
                    PhoneNumber = "4455667788",
                    Role = UserRole.Staff,
                    RollOrEmpNo = "STAFF004",
                    SectionId = 1,
                    Specification = "HR Specialist",
                    JoinDate = new DateTime(2022, 04, 05),
                    UpdatedAt = DateTime.UtcNow,
                    Status = UserStatus.Active,
                    Username = "diana.white",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
                },
                new User
                {
                    UserID = 205,
                    FirstName = "Evan",
                    LastName = "Green",
                    Email = "evan.green@example.com",
                    PhoneNumber = "5566778899",
                    Role = UserRole.Staff,
                    RollOrEmpNo = "STAFF005",
                    SectionId = 2,
                    Specification = "Security Officer",
                    JoinDate = new DateTime(2022, 05, 25),
                    UpdatedAt = DateTime.UtcNow,
                    Status = UserStatus.Active,
                    Username = "evan.green",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
                }
            ); 
        }
    }
}