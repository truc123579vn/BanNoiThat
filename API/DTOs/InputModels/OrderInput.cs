using System.Collections.Generic;

namespace API.DTOs.InputModels
{
    public class OrderInput
    {
        public int user_id { get; set; }

        //public string FirstName {get;set;}
        //public string LastName{get;set;}
        public string Address { get; set; }

        
        public IEnumerable<OrderDetailInput> OrderDetails { get; set; }
        public OrderInput(int user_id, string Address)
        {
            this.user_id=user_id;
            this.Address=Address;
        }
    }
}