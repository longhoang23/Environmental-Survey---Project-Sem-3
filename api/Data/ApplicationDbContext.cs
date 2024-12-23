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
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Competition>()
                .HasOne(c => c.SecondPlace)
                .WithMany()
                .HasForeignKey(c => c.Winner2)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Competition>()
                .HasOne(c => c.ThirdPlace)
                .WithMany()
                .HasForeignKey(c => c.Winner3)
                .OnDelete(DeleteBehavior.Restrict);

            // Survey and Participation relationship
            modelBuilder.Entity<Survey>()
                .HasMany(s => s.Participations)
                .WithOne(p => p.Survey)
                .HasForeignKey(p => p.SurveyID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Participation>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Response>()
                .HasOne(r => r.Question)
                .WithMany() // or WithOne()
                .HasForeignKey(r => r.QuestionID)
                .OnDelete(DeleteBehavior.Restrict); // Change from Cascade to Restrict or NoAction

            modelBuilder.Entity<Participation>()
                .HasOne(p => p.User)
                .WithMany(u => u.Participations)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Participation -> Survey relationship
                modelBuilder.Entity<Participation>()
                .HasOne(p => p.Survey)
                .WithMany(s => s.Participations)
                .HasForeignKey(p => p.SurveyID)
                .OnDelete(DeleteBehavior.Cascade);

                modelBuilder.Entity<User>().HasData(
                        new User
                        {
                            UserID = 1,
                            FirstName = "Super",
                            LastName = "Admin",
                            PhoneNumber = "0001112222",
                            Role = UserRole.Admin,
                            RollOrEmpNo = "EMP1001",
                            Status = UserStatus.Active,
                            Username = "superadmin",
                            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123"),  // hashed password
                            JoinDate = new DateTime(2023, 01, 01),
                            UpdatedAt = DateTime.UtcNow
                        },
                        new User
                        {
                            UserID = 2,
                            FirstName = "System",
                            LastName = "Administrator",
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
        }
    }
}