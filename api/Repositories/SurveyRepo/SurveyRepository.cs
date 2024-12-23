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
    public class SurveyRepository : ISurveyRepository
    {
        private readonly ApplicationDbContext _context;

        public SurveyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Survey>> GetAllSurvey()
        {
            return await _context.Surveys
                .Include(s => s.SurveyQuestions)
                
                .Include(s => s.Participations)
                .ToListAsync();
        }

        public async Task<Survey?> GetSurveyById(int id)
        {
            return await _context.Surveys
                .Include(s => s.SurveyQuestions)
                .Include(s => s.Participations)
                .FirstOrDefaultAsync(s => s.SurveyID == id);
        }

        public async Task<Survey> AddSurvey(Survey survey)
        {
            await _context.Surveys.AddAsync(survey);
            await _context.SaveChangesAsync();
            return survey;
        }

        public async Task<Survey?> UpdateSurvey(int id, Survey updateSurvey)
    {
        var existingSurvey = await _context.Surveys
            .FirstOrDefaultAsync(s => s.SurveyID == id);

        if (existingSurvey != null)
        {
            existingSurvey.Title = updateSurvey.Title;
            existingSurvey.Description = updateSurvey.Description;
            existingSurvey.TargetAudience = updateSurvey.TargetAudience;
            existingSurvey.StartDate = updateSurvey.StartDate;
            existingSurvey.EndDate = updateSurvey.EndDate;
            existingSurvey.IsActive = updateSurvey.IsActive;

            _context.Surveys.Update(existingSurvey);
            await _context.SaveChangesAsync();

            return existingSurvey;
        }
        return null;
    }


        public async Task<Survey?> DeleteSurvey(int id)
        {
            var survey = await _context.Surveys
                .FirstOrDefaultAsync(s => s.SurveyID == id);

            if (survey != null)
            {
                _context.Surveys.Remove(survey);
                await _context.SaveChangesAsync();
                return survey;
            }
            return null;
        }
    }
}