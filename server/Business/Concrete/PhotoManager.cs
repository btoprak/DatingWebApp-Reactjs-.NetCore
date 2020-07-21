using Business.Abstract;
using DataAccess.Abstract;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class PhotoManager:IPhotoService
    {

        private IPhotoDal _photoDal;
        public PhotoManager(IPhotoDal photoDal)
        {
            _photoDal = photoDal;
        }
        public void Add(Photo photo)
        {
            _photoDal.Add(photo);
        }

        public void Delete(Photo photo)
        {
            _photoDal.Delete(photo);
        }

        public void Update(Photo photo)
        {
            _photoDal.Update(photo);
        }
    }
}
