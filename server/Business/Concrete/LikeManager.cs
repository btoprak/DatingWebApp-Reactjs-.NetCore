using Business.Abstract;
using DataAccess.Abstract;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class LikeManager : ILikeService
    {
        private ILikeDal _likeDal;

        public LikeManager(ILikeDal likeDal)
        {
            _likeDal = likeDal;
        }

        public void Add(Like like)
        {
            _likeDal.Add(like);
        }

        public Task<Like> GetLike(int userId, int recipientId)
        {
            return _likeDal.GetLike(userId, recipientId);
        }
    }
}
