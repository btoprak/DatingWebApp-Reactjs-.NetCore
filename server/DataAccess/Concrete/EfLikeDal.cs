
using DataAccess.Abstract;
using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class EfLikeDal : EfEntityRepositoryBase<Like>, ILikeDal
    {
        public EfLikeDal(DatingContext context)
             : base(context) { }
        public async Task<Like> GetLike(int userId, int recipientId)
        {
           
                return await context.Likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
            
        }
    }
}
