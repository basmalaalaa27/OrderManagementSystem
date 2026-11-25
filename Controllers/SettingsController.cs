using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderManagementSystem.Data;

namespace OrderManagementSystem.Controllers;

public class SettingsController : Controller
{
    private readonly OrderDbContext _context;

    public SettingsController(OrderDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        ViewBag.Customers = await _context.Customers.CountAsync();
        ViewBag.Products = await _context.Products.CountAsync();
        ViewBag.Orders = await _context.Orders.CountAsync();
        ViewBag.Database = _context.Database.GetDbConnection().Database;
        ViewBag.Framework = System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription;
        return View();
    }
}