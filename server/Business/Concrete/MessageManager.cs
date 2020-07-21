using Business.Abstract;
using Core.Helpers;
using DataAccess.Abstract;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class MessageManager : IMessageService
    {
        private readonly IMessageDal _messageDal;
        public MessageManager(IMessageDal messageDal)
        {
            _messageDal = messageDal;
        }

        public void Add(Message message)
        {
            _messageDal.Add(message);
        }

        public void Delete(Message message)
        {
            _messageDal.Delete(message);
        }

        public Task<Message> GetMessage(int id)
        {
            return _messageDal.GetMessage(id);
        }

        public Task<PagedList<Message>> GetMessageForUser(MessageParams messageParams)
        {
            return _messageDal.GetMessageForUser(messageParams);
        }

        public Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            return _messageDal.GetMessageThread(userId, recipientId);
        }

        public void Update(Message message)
        {
            _messageDal.Update(message);
        }
    }
}
