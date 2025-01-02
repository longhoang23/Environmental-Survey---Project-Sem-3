﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241220103717_V7")]
    partial class V7
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("api.Models.Competition", b =>
                {
                    b.Property<int>("CompetitionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CompetitionID"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PrizeDetails")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<int?>("Winner1")
                        .HasColumnType("int");

                    b.Property<int?>("Winner2")
                        .HasColumnType("int");

                    b.Property<int?>("Winner3")
                        .HasColumnType("int");

                    b.HasKey("CompetitionID");

                    b.HasIndex("Winner1");

                    b.HasIndex("Winner2");

                    b.HasIndex("Winner3");

                    b.ToTable("Competitions");
                });

            modelBuilder.Entity("api.Models.FAQ", b =>
                {
                    b.Property<int>("FAQID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("FAQID"));

                    b.Property<string>("Answer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("FAQID");

                    b.ToTable("FAQs");
                });

            modelBuilder.Entity("api.Models.Klass", b =>
                {
                    b.Property<int>("KlassId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("KlassId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("KlassId");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("api.Models.Participation", b =>
                {
                    b.Property<int>("ParticipationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ParticipationID"));

                    b.Property<string>("Feedback")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ParticipationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("SurveyID")
                        .HasColumnType("int");

                    b.Property<int?>("TotalScore")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ParticipationID");

                    b.HasIndex("SurveyID");

                    b.HasIndex("UserID");

                    b.ToTable("Participations");
                });

            modelBuilder.Entity("api.Models.RegistrationRequest", b =>
                {
                    b.Property<int>("RegistrationRequestId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RegistrationRequestId"));

                    b.Property<DateTime?>("AdmissionDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ClassId")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("JoinDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RequestedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("RollOrEmpNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("SectionId")
                        .HasColumnType("int");

                    b.Property<string>("Specification")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("RegistrationRequestId");

                    b.HasIndex("UserId");

                    b.ToTable("RegistrationRequests");
                });

            modelBuilder.Entity("api.Models.Response", b =>
                {
                    b.Property<int>("ResponseID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ResponseID"));

                    b.Property<int?>("OptionID")
                        .HasColumnType("int");

                    b.Property<int>("ParticipationID")
                        .HasColumnType("int");

                    b.Property<int>("QuestionID")
                        .HasColumnType("int");

                    b.Property<string>("ResponseText")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ResponseID");

                    b.HasIndex("OptionID");

                    b.HasIndex("ParticipationID");

                    b.HasIndex("QuestionID");

                    b.ToTable("Responses");
                });

            modelBuilder.Entity("api.Models.Section", b =>
                {
                    b.Property<int>("SectionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SectionId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("SectionId");

                    b.ToTable("Sections");
                });

            modelBuilder.Entity("api.Models.Seminar", b =>
                {
                    b.Property<int>("SeminarID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SeminarID"));

                    b.Property<int>("ConductedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<int>("ParticipantsCount")
                        .HasColumnType("int");

                    b.HasKey("SeminarID");

                    b.HasIndex("ConductedBy");

                    b.ToTable("Seminars");
                });

            modelBuilder.Entity("api.Models.Support", b =>
                {
                    b.Property<int>("SupportID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SupportID"));

                    b.Property<string>("ContactInfo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SupportID");

                    b.ToTable("Supports");
                });

            modelBuilder.Entity("api.Models.Survey", b =>
                {
                    b.Property<int>("SurveyID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SurveyID"));

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("TargetAudience")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("SurveyID");

                    b.HasIndex("CreatedBy");

                    b.ToTable("Surveys");
                });

            modelBuilder.Entity("api.Models.SurveyOption", b =>
                {
                    b.Property<int>("OptionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OptionID"));

                    b.Property<string>("OptionText")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)");

                    b.Property<int>("QuestionID")
                        .HasColumnType("int");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.HasKey("OptionID");

                    b.HasIndex("QuestionID");

                    b.ToTable("SurveyOptions");
                });

            modelBuilder.Entity("api.Models.SurveyQuestion", b =>
                {
                    b.Property<int>("QuestionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("QuestionID"));

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("QuestionType")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("SurveyID")
                        .HasColumnType("int");

                    b.HasKey("QuestionID");

                    b.HasIndex("SurveyID");

                    b.ToTable("SurveyQuestions");
                });

            modelBuilder.Entity("api.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserID"));

                    b.Property<DateTime?>("AdmissionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime?>("JoinDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("KlassId")
                        .HasColumnType("int");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<int>("Role")
                        .HasMaxLength(20)
                        .HasColumnType("int");

                    b.Property<string>("RollOrEmpNo")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int?>("SectionId")
                        .HasColumnType("int");

                    b.Property<string>("Specification")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Status")
                        .HasMaxLength(10)
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("UserID");

                    b.HasIndex("KlassId");

                    b.HasIndex("SectionId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserID = 1,
                            FirstName = "Super",
                            JoinDate = new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Admin",
                            PasswordHash = "$2a$11$VqEvgxu5duqlECfuVUMSzuOh6eiFvrHi8k7rCfsyXhWnPpuOE.1Ge",
                            PhoneNumber = "0001112222",
                            Role = 1,
                            RollOrEmpNo = "EMP1001",
                            Status = 2,
                            UpdatedAt = new DateTime(2024, 12, 20, 10, 37, 16, 729, DateTimeKind.Utc).AddTicks(1351),
                            Username = "superadmin"
                        },
                        new
                        {
                            UserID = 2,
                            FirstName = "System",
                            JoinDate = new DateTime(2023, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Administrator",
                            PasswordHash = "$2a$11$jGdDs9/0OXNLLEEST2bJYuS6ssk12Q.Q41xdiD3d4VpWyUuwq6j86",
                            PhoneNumber = "0001113333",
                            Role = 1,
                            RollOrEmpNo = "EMP1002",
                            Status = 2,
                            UpdatedAt = new DateTime(2024, 12, 20, 10, 37, 16, 935, DateTimeKind.Utc).AddTicks(9507),
                            Username = "sysadmin"
                        },
                        new
                        {
                            UserID = 3,
                            FirstName = "Head",
                            JoinDate = new DateTime(2023, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Admin",
                            PasswordHash = "$2a$11$W6MyGIadWhHmHhXwoTZfYeQaKI2RYp0pCFombfQ6xiGqwBHjpZxEm",
                            PhoneNumber = "0001114444",
                            Role = 1,
                            RollOrEmpNo = "EMP1003",
                            Status = 2,
                            UpdatedAt = new DateTime(2024, 12, 20, 10, 37, 17, 88, DateTimeKind.Utc).AddTicks(9756),
                            Username = "headadmin"
                        });
                });

            modelBuilder.Entity("api.Models.Competition", b =>
                {
                    b.HasOne("api.Models.User", "FirstPlace")
                        .WithMany()
                        .HasForeignKey("Winner1")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("api.Models.User", "SecondPlace")
                        .WithMany()
                        .HasForeignKey("Winner2")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("api.Models.User", "ThirdPlace")
                        .WithMany()
                        .HasForeignKey("Winner3")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("FirstPlace");

                    b.Navigation("SecondPlace");

                    b.Navigation("ThirdPlace");
                });

            modelBuilder.Entity("api.Models.Participation", b =>
                {
                    b.HasOne("api.Models.Survey", "Survey")
                        .WithMany("Participations")
                        .HasForeignKey("SurveyID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.User", "User")
                        .WithMany("Participations")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Survey");

                    b.Navigation("User");
                });

            modelBuilder.Entity("api.Models.RegistrationRequest", b =>
                {
                    b.HasOne("api.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("api.Models.Response", b =>
                {
                    b.HasOne("api.Models.SurveyOption", "Option")
                        .WithMany()
                        .HasForeignKey("OptionID");

                    b.HasOne("api.Models.Participation", "Participation")
                        .WithMany()
                        .HasForeignKey("ParticipationID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.SurveyQuestion", "Question")
                        .WithMany()
                        .HasForeignKey("QuestionID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Option");

                    b.Navigation("Participation");

                    b.Navigation("Question");
                });

            modelBuilder.Entity("api.Models.Seminar", b =>
                {
                    b.HasOne("api.Models.User", "Conductor")
                        .WithMany("SeminarsConducted")
                        .HasForeignKey("ConductedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Conductor");
                });

            modelBuilder.Entity("api.Models.Survey", b =>
                {
                    b.HasOne("api.Models.User", "Creator")
                        .WithMany("SurveysCreated")
                        .HasForeignKey("CreatedBy")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Creator");
                });

            modelBuilder.Entity("api.Models.SurveyOption", b =>
                {
                    b.HasOne("api.Models.SurveyQuestion", "Question")
                        .WithMany("Options")
                        .HasForeignKey("QuestionID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Question");
                });

            modelBuilder.Entity("api.Models.SurveyQuestion", b =>
                {
                    b.HasOne("api.Models.Survey", "Survey")
                        .WithMany("SurveyQuestions")
                        .HasForeignKey("SurveyID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Survey");
                });

            modelBuilder.Entity("api.Models.User", b =>
                {
                    b.HasOne("api.Models.Klass", "Klass")
                        .WithMany("Users")
                        .HasForeignKey("KlassId");

                    b.HasOne("api.Models.Section", "Section")
                        .WithMany("Users")
                        .HasForeignKey("SectionId");

                    b.Navigation("Klass");

                    b.Navigation("Section");
                });

            modelBuilder.Entity("api.Models.Klass", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("api.Models.Section", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("api.Models.Survey", b =>
                {
                    b.Navigation("Participations");

                    b.Navigation("SurveyQuestions");
                });

            modelBuilder.Entity("api.Models.SurveyQuestion", b =>
                {
                    b.Navigation("Options");
                });

            modelBuilder.Entity("api.Models.User", b =>
                {
                    b.Navigation("Participations");

                    b.Navigation("SeminarsConducted");

                    b.Navigation("SurveysCreated");
                });
#pragma warning restore 612, 618
        }
    }
}
