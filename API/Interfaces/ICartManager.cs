using API.Models.CartAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ICartManager
    {
        Task<Cart> GetByAsync(string id);
        Task<Cart> UpdateAsync(Cart cart);
        Task<bool> DeleteAsync(string id);
    }
}
