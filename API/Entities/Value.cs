using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Value:IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }

    }
}
