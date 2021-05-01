using API.Interfaces;
using API.Models.CartAggregate;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data.Repositories
{
    public class CartManager : ICartManager
    {
        private IDatabase _database;

        public CartManager(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteAsync(string id)
        {
            return await _database.KeyDeleteAsync(id);
        }

        public async Task<Cart> GetByAsync(string id)
        {
            var data = await _database.StringGetAsync(id);

            return string.IsNullOrEmpty(data) ? null : JsonSerializer.Deserialize<Cart>(data);
        }

        public async Task<Cart> UpdateAsync(Cart cart)
        {
            string data = JsonSerializer.Serialize<Cart>(cart);
            bool created = await _database.StringSetAsync(cart.Id, data, TimeSpan.FromDays(30));

            return created ? cart : null;
        }
    }
}
