namespace API.DTOs.InputModels
{
    public class OrderDetailInput
    {
        public int Qty { get; set; }
        public int Price { get; set; }
        public int ProductId { get; set; }
    }
}