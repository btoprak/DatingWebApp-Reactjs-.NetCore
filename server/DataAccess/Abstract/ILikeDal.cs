using Core.DataAccess;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface ILikeDal : IEntityRepository<Like>
    {
        Task<Like> GetLike(int userId, int recipientId);
    }
}
