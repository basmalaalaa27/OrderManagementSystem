namespace OrderManagementSystem.ViewModels;

public class OrderListItem
{
    public int OrderId { get; set; }
    public DateOnly OrderDate { get; set; }
    public string CustomerName { get; set; } = "";
    public string ProductName { get; set; } = "";
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal Total { get; set; }
    public string Status { get; set; } = "";
}