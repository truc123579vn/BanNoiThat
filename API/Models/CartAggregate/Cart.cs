using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.CartAggregate
{
    public class Cart
    {
        public string Id { get; set; }
        public IEnumerable<CartItem> CartItems { get; set; }
    }
}
