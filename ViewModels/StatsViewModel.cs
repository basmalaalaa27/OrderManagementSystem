namespace OrderManagementSystem.ViewModels;

public record LabelValue(string Label, decimal Value);

public class StatsViewModel
{
    public DateOnly? From { get; set; }
    public DateOnly? To { get; set; }

    public int TotalOrders { get; set; }
    public int PendingOrders { get; set; }
    public int ShippedOrders { get; set; }
    public int DeliveredOrders { get; set; }
    public int CancelledOrders { get; set; }

    public decimal TotalRevenue { get; set; }
    public decimal AvgOrderValue { get; set; }

    public int TotalCustomers { get; set; }
    public int TotalProducts { get; set; }
    public int LowStockProducts { get; set; }

    public List<LabelValue> MonthlySales { get; set; } = new();
    public List<LabelValue> TopCategories { get; set; } = new();
    public List<LabelValue> TopProducts { get; set; } = new();
    public List<LabelValue> TopCustomers { get; set; } = new();
    public List<OrderListItem> RecentOrders { get; set; } = new();
}