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
    public class DatingManager : IDatingService
    {
        private readonly IDatingDal _datingDal;

        public DatingManager(IDatingDal datingDal)
        {
            _datingDal = datingDal;
        }
        public void Add(User user)
        {
            _datingDal.Add(user);
        }

        public void Delete(User user)
        {
            _datingDal.Delete(user);
        }

        public Task<Photo> GetMainPhotoForUser(int userId)
        {
            return _datingDal.GetMainPhotoForUser(userId);
        }

        public Task<Photo> GetPhoto(int id)
        {
            return _datingDal.GetPhoto(id);
        }

        public Task<User> GetUser(int id)
        {
            return _datingDal.GetUser(id);
        }

        public Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            return _datingDal.GetUsers(userParams);
        }

        public void Update(User user)
        {
            _datingDal.Update(user);
        }
    }
}
