using Business.Abstract;
using DataAccess.Abstract;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class AuthManager : IAuthService
    {
        private readonly IAuthDal _authDal;

        public AuthManager(IAuthDal authDal)
        {
            _authDal = authDal;
        }

        public Task<User> Login(string username, string password)
        {
            return _authDal.Login(username, password);
        }

        public Task<User> Register(User user, string password)
        {
            return _authDal.Register(user, password);

        }

        public Task<bool> UserExists(string username)
        {
            return _authDal.UserExists(username);
        }
    }
}
