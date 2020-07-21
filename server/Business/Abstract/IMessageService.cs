using Core.Helpers;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IMessageService
    {
        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessageForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
        void Add(Message message);
        void Update(Message message);
        void Delete(Message message);
    }
}
