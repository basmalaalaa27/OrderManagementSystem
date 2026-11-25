using Microsoft.EntityFrameworkCore;
using OrderManagementSystem.Data;
using OrderManagementSystem.ViewModels;

namespace OrderManagementSystem.Services;

public class StatsService
{
    private readonly OrderDbContext _context;

    public StatsService(OrderDbContext context)
    {
        _context = context;
    }

    public async Task<StatsViewModel> GetAsync(DateOnly? from = null, DateOnly? to = null)
    {
        var query = _context.Orders.AsQueryable();
        if (from.HasValue) query = query.Where(o => o.OrderDate >= from.Value);
        if (to.HasValue) query = query.Where(o => o.OrderDate <= to.Value);

        var rows = await query
            .Select(o => new
            {
                o.OrderId,
                o.OrderDate,
                o.Status,
                o.Quantity,
                Price = o.Product.Price,
                Category = o.Product.Category ?? "Uncategorized",
                Product = o.Product.ProductName,
                Customer = o.Customer.FullName
            })
            .ToListAsync();

        var active = rows.Where(r => r.Status != "Cancelled").ToList();
        var revenue = active.Sum(r => r.Quantity * r.Price);

        var stats = new StatsViewModel
        {
            From = from,
            To = to,
            TotalOrders = rows.Count,
            PendingOrders = rows.Count(r => r.Status == "Pending"),
            ShippedOrders = rows.Count(r => r.Status == "Shipped"),
            DeliveredOrders = rows.Count(r => r.Status == "Delivered"),
            CancelledOrders = rows.Count(r => r.Status == "Cancelled"),
            TotalRevenue = revenue,
            AvgOrderValue = active.Count > 0 ? revenue / active.Count : 0,
            TotalCustomers = await _context.Customers.CountAsync(),
            TotalProducts = await _context.Products.CountAsync(),
            LowStockProducts = await _context.Products.CountAsync(p => p.Stock < 15)
        };

        // Monthly sales (من غير فلتر: آخر 6 شهور، ومع فلتر: الفترة المختارة)
        var today = DateOnly.FromDateTime(DateTime.Today);
        var endRef = to ?? today;
        var end = new DateOnly(endRef.Year, endRef.Month, 1);
        var start = from.HasValue ? new DateOnly(from.Value.Year, from.Value.Month, 1) : end.AddMonths(-5);

        var guard = 0;
        for (var m = start; m <= end && guard < 36; m = m.AddMonths(1), guard++)
        {
            var amount = active
                .Where(r => r.OrderDate.Year == m.Year && r.OrderDate.Month == m.Month)
                .Sum(r => r.Quantity * r.Price);
            stats.MonthlySales.Add(new LabelValue(m.ToString("MMM yyyy"), amount));
        }

        stats.TopCategories = active.GroupBy(r => r.Category)
            .Select(g => new LabelValue(g.Key, g.Sum(r => r.Quantity * r.Price)))
            .OrderByDescending(x => x.Value).Take(5).ToList();

        stats.TopProducts = active.GroupBy(r => r.Product)
            .Select(g => new LabelValue(g.Key, g.Sum(r => r.Quantity * r.Price)))
            .OrderByDescending(x => x.Value).Take(5).ToList();

        stats.TopCustomers = active.GroupBy(r => r.Customer)
            .Select(g => new LabelValue(g.Key, g.Sum(r => r.Quantity * r.Price)))
            .OrderByDescending(x => x.Value).Take(5).ToList();

        stats.RecentOrders = rows
            .OrderByDescending(r => r.OrderDate).ThenByDescending(r => r.OrderId)
            .Take(5)
            .Select(r => new OrderListItem
            {
                OrderId = r.OrderId,
                OrderDate = r.OrderDate,
                CustomerName = r.Customer,
                ProductName = r.Product,
                Quantity = r.Quantity,
                Price = r.Price,
                Total = r.Quantity * r.Price,
                Status = r.Status
            }).ToList();

        return stats;
    }
}