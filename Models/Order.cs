using System;
using System.Collections.Generic;

namespace OrderManagementSystem.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public DateOnly OrderDate { get; set; }

    public string Status { get; set; } = null!;

    public int CustomerId { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
