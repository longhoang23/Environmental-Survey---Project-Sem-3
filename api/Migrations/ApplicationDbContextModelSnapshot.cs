﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.HasData(
                        new
                        {
                            KlassId = 1,
                            Name = "C2304L"
                        },
                        new
                        {
                            KlassId = 2,
                            Name = "C2222L"
                        },
                        new
                        {
                            KlassId = 3,
                            Name = "C1234X"
                        });
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

                    b.HasData(
                        new
                        {
                            SectionId = 1,
                            Name = "Section A"
                        },
                        new
                        {
                            SectionId = 2,
                            Name = "Section B"
                        },
                        new
                        {
                            SectionId = 3,
                            Name = "Section C"
                        });
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
                            PasswordHash = "$2a$11$hOHZqXXEuTmGK7l1T1llDevmx7ZJKUF4v1/jzesVIMRo6CG2qOnLS",
                            PhoneNumber = "0001112222",
                            Role = 1,
                            RollOrEmpNo = "EMP1001",
                            Status = 2,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 49, 368, DateTimeKind.Utc).AddTicks(8522),
                            Username = "superadmin"
                        },
                        new
                        {
                            UserID = 2,
                            FirstName = "System",
                            JoinDate = new DateTime(2023, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Administrator",
                            PasswordHash = "$2a$11$sm63MFKeRZsndy/WfXpH2OAlrW9mZvBdKkcO1gmnEjEDtak8Bn5Si",
                            PhoneNumber = "0001113333",
                            Role = 1,
                            RollOrEmpNo = "EMP1002",
                            Status = 2,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 49, 483, DateTimeKind.Utc).AddTicks(9063),
                            Username = "sysadmin"
                        },
                        new
                        {
                            UserID = 3,
                            FirstName = "Head",
                            JoinDate = new DateTime(2023, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Admin",
                            PasswordHash = "$2a$11$kSE1OW3kI10Rf9anmdzgOubcA7i7X2htKeuMNRxZOwPbnfkh4iUTW",
                            PhoneNumber = "0001114444",
                            Role = 1,
                            RollOrEmpNo = "EMP1003",
                            Status = 2,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 49, 601, DateTimeKind.Utc).AddTicks(3928),
                            Username = "headadmin"
                        },
                        new
                        {
                            UserID = 101,
                            AdmissionDate = new DateTime(2023, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            FirstName = "John",
                            KlassId = 1,
                            LastName = "Doe",
                            PasswordHash = "$2a$11$B67Pi3ZfDFMVZpep3ncSrOq.J7oNi1SkbkqEvGmBvJv1ymgrUSxIO",
                            PhoneNumber = "1234567890",
                            Role = 3,
                            RollOrEmpNo = "student111111",
                            Specification = "Computer Science",
                            Status = 0,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 49, 601, DateTimeKind.Utc).AddTicks(4357),
                            Username = "john.doe"
                        },
                        new
                        {
                            UserID = 102,
                            AdmissionDate = new DateTime(2023, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            FirstName = "Jane",
                            KlassId = 1,
                            LastName = "Smith",
                            PasswordHash = "$2a$11$sEJWpOnrfocEUNF4lddNqudzq/mfKnVYvD2qfhPFJ4I8CEWublEeG",
                            PhoneNumber = "9876543210",
                            Role = 3,
                            RollOrEmpNo = "student123456",
                            Specification = "Mathematics",
                            Status = 0,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 49, 714, DateTimeKind.Utc).AddTicks(1359),
                            Username = "jane.smith"
                        },
                        new
                        {
                            UserID = 103,
                            AdmissionDate = new DateTime(2023, 3, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            FirstName = "Alice",
                            KlassId = 2,
                            LastName = "Johnson",
                            PasswordHash = "$2a$11$9t0U998BgdOeKwsu2k95Z.Zp059oP5120o4x2ivhHlDOFMUYPumyK",
                            PhoneNumber = "4567891230",
                            Role = 3,
                            RollOrEmpNo = "student135790",
                            Specification = "Physics",
                            Status = 0,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 49, 824, DateTimeKind.Utc).AddTicks(1160),
                            Username = "alice.johnson"
                        },
                        new
                        {
                            UserID = 104,
                            AdmissionDate = new DateTime(2023, 4, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            FirstName = "Bob",
                            KlassId = 2,
                            LastName = "Brown",
                            PasswordHash = "$2a$11$6DUl1iI8KMX27BlG/t2KkuZka8pEd0VnkreET8omuYdnkGN.jAUmm",
                            PhoneNumber = "3216549870",
                            Role = 3,
                            RollOrEmpNo = "student987654",
                            Specification = "Chemistry",
                            Status = 0,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 49, 935, DateTimeKind.Utc).AddTicks(9346),
                            Username = "bob.brown"
                        },
                        new
                        {
                            UserID = 105,
                            AdmissionDate = new DateTime(2023, 5, 30, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            FirstName = "Charlie",
                            KlassId = 3,
                            LastName = "White",
                            PasswordHash = "$2a$11$p1GvbMy7AWY4UrCav5lf/egR16LjNXqklzYzV91fdS0jpEfZiBFpy",
                            PhoneNumber = "6543217890",
                            Role = 3,
                            RollOrEmpNo = "student234567",
                            Specification = "Biology",
                            Status = 0,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 50, 49, DateTimeKind.Utc).AddTicks(1741),
                            Username = "charlie.white"
                        },
                        new
                        {
                            UserID = 201,
                            FirstName = "Alice",
                            JoinDate = new DateTime(2022, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Brown",
                            PasswordHash = "$2a$11$QUk.thszu8CUEgcnh7kq5uJGbz3o4CSq6VPVXnd8l.Q19og.FLySC",
                            PhoneNumber = "1122334455",
                            Role = 2,
                            RollOrEmpNo = "STAFF001",
                            SectionId = 1,
                            Specification = "IT Support",
                            Status = 2,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 50, 164, DateTimeKind.Utc).AddTicks(8289),
                            Username = "alice.brown"
                        },
                        new
                        {
                            UserID = 202,
                            FirstName = "Bob",
                            JoinDate = new DateTime(2022, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Johnson",
                            PasswordHash = "$2a$11$UevVWVj40yiaP6uIJp8sA.IOv9rN4Va4oKbEgbBThVNmR3NQR4KY2",
                            PhoneNumber = "2233445566",
                            Role = 2,
                            RollOrEmpNo = "STAFF002",
                            SectionId = 2,
                            Specification = "Library Manager",
                            Status = 2,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 50, 277, DateTimeKind.Utc).AddTicks(793),
                            Username = "bob.johnson"
                        },
                        new
                        {
                            UserID = 203,
                            FirstName = "Charlie",
                            JoinDate = new DateTime(2022, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Smith",
                            PasswordHash = "$2a$11$o.9WY8ORe7fwKlj.XjrL0OoEuU8VQfWvJ9K9TIiquPDVGMEUs6JPS",
                            PhoneNumber = "3344556677",
                            Role = 2,
                            RollOrEmpNo = "STAFF003",
                            SectionId = 3,
                            Specification = "Accounts Manager",
                            Status = 2,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 50, 386, DateTimeKind.Utc).AddTicks(7637),
                            Username = "charlie.smith"
                        },
                        new
                        {
                            UserID = 204,
                            FirstName = "Diana",
                            JoinDate = new DateTime(2022, 4, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "White",
                            PasswordHash = "$2a$11$n330vUykNmzH.y/VsuN/9.IxJuxVMP/qnKzAGcN30xOEuOyGTo126",
                            PhoneNumber = "4455667788",
                            Role = 2,
                            RollOrEmpNo = "STAFF004",
                            SectionId = 1,
                            Specification = "HR Specialist",
                            Status = 2,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 50, 496, DateTimeKind.Utc).AddTicks(9216),
                            Username = "diana.white"
                        },
                        new
                        {
                            UserID = 205,
                            FirstName = "Evan",
                            JoinDate = new DateTime(2022, 5, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Green",
                            PasswordHash = "$2a$11$pJJx09hD/Op28V3HIkheQ.F1AV/i.1saulxDprB7VvD6qI2uY3/aW",
                            PhoneNumber = "5566778899",
                            Role = 2,
                            RollOrEmpNo = "STAFF005",
                            SectionId = 2,
                            Specification = "Security Officer",
                            Status = 2,
                            UpdatedAt = new DateTime(2024, 12, 27, 11, 1, 50, 607, DateTimeKind.Utc).AddTicks(1499),
                            Username = "evan.green"
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
                        .WithMany("RegistrationRequests")
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

                    b.Navigation("RegistrationRequests");

                    b.Navigation("SeminarsConducted");

                    b.Navigation("SurveysCreated");
                });
#pragma warning restore 612, 618
        }
    }
}
