using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Fag : Migration
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
                values: new object[] { "$2a$11$hOHZqXXEuTmGK7l1T1llDevmx7ZJKUF4v1/jzesVIMRo6CG2qOnLS", new DateTime(2024, 12, 27, 11, 1, 49, 368, DateTimeKind.Utc).AddTicks(8522) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 2,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$sm63MFKeRZsndy/WfXpH2OAlrW9mZvBdKkcO1gmnEjEDtak8Bn5Si", new DateTime(2024, 12, 27, 11, 1, 49, 483, DateTimeKind.Utc).AddTicks(9063) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 3,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$kSE1OW3kI10Rf9anmdzgOubcA7i7X2htKeuMNRxZOwPbnfkh4iUTW", new DateTime(2024, 12, 27, 11, 1, 49, 601, DateTimeKind.Utc).AddTicks(3928) });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "AdmissionDate", "FirstName", "JoinDate", "KlassId", "LastName", "PasswordHash", "PhoneNumber", "Role", "RollOrEmpNo", "SectionId", "Specification", "Status", "UpdatedAt", "Username" },
                values: new object[,]
                {
                    { 101, new DateTime(2023, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "John", null, 1, "Doe", "$2a$11$B67Pi3ZfDFMVZpep3ncSrOq.J7oNi1SkbkqEvGmBvJv1ymgrUSxIO", "1234567890", 3, "student111111", null, "Computer Science", 0, new DateTime(2024, 12, 27, 11, 1, 49, 601, DateTimeKind.Utc).AddTicks(4357), "john.doe" },
                    { 102, new DateTime(2023, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Jane", null, 1, "Smith", "$2a$11$sEJWpOnrfocEUNF4lddNqudzq/mfKnVYvD2qfhPFJ4I8CEWublEeG", "9876543210", 3, "student123456", null, "Mathematics", 0, new DateTime(2024, 12, 27, 11, 1, 49, 714, DateTimeKind.Utc).AddTicks(1359), "jane.smith" },
                    { 103, new DateTime(2023, 3, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Alice", null, 2, "Johnson", "$2a$11$9t0U998BgdOeKwsu2k95Z.Zp059oP5120o4x2ivhHlDOFMUYPumyK", "4567891230", 3, "student135790", null, "Physics", 0, new DateTime(2024, 12, 27, 11, 1, 49, 824, DateTimeKind.Utc).AddTicks(1160), "alice.johnson" },
                    { 104, new DateTime(2023, 4, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Bob", null, 2, "Brown", "$2a$11$6DUl1iI8KMX27BlG/t2KkuZka8pEd0VnkreET8omuYdnkGN.jAUmm", "3216549870", 3, "student987654", null, "Chemistry", 0, new DateTime(2024, 12, 27, 11, 1, 49, 935, DateTimeKind.Utc).AddTicks(9346), "bob.brown" },
                    { 105, new DateTime(2023, 5, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "Charlie", null, 3, "White", "$2a$11$p1GvbMy7AWY4UrCav5lf/egR16LjNXqklzYzV91fdS0jpEfZiBFpy", "6543217890", 3, "student234567", null, "Biology", 0, new DateTime(2024, 12, 27, 11, 1, 50, 49, DateTimeKind.Utc).AddTicks(1741), "charlie.white" },
                    { 201, null, "Alice", new DateTime(2022, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Brown", "$2a$11$QUk.thszu8CUEgcnh7kq5uJGbz3o4CSq6VPVXnd8l.Q19og.FLySC", "1122334455", 2, "STAFF001", 1, "IT Support", 2, new DateTime(2024, 12, 27, 11, 1, 50, 164, DateTimeKind.Utc).AddTicks(8289), "alice.brown" },
                    { 202, null, "Bob", new DateTime(2022, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Johnson", "$2a$11$UevVWVj40yiaP6uIJp8sA.IOv9rN4Va4oKbEgbBThVNmR3NQR4KY2", "2233445566", 2, "STAFF002", 2, "Library Manager", 2, new DateTime(2024, 12, 27, 11, 1, 50, 277, DateTimeKind.Utc).AddTicks(793), "bob.johnson" },
                    { 203, null, "Charlie", new DateTime(2022, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Smith", "$2a$11$o.9WY8ORe7fwKlj.XjrL0OoEuU8VQfWvJ9K9TIiquPDVGMEUs6JPS", "3344556677", 2, "STAFF003", 3, "Accounts Manager", 2, new DateTime(2024, 12, 27, 11, 1, 50, 386, DateTimeKind.Utc).AddTicks(7637), "charlie.smith" },
                    { 204, null, "Diana", new DateTime(2022, 4, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "White", "$2a$11$n330vUykNmzH.y/VsuN/9.IxJuxVMP/qnKzAGcN30xOEuOyGTo126", "4455667788", 2, "STAFF004", 1, "HR Specialist", 2, new DateTime(2024, 12, 27, 11, 1, 50, 496, DateTimeKind.Utc).AddTicks(9216), "diana.white" },
                    { 205, null, "Evan", new DateTime(2022, 5, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Green", "$2a$11$pJJx09hD/Op28V3HIkheQ.F1AV/i.1saulxDprB7VvD6qI2uY3/aW", "5566778899", 2, "STAFF005", 2, "Security Officer", 2, new DateTime(2024, 12, 27, 11, 1, 50, 607, DateTimeKind.Utc).AddTicks(1499), "evan.green" }
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
