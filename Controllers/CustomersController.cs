using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderManagementSystem.Data;
using OrderManagementSystem.Models;
using OrderManagementSystem.ViewModels;

namespace OrderManagementSystem.Controllers;

public class CustomersController : Controller
{
    private readonly OrderDbContext _context;

    public CustomersController(OrderDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(string? search)
    {
        var query = _context.Customers.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(c => c.FullName.Contains(search) || c.Email.Contains(search));

        var customers = await query
            .OrderBy(c => c.FullName)
            .Select(c => new CustomerListItem
            {
                CustomerId = c.CustomerId,
                FullName = c.FullName,
                Email = c.Email,
                Phone = c.Phone,
                RegistrationDate = c.RegistrationDate,
                TotalOrders = c.Orders.Count(),
                TotalSpending = c.Orders
                    .Where(o => o.Status != "Cancelled")
                    .Sum(o => o.Quantity * o.Product.Price)
            })
            .ToListAsync();

        ViewBag.Search = search;
        return View(customers);
    }

    public async Task<IActionResult> Details(int id)
    {
        var customer = await _context.Customers
            .Include(c => c.Orders).ThenInclude(o => o.Product)
            .FirstOrDefaultAsync(c => c.CustomerId == id);

        if (customer == null) return NotFound();
        return View(customer);
    }

    public IActionResult Create() =>
        View(new Customer { RegistrationDate = DateOnly.FromDateTime(DateTime.Today) });

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("FullName,Email,Phone,Address,RegistrationDate")] Customer customer)
    {
        await Validate(customer, null);
        if (!ModelState.IsValid) return View(customer);

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
        TempData["Success"] = $"Customer \"{customer.FullName}\" was added.";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Edit(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null) return NotFound();
        return View(customer);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("CustomerId,FullName,Email,Phone,Address,RegistrationDate")] Customer input)
    {
        if (id != input.CustomerId) return NotFound();

        await Validate(input, id);
        if (!ModelState.IsValid) return View(input);

        var customer = await _context.Customers.FindAsync(id);
        if (customer == null) return NotFound();

        customer.FullName = input.FullName;
        customer.Email = input.Email;
        customer.Phone = input.Phone;
        customer.Address = input.Address;
        customer.RegistrationDate = input.RegistrationDate;

        await _context.SaveChangesAsync();
        TempData["Success"] = $"Customer \"{customer.FullName}\" was updated.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null) return NotFound();

        if (await _context.Orders.AnyAsync(o => o.CustomerId == id))
        {
            TempData["Error"] = $"Can't delete \"{customer.FullName}\" because the customer has orders.";
            return RedirectToAction(nameof(Index));
        }

        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();
        TempData["Success"] = $"Customer \"{customer.FullName}\" was deleted.";
        return RedirectToAction(nameof(Index));
    }

    private async Task Validate(Customer c, int? id)
    {
        if (string.IsNullOrWhiteSpace(c.FullName))
            ModelState.AddModelError(nameof(c.FullName), "Full name is required.");

        if (string.IsNullOrWhiteSpace(c.Email) || !c.Email.Contains('@'))
            ModelState.AddModelError(nameof(c.Email), "A valid email is required.");
        else if (await _context.Customers.AnyAsync(x => x.Email == c.Email && x.CustomerId != id))
            ModelState.AddModelError(nameof(c.Email), "This email is already used by another customer.");
    }
}