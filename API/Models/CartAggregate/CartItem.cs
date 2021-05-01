namespace API.Models.CartAggregate
{
    public class CartItem
    {
        public CartItem()
        {
        }

        public CartItem(int productId, string productName, decimal price)
        {
            ProductId = productId;
            ProductName = productName;
            Price = price;
            qty = 1;
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int qty { get; set; }
        public decimal Price { get; set; }
    }
}