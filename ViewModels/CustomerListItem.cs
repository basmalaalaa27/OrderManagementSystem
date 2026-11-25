namespace OrderManagementSystem.ViewModels;

public class CustomerListItem
{
    public int CustomerId { get; set; }
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string? Phone { get; set; }
    public DateOnly RegistrationDate { get; set; }
    public int TotalOrders { get; set; }
    public decimal TotalSpending { get; set; }
}