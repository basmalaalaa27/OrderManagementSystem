using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using OrderManagementSystem.Data;
using OrderManagementSystem.Models;
using OrderManagementSystem.ViewModels;

namespace OrderManagementSystem.Controllers;

public class OrdersController : Controller
{
    private static readonly string[] Statuses = { "Pending", "Shipped", "Delivered", "Cancelled" };

    private readonly OrderDbContext _context;

    public OrdersController(OrderDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(string? search, string? status)
    {
        var query = _context.Orders.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(o => o.Customer.FullName.Contains(search) ||
                                     o.Product.ProductName.Contains(search));

        if (!string.IsNullOrWhiteSpace(status))
            query = query.Where(o => o.Status == status);

        var orders = await query
            .OrderByDescending(o => o.OrderDate)
            .ThenByDescending(o => o.OrderId)
            .Select(o => new OrderListItem
            {
                OrderId = o.OrderId,
                OrderDate = o.OrderDate,
                CustomerName = o.Customer.FullName,
                ProductName = o.Product.ProductName,
                Quantity = o.Quantity,
                Price = o.Product.Price,
                Total = o.Quantity * o.Product.Price,
                Status = o.Status
            })
            .ToListAsync();

        ViewBag.Search = search;
        ViewBag.Status = status;
        ViewBag.Statuses = Statuses;
        return View(orders);
    }

    public async Task<IActionResult> Create()
    {
        await LoadLists();
        return View(new Order { OrderDate = DateOnly.FromDateTime(DateTime.Today), Quantity = 1, Status = "Pending" });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("CustomerId,ProductId,Quantity,OrderDate,Status")] Order order)
    {
        ModelState.Remove("Customer");
        ModelState.Remove("Product");

        var product = await _context.Products.FindAsync(order.ProductId);

        if (!await _context.Customers.AnyAsync(c => c.CustomerId == order.CustomerId))
            ModelState.AddModelError(nameof(order.CustomerId), "Please select a customer.");
        if (product == null)
            ModelState.AddModelError(nameof(order.ProductId), "Please select a product.");
        if (order.Quantity < 1)
            ModelState.AddModelError(nameof(order.Quantity), "Quantity must be at least 1.");
        if (!Statuses.Contains(order.Status))
            ModelState.AddModelError(nameof(order.Status), "Invalid status.");
        if (product != null && order.Status != "Cancelled" && order.Quantity > product.Stock)
            ModelState.AddModelError(nameof(order.Quantity), $"Only {product.Stock} in stock for \"{product.ProductName}\".");

        if (!ModelState.IsValid)
        {
            await LoadLists();
            return View(order);
        }

        if (order.Status != "Cancelled")
            product!.Stock -= order.Quantity;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        TempData["Success"] = "Order was added.";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Edit(int id)
    {
        var order = await _context.Orders
            .Include(o => o.Customer)
            .Include(o => o.Product)
            .FirstOrDefaultAsync(o => o.OrderId == id);

        if (order == null) return NotFound();

        ViewBag.Statuses = new SelectList(Statuses, order.Status);
        return View(order);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, string status)
    {
        var order = await _context.Orders
            .Include(o => o.Customer)
            .Include(o => o.Product)
            .FirstOrDefaultAsync(o => o.OrderId == id);

        if (order == null) return NotFound();

        if (!Statuses.Contains(status))
            ModelState.AddModelError("", "Invalid status.");

        var wasCancelled = order.Status == "Cancelled";
        var willBeCancelled = status == "Cancelled";

        if (wasCancelled && !willBeCancelled && order.Quantity > order.Product.Stock)
            ModelState.AddModelError("", $"Can't re-activate: only {order.Product.Stock} in stock.");

        if (!ModelState.IsValid)
        {
            ViewBag.Statuses = new SelectList(Statuses, status);
            return View(order);
        }

        if (!wasCancelled && willBeCancelled) order.Product.Stock += order.Quantity;
        if (wasCancelled && !willBeCancelled) order.Product.Stock -= order.Quantity;

        order.Status = status;
        await _context.SaveChangesAsync();
        TempData["Success"] = $"Order #{order.OrderId} is now {status}.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var order = await _context.Orders.Include(o => o.Product).FirstOrDefaultAsync(o => o.OrderId == id);
        if (order == null) return NotFound();

        if (order.Status != "Cancelled")
            order.Product.Stock += order.Quantity;

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
        TempData["Success"] = $"Order #{id} was deleted.";
        return RedirectToAction(nameof(Index));
    }

    private async Task LoadLists()
    {
        ViewBag.Customers = new SelectList(await _context.Customers.OrderBy(c => c.FullName).ToListAsync(), "CustomerId", "FullName");
        ViewBag.Products = new SelectList(
            await _context.Products.OrderBy(p => p.ProductName)
                .Select(p => new { p.ProductId, Label = p.ProductName + " (stock: " + p.Stock + ")" })
                .ToListAsync(),
            "ProductId", "Label");
        ViewBag.Statuses = Statuses;
    }
}