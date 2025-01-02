using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Seeddata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 1,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$akR/WajflyYs8NwpVOxP..nuHeSnteK.UlrRKosW6EceSPr3gUBlC", new DateTime(2024, 12, 21, 8, 19, 51, 594, DateTimeKind.Utc).AddTicks(3387) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 2,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$GtCIcOpkQCDPRRxJ4.mLVeNpc5stBGsAVZmL58FbDeFB/BAA53XLa", new DateTime(2024, 12, 21, 8, 19, 51, 708, DateTimeKind.Utc).AddTicks(7081) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 3,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$BHgC2XYQ6bsnc39U0DGiLufjd888DMCAxMEL7InoUlqRb6oSc0uNG", new DateTime(2024, 12, 21, 8, 19, 51, 828, DateTimeKind.Utc).AddTicks(2406) });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "AdmissionDate", "FirstName", "JoinDate", "KlassId", "LastName", "PasswordHash", "PhoneNumber", "Role", "RollOrEmpNo", "SectionId", "Specification", "Status", "UpdatedAt", "Username" },
                values: new object[,]
                {
                    { 101, new DateTime(2023, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "John", null, 1, "Doe", "$2a$11$SiGKXboBY0gkKR/mPKDRR.lrd/uKbRqH3Wk1tcVEXlwMJ6EE3D5WO", "1234567890", 3, "student111111", null, "Computer Science", 0, new DateTime(2024, 12, 21, 8, 19, 51, 828, DateTimeKind.Utc).AddTicks(2938), "john.doe" },
                    { 102, new DateTime(2023, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Jane", null, 1, "Smith", "$2a$11$rUPRfDSOuDBMmJH9giHAdeAIb3vohTGIDjtdOvX0idp4klfx5wAE6", "9876543210", 3, "student123456", null, "Mathematics", 0, new DateTime(2024, 12, 21, 8, 19, 51, 943, DateTimeKind.Utc).AddTicks(411), "jane.smith" },
                    { 103, new DateTime(2023, 3, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Alice", null, 2, "Johnson", "$2a$11$3BmIUE9U0CGfW/ss6hQNCOGva6cC1ivm4OwtdSqRDpKpWDIiAMhE6", "4567891230", 3, "student135790", null, "Physics", 0, new DateTime(2024, 12, 21, 8, 19, 52, 55, DateTimeKind.Utc).AddTicks(2960), "alice.johnson" },
                    { 104, new DateTime(2023, 4, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Bob", null, 2, "Brown", "$2a$11$KF6xkhGUU06VnHfQMUIzguREs6bQFuYsmU/mozTXAwxAzy5nSVtbq", "3216549870", 3, "student987654", null, "Chemistry", 0, new DateTime(2024, 12, 21, 8, 19, 52, 168, DateTimeKind.Utc).AddTicks(2009), "bob.brown" },
                    { 105, new DateTime(2023, 5, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "Charlie", null, 3, "White", "$2a$11$/1yOPYZ0ut02pjO8cue/9OpCm21h/CUmcErupPctmp1EfuQr040me", "6543217890", 3, "student234567", null, "Biology", 0, new DateTime(2024, 12, 21, 8, 19, 52, 278, DateTimeKind.Utc).AddTicks(4150), "charlie.white" },
                    { 201, null, "Alice", new DateTime(2022, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Brown", "$2a$11$k7WzPkQEQW50NqEHOlUEH.g/0Y44lhkBwSb8hdlnmWAaxbz9whCEC", "1122334455", 2, "STAFF001", 1, "IT Support", 2, new DateTime(2024, 12, 21, 8, 19, 52, 387, DateTimeKind.Utc).AddTicks(8333), "alice.brown" },
                    { 202, null, "Bob", new DateTime(2022, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Johnson", "$2a$11$oTUCFOdGEmlYJSz2kx7I1Oc1s9N5gTxGaB1CSIH9.A52t410cwa1C", "2233445566", 2, "STAFF002", 2, "Library Manager", 2, new DateTime(2024, 12, 21, 8, 19, 52, 498, DateTimeKind.Utc).AddTicks(187), "bob.johnson" },
                    { 203, null, "Charlie", new DateTime(2022, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Smith", "$2a$11$iQDsOsQ1BBINdr8DBdo6tubMnNjEvy5fpMyXpOglHMYP5VNjy6UlW", "3344556677", 2, "STAFF003", 3, "Accounts Manager", 1, new DateTime(2024, 12, 21, 8, 19, 52, 610, DateTimeKind.Utc).AddTicks(2736), "charlie.smith" },
                    { 204, null, "Diana", new DateTime(2022, 4, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "White", "$2a$11$BLHh5/fGtSN1235ZIrpuoeFAHx7MypT7XD2OVmwqWC.TAZBRJpCvK", "4455667788", 2, "STAFF004", 1, "HR Specialist", 2, new DateTime(2024, 12, 21, 8, 19, 52, 720, DateTimeKind.Utc).AddTicks(2938), "diana.white" },
                    { 205, null, "Evan", new DateTime(2022, 5, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Green", "$2a$11$TLl8Oj4nqBvLjZ.O2OTJIOyuluBFKGcwg6ze3d4VUGitUVYNf3bP6", "5566778899", 2, "STAFF005", 2, "Security Officer", 3, new DateTime(2024, 12, 21, 8, 19, 52, 830, DateTimeKind.Utc).AddTicks(531), "evan.green" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 101);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 102);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 103);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 104);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 105);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 201);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 202);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 203);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 204);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 205);

            migrationBuilder.DeleteData(
                table: "Classes",
                keyColumn: "KlassId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Classes",
                keyColumn: "KlassId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Classes",
                keyColumn: "KlassId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Sections",
                keyColumn: "SectionId",
                keyValue: 3);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 1,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$VqEvgxu5duqlECfuVUMSzuOh6eiFvrHi8k7rCfsyXhWnPpuOE.1Ge", new DateTime(2024, 12, 20, 10, 37, 16, 729, DateTimeKind.Utc).AddTicks(1351) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 2,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$jGdDs9/0OXNLLEEST2bJYuS6ssk12Q.Q41xdiD3d4VpWyUuwq6j86", new DateTime(2024, 12, 20, 10, 37, 16, 935, DateTimeKind.Utc).AddTicks(9507) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 3,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$W6MyGIadWhHmHhXwoTZfYeQaKI2RYp0pCFombfQ6xiGqwBHjpZxEm", new DateTime(2024, 12, 20, 10, 37, 17, 88, DateTimeKind.Utc).AddTicks(9756) });
        }
    }
}
