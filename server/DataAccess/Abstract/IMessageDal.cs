using Core.DataAccess;
using Core.Helpers;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IMessageDal: IEntityRepository<Message>
    {
        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessageForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}
