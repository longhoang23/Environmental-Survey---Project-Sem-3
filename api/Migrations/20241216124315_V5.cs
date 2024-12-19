using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class V5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "AdmissionDate", "FirstName", "JoinDate", "KlassId", "LastName", "PasswordHash", "PhoneNumber", "Role", "RollOrEmpNo", "SectionId", "Specification", "Status", "UpdatedAt", "Username" },
                values: new object[,]
                {
                    { 1, null, "Super", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Admin", "$2a$11$dm/2E0Bj1QgwMs6k6GYTeO3X6VwTNoDCyuOU0oF3EDkSCdhfEJeEG", "0001112222", 1, "EMP1001", null, null, 2, new DateTime(2024, 12, 16, 12, 43, 14, 568, DateTimeKind.Utc).AddTicks(6943), "superadmin" },
                    { 2, null, "System", new DateTime(2023, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Administrator", "$2a$11$NEcS9XH3XkQlhzXu.L4gWugbiuABWKysL5LmWo4AxbbUO03hoPFUK", "0001113333", 1, "EMP1002", null, null, 2, new DateTime(2024, 12, 16, 12, 43, 14, 777, DateTimeKind.Utc).AddTicks(2433), "sysadmin" },
                    { 3, null, "Head", new DateTime(2023, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Admin", "$2a$11$O.zGAIvZyJxf91rlom64ZecEDmP0xQsBpxhml9TOwjQykno0EFJju", "0001114444", 1, "EMP1003", null, null, 2, new DateTime(2024, 12, 16, 12, 43, 14, 930, DateTimeKind.Utc).AddTicks(9841), "headadmin" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 3);
        }
    }
}
