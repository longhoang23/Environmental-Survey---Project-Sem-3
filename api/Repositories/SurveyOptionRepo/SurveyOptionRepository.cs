using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.SurveyOptionRepo
{
    public class SurveyOptionRepository : ISurveyOptionRepository
    {
        private readonly ApplicationDbContext _context;

        public SurveyOptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SurveyOption>> GetAllSurveyOptions()
        {
            return await _context.SurveyOptions
                .Include(so => so.Question)
                .ToListAsync();
        }

        public async Task<SurveyOption?> GetSurveyOptionById(int id)
        {
            return await _context.SurveyOptions
                .Include(so => so.Question)
                .FirstOrDefaultAsync(so => so.OptionID == id);
        }

        public async Task<SurveyOption?> AddSurveyOption(SurveyOption surveyOption)
        {
            await _context.SurveyOptions.AddAsync(surveyOption);
            await _context.SaveChangesAsync();
            return surveyOption;
        }

        public async Task<SurveyOption?> UpdateSurveyOption(int id, SurveyOption updateSurveyOption)
        {
            var existingOption = await _context.SurveyOptions
                .FirstOrDefaultAsync(so => so.OptionID == id);

            if (existingOption != null)
            {
                existingOption.OptionText = updateSurveyOption.OptionText;
                existingOption.Score = updateSurveyOption.Score;
                existingOption.QuestionID = updateSurveyOption.QuestionID;

                _context.SurveyOptions.Update(existingOption);
                await _context.SaveChangesAsync();

                return existingOption;
            }
            return null;
        }

        public async Task<SurveyOption?> DeleteSurveyOption(int id)
        {
            var surveyOption = await _context.SurveyOptions
                .FirstOrDefaultAsync(so => so.OptionID == id);

            if (surveyOption != null)
            {
                _context.SurveyOptions.Remove(surveyOption);
                await _context.SaveChangesAsync();
                return surveyOption;
            }
            return null;
        }
    }
}