using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Survey;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.SurveyRepo
{
    public interface ISurveyRepository{
        Task<IEnumerable<SurveyDTO>> GetAllAsync();
        Task<SurveyDTO?> GetByIdAsync(int id);
        Task AddAsync(SurveyDTO surveyDto);
        Task UpdateAsync(int id, SurveyDTO updatedSurveyDto);
        Task DeleteAsync(int id);
    } 

    public class SurveyRepository : ISurveyRepository
    {
        private readonly ApplicationDbContext _context;

        public SurveyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SurveyDTO>> GetAllAsync()
        {
            var surveys = await _context.Surveys
                .Include(s => s.SurveyQuestions)
                .Include(s => s.Participations)
                .ToListAsync();

            return surveys.Select(s => s.ToSurveyDTO());
        }

        public async Task<SurveyDTO?> GetByIdAsync(int id)
        {
            var survey = await _context.Surveys
                .Include(s => s.SurveyQuestions)
                .Include(s => s.Participations)
                .FirstOrDefaultAsync(s => s.SurveyID == id);

            return survey?.ToSurveyDTO();
        }

        public async Task AddAsync(SurveyDTO surveyDto)
        {
            var survey = new Survey
            {
                Title = surveyDto.Title,
                Description = surveyDto.Description,
                TargetAudience = surveyDto.TargetAudience,
                StartDate = surveyDto.StartDate,
                EndDate = surveyDto.EndDate,
                IsActive = surveyDto.IsActive
            };

            await _context.Surveys.AddAsync(survey);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, SurveyDTO updatedSurveyDto)
        {
            var existingSurvey = await _context.Surveys
                .FirstOrDefaultAsync(s => s.SurveyID == id);

            if (existingSurvey != null)
            {
                existingSurvey.Title = updatedSurveyDto.Title;
                existingSurvey.Description = updatedSurveyDto.Description;
                existingSurvey.TargetAudience = updatedSurveyDto.TargetAudience;
                existingSurvey.StartDate = updatedSurveyDto.StartDate;
                existingSurvey.EndDate = updatedSurveyDto.EndDate;
                existingSurvey.IsActive = updatedSurveyDto.IsActive;

                _context.Surveys.Update(existingSurvey);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var survey = await _context.Surveys
                .FirstOrDefaultAsync(s => s.SurveyID == id);

            if (survey != null)
            {
                _context.Surveys.Remove(survey);
                await _context.SaveChangesAsync();
            }
        }
    }
}