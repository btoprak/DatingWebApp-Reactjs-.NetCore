using Core.Entities;
using DataAccess.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete
{
    public class EfEntityRepositoryBase<TEntity> : IEntityRepository<TEntity>
    where TEntity : class, IEntity, new()
    {
        internal DatingContext context;
      
        public EfEntityRepositoryBase(DatingContext context)
        {
            this.context = context;
        }
        public void Add(TEntity entity)
        {

            var addedEntity = context.Entry(entity);
            addedEntity.State = EntityState.Added;
            context.SaveChanges();

        }

        public void Delete(TEntity entity)
        {

            var deletedEntity = context.Entry(entity);
            deletedEntity.State = EntityState.Deleted;
            context.SaveChanges();

        }

        public TEntity Get(Expression<Func<TEntity, bool>> filter)
        {

            return context.Set<TEntity>().SingleOrDefault(filter);

        }

        public IList<TEntity> GetList(Expression<Func<TEntity, bool>> filter = null)
        {

            return filter == null
                ? context.Set<TEntity>().ToList()
                : context.Set<TEntity>().Where(filter).ToList();

        }

        public void Update(TEntity entity)
        {

            var updatedEntity = context.Entry(entity);
            updatedEntity.State = EntityState.Modified;
            context.SaveChanges();

        }
    }
}
