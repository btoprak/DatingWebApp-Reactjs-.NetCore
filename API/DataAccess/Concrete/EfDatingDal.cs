﻿
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
    public class EfDatingDal : EfEntityRepositoryBase<User>, IDatingDal
    {
        public EfDatingDal(DatingContext context)
               : base(context) { }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {

            return await context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);

        }

        public async Task<Photo> GetPhoto(int id)
        {

            var photo = await context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;

        }

        public async Task<User> GetUser(int id)
        {

            var user = await context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;

        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {

            var users = context.Users.Include(p => p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);

            users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikers.Contains(u.Id));
            }

            if (userParams.Likees)
            {
                var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikees.Contains(u.Id));
            }

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);

        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {

            var user = await context.Users.Include(x => x.Likers).Include(x => x.Likees).FirstOrDefaultAsync(u => u.Id == id);

            if (likers)
            {
                return user.Likers.Where(u => u.LikeeId == id).Select(i => i.LikerId);
            }
            else
            {
                return user.Likees.Where(u => u.LikerId == id).Select(i => i.LikeeId);
            }

        }
    }
}
