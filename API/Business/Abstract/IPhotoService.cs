using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IPhotoService
    {
        void Add(Photo photo);
        void Delete(Photo photo);
        void Update(Photo photo);
    }
}
