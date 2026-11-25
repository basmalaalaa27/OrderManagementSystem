using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OrderManagementSystem.Models;
using OrderManagementSystem.Services;

namespace OrderManagementSystem.Controllers;

public class HomeController : Controller
{
    private readonly StatsService _stats;

    public HomeController(StatsService stats)
    {
        _stats = stats;
    }

    public async Task<IActionResult> Index()
    {
        return View(await _stats.GetAsync());
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}