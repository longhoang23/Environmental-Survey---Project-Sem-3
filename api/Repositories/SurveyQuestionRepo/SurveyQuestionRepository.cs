using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.SurveyQuestionRepo
{
    public class SurveyQuestionRepository : ISurveyQuestionRepository
    {
        private readonly ApplicationDbContext _context;

        public SurveyQuestionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SurveyQuestion>> GetAllSurveyQuestions()
        {
            return await _context.SurveyQuestions
                .Include(q => q.Options)
                .ToListAsync();
        }

        public async Task<SurveyQuestion?> GetSurveyQuestionById(int id)
        {
            return await _context.SurveyQuestions
                .Include(q => q.Options)
                .FirstOrDefaultAsync(q => q.QuestionID == id);
        }

        public async Task<SurveyQuestion?> AddSurveyQuestion(SurveyQuestion surveyQuestion)
        {
            await _context.SurveyQuestions.AddAsync(surveyQuestion);
            await _context.SaveChangesAsync();
            return surveyQuestion;
        }

        public async Task<SurveyQuestion?> UpdateSurveyQuestion(int id, SurveyQuestion updateSurveyQuestion)
        {
            var existingQuestion = await _context.SurveyQuestions
                .FirstOrDefaultAsync(q => q.QuestionID == id);

            if (existingQuestion != null)
            {
                existingQuestion.QuestionText = updateSurveyQuestion.QuestionText;
                existingQuestion.QuestionType = updateSurveyQuestion.QuestionType;
                existingQuestion.SurveyID = updateSurveyQuestion.SurveyID;

                _context.SurveyQuestions.Update(existingQuestion);
                await _context.SaveChangesAsync();

                return existingQuestion;
            }
            return null;
        }

        public async Task<SurveyQuestion?> DeleteSurveyQuestion(int id)
        {
            var surveyQuestion = await _context.SurveyQuestions
                .FirstOrDefaultAsync(q => q.QuestionID == id);

            if (surveyQuestion != null)
            {
                _context.SurveyQuestions.Remove(surveyQuestion);
                await _context.SaveChangesAsync();
                return surveyQuestion;
            }
            return null;
        }
    }
}