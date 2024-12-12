using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public DbSet<Class> Classes {get; set;}
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    modelBuilder.Entity<User>()
        .Property(u => u.Role)
        .HasConversion<int>(); // Ensures Role is stored as an integer in the DB.
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
}

    }
}