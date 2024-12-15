using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Class
{
    public class KlassRepository : IKlassRepository
    {
         private readonly ApplicationDbContext _context;

        public KlassRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Klass> CreateClassAsync(Klass classEntity)
        {
            await _context.Klasses.AddAsync(classEntity);
            await _context.SaveChangesAsync();
            return classEntity;
        }

        public async Task<Klass?> GetClassByIdAsync(int classId)
        {
            return await _context.Klasses
                .Include(k => k.Users)    // If you need to load related Users
                .FirstOrDefaultAsync(k => k.KlassId == classId);
        }

        public async Task<IEnumerable<Klass>> GetAllClassesAsync()
        {
            return await _context.Klasses
                .Include(k => k.Users)   // If you need to load related Users
                .ToListAsync();
        }

        public async Task<Klass?> UpdateClassAsync(Klass updatedClass, int classId)
        {
            var existingClass = await _context.Klasses.FindAsync(classId);
            if (existingClass == null)
            {
                return null;
            }

            // Update the fields you want to allow changes on
            existingClass.Name = updatedClass.Name;
            // If you need to update Users, handle that carefully,
            // or handle relationships separately

            await _context.SaveChangesAsync();
            return existingClass;
        }

        public async Task<Klass?> DeleteClassAsync(int classId)
        {
            var klass = await _context.Klasses.FindAsync(classId);
            if (klass == null)
            {
                return null;
            }

            _context.Klasses.Remove(klass);
            await _context.SaveChangesAsync();
            return klass;
        }

        public async Task<bool> ClassExistAsync(int classId)
        {
            return await _context.Klasses.AnyAsync(k => k.KlassId == classId);
        }
    }
}