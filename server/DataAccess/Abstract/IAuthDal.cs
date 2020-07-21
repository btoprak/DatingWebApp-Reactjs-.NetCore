using Core.DataAccess;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IAuthDal: IEntityRepository<User>
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);

        Task<bool> UserExists(string username);
    }
}
