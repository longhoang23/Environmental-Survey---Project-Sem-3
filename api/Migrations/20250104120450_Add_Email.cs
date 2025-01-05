using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Add_Email : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Classes",
                columns: table => new
                {
                    KlassId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classes", x => x.KlassId);
                });

            migrationBuilder.CreateTable(
                name: "FAQs",
                columns: table => new
                {
                    FAQID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FAQs", x => x.FAQID);
                });

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    SectionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.SectionId);
                });

            migrationBuilder.CreateTable(
                name: "Supports",
                columns: table => new
                {
                    SupportID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContactInfo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supports", x => x.SupportID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(254)", maxLength: 254, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Role = table.Column<int>(type: "int", maxLength: 20, nullable: false),
                    RollOrEmpNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    KlassId = table.Column<int>(type: "int", nullable: true),
                    SectionId = table.Column<int>(type: "int", nullable: true),
                    Specification = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    AdmissionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    JoinDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<int>(type: "int", maxLength: 10, nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Users_Classes_KlassId",
                        column: x => x.KlassId,
                        principalTable: "Classes",
                        principalColumn: "KlassId");
                    table.ForeignKey(
                        name: "FK_Users_Sections_SectionId",
                        column: x => x.SectionId,
                        principalTable: "Sections",
                        principalColumn: "SectionId");
                });

            migrationBuilder.CreateTable(
                name: "Competitions",
                columns: table => new
                {
                    CompetitionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrizeDetails = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Winner1 = table.Column<int>(type: "int", nullable: true),
                    Winner2 = table.Column<int>(type: "int", nullable: true),
                    Winner3 = table.Column<int>(type: "int", nullable: true),
                    UserID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Competitions", x => x.CompetitionID);
                    table.ForeignKey(
                        name: "FK_Competitions_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                    table.ForeignKey(
                        name: "FK_Competitions_Users_Winner1",
                        column: x => x.Winner1,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Competitions_Users_Winner2",
                        column: x => x.Winner2,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Competitions_Users_Winner3",
                        column: x => x.Winner3,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RegistrationRequests",
                columns: table => new
                {
                    RegistrationRequestId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RollOrEmpNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClassId = table.Column<int>(type: "int", nullable: true),
                    SectionId = table.Column<int>(type: "int", nullable: true),
                    Specification = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdmissionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    JoinDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RequestedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationRequests", x => x.RegistrationRequestId);
                    table.ForeignKey(
                        name: "FK_RegistrationRequests_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Seminars",
                columns: table => new
                {
                    SeminarID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConductedBy = table.Column<int>(type: "int", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ParticipantsCount = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seminars", x => x.SeminarID);
                    table.ForeignKey(
                        name: "FK_Seminars_Users_ConductedBy",
                        column: x => x.ConductedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Surveys",
                columns: table => new
                {
                    SurveyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TargetAudience = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Surveys", x => x.SurveyID);
                    table.ForeignKey(
                        name: "FK_Surveys_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Participations",
                columns: table => new
                {
                    ParticipationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    SurveyID = table.Column<int>(type: "int", nullable: false),
                    ParticipationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalScore = table.Column<int>(type: "int", nullable: true),
                    Feedback = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participations", x => x.ParticipationID);
                    table.ForeignKey(
                        name: "FK_Participations_Surveys_SurveyID",
                        column: x => x.SurveyID,
                        principalTable: "Surveys",
                        principalColumn: "SurveyID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Participations_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SurveyQuestions",
                columns: table => new
                {
                    QuestionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SurveyID = table.Column<int>(type: "int", nullable: false),
                    QuestionText = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    QuestionType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyQuestions", x => x.QuestionID);
                    table.ForeignKey(
                        name: "FK_SurveyQuestions_Surveys_SurveyID",
                        column: x => x.SurveyID,
                        principalTable: "Surveys",
                        principalColumn: "SurveyID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurveyOptions",
                columns: table => new
                {
                    OptionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionID = table.Column<int>(type: "int", nullable: false),
                    OptionText = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyOptions", x => x.OptionID);
                    table.ForeignKey(
                        name: "FK_SurveyOptions_SurveyQuestions_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "SurveyQuestions",
                        principalColumn: "QuestionID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Responses",
                columns: table => new
                {
                    ResponseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParticipationID = table.Column<int>(type: "int", nullable: false),
                    QuestionID = table.Column<int>(type: "int", nullable: false),
                    OptionID = table.Column<int>(type: "int", nullable: true),
                    ResponseText = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Responses", x => x.ResponseID);
                    table.ForeignKey(
                        name: "FK_Responses_Participations_ParticipationID",
                        column: x => x.ParticipationID,
                        principalTable: "Participations",
                        principalColumn: "ParticipationID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Responses_SurveyOptions_OptionID",
                        column: x => x.OptionID,
                        principalTable: "SurveyOptions",
                        principalColumn: "OptionID");
                    table.ForeignKey(
                        name: "FK_Responses_SurveyQuestions_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "SurveyQuestions",
                        principalColumn: "QuestionID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Classes",
                columns: new[] { "KlassId", "Name" },
                values: new object[,]
                {
                    { 1, "C2304L" },
                    { 2, "C2222L" },
                    { 3, "C1234X" }
                });

            migrationBuilder.InsertData(
                table: "Sections",
                columns: new[] { "SectionId", "Name" },
                values: new object[,]
                {
                    { 1, "Section A" },
                    { 2, "Section B" },
                    { 3, "Section C" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "AdmissionDate", "Email", "FirstName", "JoinDate", "KlassId", "LastName", "PasswordHash", "PhoneNumber", "Role", "RollOrEmpNo", "SectionId", "Specification", "Status", "UpdatedAt", "Username" },
                values: new object[,]
                {
                    { 1, null, "super.admin@example.com", "Super", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Admin", "$2a$11$Otd/mOPA6cHEcxQyqDDk8eketXcA4uX6Jog5J4b7nLt/yRNxktQS6", "0001112222", 1, "EMP1001", null, null, 2, new DateTime(2025, 1, 4, 12, 4, 48, 878, DateTimeKind.Utc).AddTicks(4982), "superadmin" },
                    { 2, null, "system.admin@example.com", "System", new DateTime(2023, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Administrator", "$2a$11$H5vFipjhAY393uRrtvpUEeqeCE7kPGiQMxXhaO3/rPw5fUcgH5qJm", "0001113333", 1, "EMP1002", null, null, 2, new DateTime(2025, 1, 4, 12, 4, 49, 0, DateTimeKind.Utc).AddTicks(1189), "sysadmin" },
                    { 3, null, "head.admin@example.com", "Head", new DateTime(2023, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Admin", "$2a$11$Nehxf/UFYuieVbz3C88hkOjy6dpAqY3lcjS6QvDdCYHy5icEslaLm", "0001114444", 1, "EMP1003", null, null, 2, new DateTime(2025, 1, 4, 12, 4, 49, 115, DateTimeKind.Utc).AddTicks(4029), "headadmin" },
                    { 101, new DateTime(2023, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "john.doe@example.com", "John", null, 1, "Doe", "$2a$11$FQMyxjLy.VQge5.OYWqlb.zcVAqvSm7nei71vf7OfZrs5vW9ix1rC", "1234567890", 3, "student111111", null, "Computer Science", 0, new DateTime(2025, 1, 4, 12, 4, 49, 115, DateTimeKind.Utc).AddTicks(4507), "john.doe" },
                    { 102, new DateTime(2023, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "jane.smith@example.com", "Jane", null, 1, "Smith", "$2a$11$YUzIp0dZddbMpraZkDveXOSoce9BqE/.ZVvq1.S3uo6OMSQnBFPKW", "9876543210", 3, "student123456", null, "Mathematics", 0, new DateTime(2025, 1, 4, 12, 4, 49, 234, DateTimeKind.Utc).AddTicks(3872), "jane.smith" },
                    { 103, new DateTime(2023, 3, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "alice.johnson@example.com", "Alice", null, 2, "Johnson", "$2a$11$mtQtTAVz14nATIfxz8uP3OTSVrRRXcECdSD./CGeKdaRZO0iaPFaG", "4567891230", 3, "student135790", null, "Physics", 0, new DateTime(2025, 1, 4, 12, 4, 49, 353, DateTimeKind.Utc).AddTicks(6573), "alice.johnson" },
                    { 104, new DateTime(2023, 4, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "bob.brown@example.com", "Bob", null, 2, "Brown", "$2a$11$jWo2cAQq8K1fj00h1HQBJukFRKX1agtWZ2/kxBYi04e8UkqY.QJSa", "3216549870", 3, "student987654", null, "Chemistry", 0, new DateTime(2025, 1, 4, 12, 4, 49, 468, DateTimeKind.Utc).AddTicks(4494), "bob.brown" },
                    { 105, new DateTime(2023, 5, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "charlie.white@example.com", "Charlie", null, 3, "White", "$2a$11$rAXsQKpEODLuihun7XcAIuBJpJVQ2W/jh7vP4wAHdqRW4AhtLfoCW", "6543217890", 3, "student234567", null, "Biology", 0, new DateTime(2025, 1, 4, 12, 4, 49, 583, DateTimeKind.Utc).AddTicks(2293), "charlie.white" },
                    { 201, null, "alice.brown@example.com", "Alice", new DateTime(2022, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Brown", "$2a$11$oLuTkV1GAIXj8GOBZ6ksH.faqs3F.f/Udsmz89RqH1SeAB8P.E3lS", "1122334455", 2, "STAFF001", 1, "IT Support", 2, new DateTime(2025, 1, 4, 12, 4, 49, 702, DateTimeKind.Utc).AddTicks(2363), "alice.brown" },
                    { 202, null, "bob.johnson@example.com", "Bob", new DateTime(2022, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Johnson", "$2a$11$KyWYC2gmpBLayKE.nU8e4OM5v2oUywGzxMl.Rsp0uojXdBH14HyRe", "2233445566", 2, "STAFF002", 2, "Library Manager", 2, new DateTime(2025, 1, 4, 12, 4, 49, 817, DateTimeKind.Utc).AddTicks(3644), "bob.johnson" },
                    { 203, null, "charlie.smith@example.com", "Charlie", new DateTime(2022, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Smith", "$2a$11$cxVfecFwMf53VQlxQv1Ncu/pWxvYo1C/opPwNL3Bzu9DU/tJ5QB3y", "3344556677", 2, "STAFF003", 3, "Accounts Manager", 2, new DateTime(2025, 1, 4, 12, 4, 49, 932, DateTimeKind.Utc).AddTicks(9105), "charlie.smith" },
                    { 204, null, "diana.white@example.com", "Diana", new DateTime(2022, 4, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "White", "$2a$11$uDAMVZloocjAr0Zdy5QOU.o2e3LPx6jM75NtOC60yeMa2eBTG9j/y", "4455667788", 2, "STAFF004", 1, "HR Specialist", 2, new DateTime(2025, 1, 4, 12, 4, 50, 46, DateTimeKind.Utc).AddTicks(6171), "diana.white" },
                    { 205, null, "evan.green@example.com", "Evan", new DateTime(2022, 5, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Green", "$2a$11$yzc7YldiztxZqP1O/PZveueUhg9CctA8/C.zlVTqASU1/JxxVs11C", "5566778899", 2, "STAFF005", 2, "Security Officer", 2, new DateTime(2025, 1, 4, 12, 4, 50, 163, DateTimeKind.Utc).AddTicks(4383), "evan.green" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Competitions_UserID",
                table: "Competitions",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Competitions_Winner1",
                table: "Competitions",
                column: "Winner1");

            migrationBuilder.CreateIndex(
                name: "IX_Competitions_Winner2",
                table: "Competitions",
                column: "Winner2");

            migrationBuilder.CreateIndex(
                name: "IX_Competitions_Winner3",
                table: "Competitions",
                column: "Winner3");

            migrationBuilder.CreateIndex(
                name: "IX_Participations_SurveyID",
                table: "Participations",
                column: "SurveyID");

            migrationBuilder.CreateIndex(
                name: "IX_Participations_UserID",
                table: "Participations",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationRequests_UserId",
                table: "RegistrationRequests",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Responses_OptionID",
                table: "Responses",
                column: "OptionID");

            migrationBuilder.CreateIndex(
                name: "IX_Responses_ParticipationID",
                table: "Responses",
                column: "ParticipationID");

            migrationBuilder.CreateIndex(
                name: "IX_Responses_QuestionID",
                table: "Responses",
                column: "QuestionID");

            migrationBuilder.CreateIndex(
                name: "IX_Seminars_ConductedBy",
                table: "Seminars",
                column: "ConductedBy");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyOptions_QuestionID",
                table: "SurveyOptions",
                column: "QuestionID");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyQuestions_SurveyID",
                table: "SurveyQuestions",
                column: "SurveyID");

            migrationBuilder.CreateIndex(
                name: "IX_Surveys_CreatedBy",
                table: "Surveys",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Users_KlassId",
                table: "Users",
                column: "KlassId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SectionId",
                table: "Users",
                column: "SectionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Competitions");

            migrationBuilder.DropTable(
                name: "FAQs");

            migrationBuilder.DropTable(
                name: "RegistrationRequests");

            migrationBuilder.DropTable(
                name: "Responses");

            migrationBuilder.DropTable(
                name: "Seminars");

            migrationBuilder.DropTable(
                name: "Supports");

            migrationBuilder.DropTable(
                name: "Participations");

            migrationBuilder.DropTable(
                name: "SurveyOptions");

            migrationBuilder.DropTable(
                name: "SurveyQuestions");

            migrationBuilder.DropTable(
                name: "Surveys");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Classes");

            migrationBuilder.DropTable(
                name: "Sections");
        }
    }
}
