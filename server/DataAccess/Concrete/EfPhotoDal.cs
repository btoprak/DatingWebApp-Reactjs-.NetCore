
using DataAccess.Abstract;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Concrete
{
    public class EfPhotoDal : EfEntityRepositoryBase<Photo>, IPhotoDal
    {
        public EfPhotoDal(DatingContext context)
              : base(context) { }
    }
}
