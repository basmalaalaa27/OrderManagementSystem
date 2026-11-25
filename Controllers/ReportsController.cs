using Microsoft.AspNetCore.Mvc;
using OrderManagementSystem.Services;

namespace OrderManagementSystem.Controllers;

public class ReportsController : Controller
{
    private readonly StatsService _stats;

    public ReportsController(StatsService stats)
    {
        _stats = stats;
    }

    public async Task<IActionResult> Index(DateOnly? from, DateOnly? to)
    {
        if (from.HasValue && to.HasValue && from > to)
            (from, to) = (to, from);

        return View(await _stats.GetAsync(from, to));
    }
}
