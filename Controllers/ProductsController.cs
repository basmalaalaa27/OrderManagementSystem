using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderManagementSystem.Data;
using OrderManagementSystem.Models;

namespace OrderManagementSystem.Controllers;

public class ProductsController : Controller
{
    private readonly OrderDbContext _context;

    public ProductsController(OrderDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(string? search, string? category)
    {
        var query = _context.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.ProductName.Contains(search) ||
                                     (p.Category != null && p.Category.Contains(search)));

        if (!string.IsNullOrWhiteSpace(category))
            query = query.Where(p => p.Category == category);

        ViewBag.Categories = await _context.Products
            .Where(p => p.Category != null)
            .Select(p => p.Category!)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync();
        ViewBag.Search = search;
        ViewBag.Category = category;

        return View(await query.OrderBy(p => p.ProductName).ToListAsync());
    }

    public IActionResult Create() => View(new Product());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("ProductName,Category,Price,Stock")] Product product)
    {
        Validate(product);
        if (!ModelState.IsValid) return View(product);

        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        TempData["Success"] = $"Product \"{product.ProductName}\" was added.";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Edit(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        return View(product);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("ProductId,ProductName,Category,Price,Stock")] Product input)
    {
        if (id != input.ProductId) return NotFound();

        Validate(input);
        if (!ModelState.IsValid) return View(input);

        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        product.ProductName = input.ProductName;
        product.Category = input.Category;
        product.Price = input.Price;
        product.Stock = input.Stock;

        await _context.SaveChangesAsync();
        TempData["Success"] = $"Product \"{product.ProductName}\" was updated.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        if (await _context.Orders.AnyAsync(o => o.ProductId == id))
        {
            TempData["Error"] = $"Can't delete \"{product.ProductName}\" because it has orders.";
            return RedirectToAction(nameof(Index));
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        TempData["Success"] = $"Product \"{product.ProductName}\" was deleted.";
        return RedirectToAction(nameof(Index));
    }

    private void Validate(Product p)
    {
        if (string.IsNullOrWhiteSpace(p.ProductName))
            ModelState.AddModelError(nameof(p.ProductName), "Product name is required.");
        if (p.Price < 0)
            ModelState.AddModelError(nameof(p.Price), "Price can't be negative.");
        if (p.Stock < 0)
            ModelState.AddModelError(nameof(p.Stock), "Stock can't be negative.");
    }
}