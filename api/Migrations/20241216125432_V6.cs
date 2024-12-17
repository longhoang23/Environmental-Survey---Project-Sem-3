using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class V6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 1,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$tN8y/b.mEo7F.QZxHLq7sucu3YfjyyjERF3HWm7gNnAuxaO71Tg5a", new DateTime(2024, 12, 16, 12, 54, 31, 356, DateTimeKind.Utc).AddTicks(1469) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 2,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$yJcKVQ68M1nU1bbryWmsyutJc1ExwEILJxATjaeasBds96DY1sZai", new DateTime(2024, 12, 16, 12, 54, 31, 524, DateTimeKind.Utc).AddTicks(8636) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 3,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$x3sE8b4asUCgdHgoqcKXS.BfORZ26RwMJ2hwaNGUvtvG8WDEPYRcm", new DateTime(2024, 12, 16, 12, 54, 31, 692, DateTimeKind.Utc).AddTicks(1321) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 1,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$dm/2E0Bj1QgwMs6k6GYTeO3X6VwTNoDCyuOU0oF3EDkSCdhfEJeEG", new DateTime(2024, 12, 16, 12, 43, 14, 568, DateTimeKind.Utc).AddTicks(6943) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 2,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$NEcS9XH3XkQlhzXu.L4gWugbiuABWKysL5LmWo4AxbbUO03hoPFUK", new DateTime(2024, 12, 16, 12, 43, 14, 777, DateTimeKind.Utc).AddTicks(2433) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 3,
                columns: new[] { "PasswordHash", "UpdatedAt" },
                values: new object[] { "$2a$11$O.zGAIvZyJxf91rlom64ZecEDmP0xQsBpxhml9TOwjQykno0EFJju", new DateTime(2024, 12, 16, 12, 43, 14, 930, DateTimeKind.Utc).AddTicks(9841) });
        }
    }
}
