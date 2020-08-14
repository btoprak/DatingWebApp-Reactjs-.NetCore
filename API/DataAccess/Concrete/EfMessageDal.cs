
using Core.Helpers;
using DataAccess.Abstract;
using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class EfMessageDal : EfEntityRepositoryBase<Message>, IMessageDal
    {
        public EfMessageDal(DatingContext context)
               : base(context) { }
        public async Task<Message> GetMessage(int id)
        {
          
                return await context.Messages.FirstOrDefaultAsync(m => m.Id == id);
           
        }

        public async Task<PagedList<Message>> GetMessageForUser(MessageParams messageParams)
        {
            
                var messages = context.Messages.Include(u => u.Sender).ThenInclude(p => p.Photos)
                    .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                    .AsQueryable();

                switch (messageParams.MessageContainer)
                {
                    case "Inbox":
                        messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false);
                        break;
                    case "Outbox":
                        messages = messages.Where(u => u.SenderId == messageParams.UserId && u.SenderDeleted == false);
                        break;
                    default:
                        messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false && u.IsRead == false);
                        break;
                }

                messages = messages.OrderByDescending(d => d.MessageSent);
                return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
          
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            
                var messages = await context.Messages
                   .Include(u => u.Sender).ThenInclude(p => p.Photos)
                   .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                   .Where(m => m.RecipientId == userId && m.RecipientDeleted == false && m.SenderId == recipientId
                   || m.RecipientId == recipientId && m.SenderId == userId && m.SenderDeleted == false)
                   .OrderBy(m => m.MessageSent)
                   .ToListAsync();

                return messages;
            
        }
    }
}
