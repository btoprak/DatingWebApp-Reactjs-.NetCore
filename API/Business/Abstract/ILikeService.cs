using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ILikeService
    {
        Task<Like> GetLike(int userId, int recipientId);
        void Add(Like like);
    }
}
