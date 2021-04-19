using System.Collections.Generic;

namespace API.DTOs.InputModels
{
    public class OrderInput
    {
        public string Username { get; set; }

        public string FirstName {get;set;}
        public string LastName{get;set;}
        public string Address { get; set; }
        public IEnumerable<OrderDetailInput> OrderDetails { get; set; }
    }
}