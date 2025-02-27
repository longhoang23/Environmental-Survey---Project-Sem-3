using System.Text;
using System.Text.Json.Serialization;
using api.Data;
using api.Repositories.Admin;
using api.Repositories.Class;
using api.Repositories.Competitions;
using api.Repositories.Section;
using api.Repositories.Seminar;
using api.Repositories.Staff;
using api.Repositories.Student;
using api.Repositories.Participations;
using api.Repositories.Responses;
using api.Repositories.SurveyRepo;
using api.Repositories.SurveyOptionRepo;
using api.Repositories.SurveyQuestionRepo;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using api.Repositories.FaqRepo;
using api.Repositories.Supports;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
}).AddJsonOptions(options =>
    {
        // Serialize enums as strings
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddDbContext<ApplicationDbContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IKlassRepository, KlassRepository>();
builder.Services.AddScoped<ISectionRepository, SectionRepository>();
builder.Services.AddScoped<IStaffRepository, StaffRepository>();
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<ISeminarRepository, SeminarRepository>();
builder.Services.AddScoped<ICompetitionRepository,CompetitionRepository>();
builder.Services.AddScoped<IParticipationRepository, ParticipationRepository>();
builder.Services.AddScoped<IResponseRepository, ResponseRepository>();


builder.Services.AddScoped<ISurveyRepository,SurveyRepository>();
builder.Services.AddScoped<ISurveyOptionRepository,SurveyOptionRepository>();
builder.Services.AddScoped<ISurveyQuestionRepository,SurveyQuestionRepository>();

builder.Services.AddScoped<IFaqRepository,FaqRepository>();
builder.Services.AddScoped<ISupportRepository, SupportRepository>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Replace with allowed origin(s)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters  
    {  
        ValidateIssuer = true,  
        ValidateAudience = true,  
        ValidateLifetime = true,  
        ValidateIssuerSigningKey = true,  
        ValidIssuer = builder.Configuration["Jwt:Issuer"],  
        ValidAudience = builder.Configuration["Jwt:Audience"],  
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))  
    };
});


var app = builder.Build();

//If you use database.sql to create database then you'll need this. Though it most definately won't work.
Console.WriteLine(BCrypt.Net.BCrypt.HashPassword("Admin123"));  // For the admin
Console.WriteLine(BCrypt.Net.BCrypt.HashPassword("Staff123")); // For the staff
Console.WriteLine(BCrypt.Net.BCrypt.HashPassword("Student123")); // For the student

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigins");
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();


app.Run();

