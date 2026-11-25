// Orders Management JavaScript
// Week 2: JavaScript Fundamentals

// Using const for values that won't change
const applicationName = "Order Management System";
const maxOrdersPerPage = 50;
const STORAGE_KEY = "oms_orders_data";

// Using let for values that may change
let currentPage = 1;
let searchTerm = "";
let statusFilter = "";
let paymentFilter = "";

// Initialize orders from localStorage or use sample data
function initializeOrders() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        return JSON.parse(storedData);
    }
    
    // Sample orders data (demonstration data)
    const sampleOrders = [
        { 
            id: "EGY-1001", 
            customer: "Mohamed Ali", 
            email: "mohamed.ali@gmail.com",
            phone: "+20 123 456 7890",
            address: "123 Main St, Cairo",
            product: "Samsung Galaxy S24",
            productId: "PRD-101",
            date: "2026-11-05", 
            quantity: 1, 
            unitPrice: 45000,
            price: 45000, 
            paymentMethod: "Vodafone Cash", 
            paymentStatus: "Paid", 
            orderStatus: "Processing",
            notes: ""
        },
        { 
            id: "EGY-1002", 
            customer: "Fatima Hassan", 
            email: "fatima.hassan@yahoo.com",
            phone: "+20 987 654 3210",
            address: "456 Oak Ave, Alexandria",
            product: "Apple Watch Series 9", 
            productId: "PRD-102",
            date: "2026-11-05", 
            quantity: 1, 
            unitPrice: 28500,
            price: 28500, 
            paymentMethod: "InstaPay", 
            paymentStatus: "Paid", 
            orderStatus: "Pending",
            notes: ""
        },
        { 
            id: "EGY-1003", 
            customer: "Ahmed Mahmoud", 
            email: "ahmed.mahmoud@hotmail.com",
            phone: "+20 111 222 3333",
            address: "789 Pine Rd, Giza",
            product: "Dell Laptop Stand", 
            productId: "PRD-103",
            date: "2026-11-04", 
            quantity: 2, 
            unitPrice: 1200,
            price: 2400, 
            paymentMethod: "Cash on Delivery", 
            paymentStatus: "Unpaid", 
            orderStatus: "Cancelled",
            notes: ""
        },
        { 
            id: "EGY-1004", 
            customer: "Sara Kamel", 
            email: "sara.kamel@gmail.com",
            phone: "+20 444 555 6666",
            address: "321 Elm St, Mansoura",
            product: "Anker USB-C Hub", 
            productId: "PRD-104",
            date: "2026-11-04", 
            quantity: 1, 
            unitPrice: 1850,
            price: 1850, 
            paymentMethod: "Credit Card", 
            paymentStatus: "Paid", 
            orderStatus: "Delivered",
            notes: ""
        },
        { 
            id: "EGY-1005", 
            customer: "Omar El-Sayed", 
            email: "omar.elsayed@yahoo.com",
            phone: "+20 777 888 9999",
            address: "654 Maple Dr, Tanta",
            product: "Razer Gaming Mouse", 
            productId: "PRD-105",
            date: "2026-11-03", 
            quantity: 2, 
            unitPrice: 2800,
            price: 5600, 
            paymentMethod: "InstaPay", 
            paymentStatus: "Paid", 
            orderStatus: "Shipped",
            notes: ""
        },
        { 
            id: "EGY-1006", 
            customer: "Nour El-Din", 
            email: "nour.eldin@gmail.com",
            phone: "+20 333 444 5555",
            address: "987 Cedar Ln, Aswan",
            product: "Keychron Keyboard", 
            productId: "PRD-106",
            date: "2026-11-02", 
            quantity: 1, 
            unitPrice: 4500,
            price: 4500, 
            paymentMethod: "Vodafone Cash", 
            paymentStatus: "Paid", 
            orderStatus: "Processing",
            notes: ""
        },
        { 
            id: "EGY-1007", 
            customer: "Youssef Kamel", 
            email: "youssef.kamel@hotmail.com",
            phone: "+20 666 777 8888",
            address: "147 Birch Blvd, Port Said",
            product: "Monitor Arm Stand", 
            productId: "PRD-107",
            date: "2026-11-02", 
            quantity: 1, 
            unitPrice: 1800,
            price: 1800, 
            paymentMethod: "Cash on Delivery", 
            paymentStatus: "Unpaid", 
            orderStatus: "Pending",
            notes: ""
        },
        { 
            id: "EGY-1008", 
            customer: "Mona Salah", 
            email: "mona.salah@yahoo.com",
            phone: "+20 222 333 4444",
            address: "258 Spruce Way, Luxor",
            product: "Logitech Webcam", 
            productId: "PRD-108",
            date: "2026-11-01", 
            quantity: 1, 
            unitPrice: 3200,
            price: 3200, 
            paymentMethod: "InstaPay", 
            paymentStatus: "Paid", 
            orderStatus: "Delivered",
            notes: ""
        }
    ];
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleOrders));
    return sampleOrders;
}

// Orders data array
let orders = initializeOrders();

// Save orders to localStorage
function saveOrders() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

// Render orders table dynamically
function renderOrdersTable() {
    const tableBody = document.getElementById('ordersTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.setAttribute('data-order-id', order.id);
        
        // Determine status badge colors
        const paymentBadgeClass = order.paymentStatus === 'Paid' ? 'bg-success' : 
                                  order.paymentStatus === 'Unpaid' ? 'bg-warning' : 'bg-secondary';
        
        let orderBadgeClass = 'bg-info';
        if (order.orderStatus === 'Delivered') orderBadgeClass = 'bg-success';
        else if (order.orderStatus === 'Cancelled') orderBadgeClass = 'bg-danger';
        else if (order.orderStatus === 'Shipped') orderBadgeClass = 'bg-primary';
        else if (order.orderStatus === 'Pending') orderBadgeClass = 'bg-warning';
        
        row.innerHTML = `
            <td class="text-center text-muted">${order.id}</td>
            <td>
                <div class="widget-content p-0">
                    <div class="widget-content-wrapper">
                        <div class="widget-content-left me-3">
                            <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center" style="width: 42px; height: 42px;">
                                <i class="fa fa-user text-white"></i>
                            </div>
                        </div>
                        <div class="widget-content-left flex2">
                            <div class="widget-heading">${order.customer}</div>
                            <div class="widget-subheading opacity-7">${order.email}</div>
                        </div>
                    </div>
                </div>
            </td>
            <td>${order.product}</td>
            <td>${order.date}</td>
            <td>${order.quantity}</td>
            <td>EGP ${order.price.toLocaleString()}</td>
            <td>${order.paymentMethod}</td>
            <td>
                <div class="badge ${paymentBadgeClass}">${order.paymentStatus}</div>
            </td>
            <td>
                <div class="badge ${orderBadgeClass}">${order.orderStatus}</div>
            </td>
            <td class="text-center">
                <button type="button" class="btn btn-primary btn-sm me-1" onclick="viewOrder('${order.id}')">
                    <i class="fa fa-eye me-1"></i>View
                </button>
                <button type="button" class="btn btn-warning btn-sm me-1" onclick="openUpdateModal('${order.id}')">
                    <i class="fa fa-edit me-1"></i>Edit
                </button>
                <button type="button" class="btn btn-danger btn-sm" onclick="openDeleteModal('${order.id}')">
                    <i class="fa fa-trash me-1"></i>Delete
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Apply current filters
    filterOrders();
}

// Search functionality
function searchOrders() {
    const searchInput = document.getElementById('searchInput');
    searchTerm = searchInput.value.trim().toLowerCase();
    filterOrders();
}

// Filter orders by status
function filterByStatus() {
    const statusSelect = document.getElementById('statusFilter');
    statusFilter = statusSelect.value;
    filterOrders();
}

// Filter orders by payment status
function filterByPayment() {
    const paymentSelect = document.getElementById('paymentFilter');
    paymentFilter = paymentSelect.value;
    filterOrders();
}

// Combined filter function
function filterOrders() {
    const table = document.getElementById('ordersTable');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        
        const orderId = cells[0].textContent.toLowerCase();
        const customerName = cells[1].textContent.toLowerCase();
        const orderStatus = cells[8].textContent.toLowerCase();
        const paymentStatus = cells[7].textContent.toLowerCase();
        
        let matchesSearch = searchTerm === "" || orderId.includes(searchTerm) || customerName.includes(searchTerm);
        let matchesStatus = statusFilter === "" || orderStatus.includes(statusFilter.toLowerCase());
        let matchesPayment = paymentFilter === "" || paymentStatus.includes(paymentFilter.toLowerCase());
        
        if (matchesSearch && matchesStatus && matchesPayment) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

// Clear all filters
function clearFilters() {
    document.getElementById('searchInput').value = "";
    document.getElementById('statusFilter').value = "";
    document.getElementById('paymentFilter').value = "";
    searchTerm = "";
    statusFilter = "";
    paymentFilter = "";
    filterOrders();
}

// View order details
function viewOrder(orderId) {
    console.log("View order called for ID:", orderId);
    
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        showToast("Order not found: " + orderId, "error");
        return;
    }
    
    // Populate the modal with order details
    document.getElementById('viewOrderId').textContent = order.id;
    document.getElementById('viewCustomerName').textContent = order.customer;
    document.getElementById('viewCustomerEmail').textContent = order.email;
    document.getElementById('viewCustomerPhone').textContent = order.phone;
    document.getElementById('viewCustomerAddress').textContent = order.address;
    document.getElementById('viewProduct').textContent = order.product;
    document.getElementById('viewProductId').textContent = order.productId;
    document.getElementById('viewQuantity').textContent = order.quantity;
    document.getElementById('viewUnitPrice').textContent = 'EGP ' + order.unitPrice.toLocaleString();
    document.getElementById('viewTotalPrice').textContent = 'EGP ' + order.price.toLocaleString();
    document.getElementById('viewPaymentMethod').textContent = order.paymentMethod;
    document.getElementById('viewOrderDate').textContent = order.date;
    document.getElementById('viewShippingAddress').textContent = order.address;
    document.getElementById('viewNotes').textContent = order.notes || "No notes";
    
    // Set payment status badge
    const paymentStatusDiv = document.getElementById('viewPaymentStatus');
    const paymentBadgeClass = order.paymentStatus === 'Paid' ? 'bg-success' :
                              order.paymentStatus === 'Unpaid' ? 'bg-warning' : 'bg-secondary';
    paymentStatusDiv.innerHTML = `<span class="badge ${paymentBadgeClass}">${order.paymentStatus}</span>`;
    
    // Set order status badge
    const orderStatusDiv = document.getElementById('viewOrderStatus');
    let statusBadgeClass = 'bg-info';
    if (order.orderStatus === 'Delivered') statusBadgeClass = 'bg-success';
    else if (order.orderStatus === 'Cancelled') statusBadgeClass = 'bg-danger';
    else if (order.orderStatus === 'Shipped') statusBadgeClass = 'bg-primary';
    else if (order.orderStatus === 'Pending') statusBadgeClass = 'bg-warning';
    orderStatusDiv.innerHTML = `<span class="badge ${statusBadgeClass}">${order.orderStatus}</span>`;
    
    // Show the modal using Bootstrap
    try {
        const modalElement = document.getElementById('viewOrderModal');
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            // Fallback: manually show modal
            modalElement.classList.add('show');
            modalElement.style.display = 'block';
            document.body.classList.add('modal-open');
            
            // Create backdrop if not exists
            if (!document.querySelector('.modal-backdrop')) {
                const backdrop = document.createElement('div');
                backdrop.className = 'modal-backdrop fade show';
                document.body.appendChild(backdrop);
            }
            console.log("Modal shown using fallback method");
        }
    } catch (error) {
        console.error("Error showing modal:", error);
        showToast("Error opening order details", "error");
    }
}

// Open Update Order modal
function openUpdateModal(orderId) {
    console.log("Open update modal for ID:", orderId);
    
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        showToast("Order not found: " + orderId, "error");
        return;
    }
    
    // Populate the update modal
    document.getElementById('updateOrderId').value = order.id;
    document.getElementById('updateOrderStatus').value = order.orderStatus;
    document.getElementById('updatePaymentStatus').value = order.paymentStatus;
    document.getElementById('updatePaymentMethod').value = order.paymentMethod;
    
    // Show the modal
    try {
        const modalElement = document.getElementById('updateOrderModal');
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            modalElement.classList.add('show');
            modalElement.style.display = 'block';
            document.body.classList.add('modal-open');
            if (!document.querySelector('.modal-backdrop')) {
                const backdrop = document.createElement('div');
                backdrop.className = 'modal-backdrop fade show';
                document.body.appendChild(backdrop);
            }
        }
    } catch (error) {
        console.error("Error showing update modal:", error);
        showToast("Error opening update modal", "error");
    }
}

// Update order
function updateOrder() {
    const orderId = document.getElementById('updateOrderId').value;
    const newOrderStatus = document.getElementById('updateOrderStatus').value;
    const newPaymentStatus = document.getElementById('updatePaymentStatus').value;
    const newPaymentMethod = document.getElementById('updatePaymentMethod').value;
    
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
        showToast("Order not found: " + orderId, "error");
        return;
    }
    
    // Update the order
    orders[orderIndex].orderStatus = newOrderStatus;
    orders[orderIndex].paymentStatus = newPaymentStatus;
    orders[orderIndex].paymentMethod = newPaymentMethod;
    
    // Save to localStorage
    saveOrders();
    
    // Re-render table
    renderOrdersTable();
    
    // Close modal
    try {
        const modalElement = document.getElementById('updateOrderModal');
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
        } else {
            // Fallback: manually hide modal
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
        }
    } catch (error) {
        console.error("Error closing update modal:", error);
    }
    
    showToast("Order " + orderId + " updated successfully", "success");
}

// Open Delete confirmation modal
function openDeleteModal(orderId) {
    console.log("Open delete modal for ID:", orderId);
    
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        showToast("Order not found: " + orderId, "error");
        return;
    }
    
    // Populate the delete modal
    document.getElementById('deleteOrderId').textContent = order.id;
    document.getElementById('deleteCustomerName').textContent = order.customer;
    document.getElementById('deleteConfirmOrderId').value = order.id;
    
    // Show the modal
    try {
        const modalElement = document.getElementById('deleteOrderModal');
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            modalElement.classList.add('show');
            modalElement.style.display = 'block';
            document.body.classList.add('modal-open');
            if (!document.querySelector('.modal-backdrop')) {
                const backdrop = document.createElement('div');
                backdrop.className = 'modal-backdrop fade show';
                document.body.appendChild(backdrop);
            }
        }
    } catch (error) {
        console.error("Error showing delete modal:", error);
        showToast("Error opening delete modal", "error");
    }
}

// Delete order
function deleteOrder() {
    const orderId = document.getElementById('deleteConfirmOrderId').value;
    
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
        showToast("Order not found: " + orderId, "error");
        return;
    }
    
    // Remove from array
    orders.splice(orderIndex, 1);
    
    // Save to localStorage
    saveOrders();
    
    // Re-render table
    renderOrdersTable();
    
    // Close modal
    try {
        const modalElement = document.getElementById('deleteOrderModal');
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
        } else {
            // Fallback: manually hide modal
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
        }
    } catch (error) {
        console.error("Error closing delete modal:", error);
    }
    
    showToast("Order " + orderId + " deleted successfully", "success");
}

// Add new order
function addOrder() {
    const customerName = document.getElementById('addCustomerName').value.trim();
    const email = document.getElementById('addEmail').value.trim();
    const phone = document.getElementById('addPhone').value.trim();
    const address = document.getElementById('addAddress').value.trim();
    const product = document.getElementById('addProduct').value;
    const quantity = parseInt(document.getElementById('addQuantity').value);
    const unitPrice = parseFloat(document.getElementById('addUnitPrice').value);
    const paymentMethod = document.getElementById('addPaymentMethod').value;
    const paymentStatus = document.getElementById('addPaymentStatus').value;
    const orderStatus = document.getElementById('addOrderStatus').value;
    const notes = document.getElementById('addNotes').value.trim();
    
    // Validate inputs
    if (!customerName || !email || !phone || !address) {
        showToast("Please fill in all customer information fields", "error");
        return;
    }
    
    if (!product) {
        showToast("Please select a product", "error");
        return;
    }
    
    if (!quantity || quantity <= 0) {
        showToast("Quantity must be greater than zero", "error");
        return;
    }
    
    if (!unitPrice || unitPrice < 0) {
        showToast("Unit price cannot be negative", "error");
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address", "error");
        return;
    }
    
    // Calculate total price
    const totalPrice = quantity * unitPrice;
    
    // Generate new order ID
    const maxOrderId = orders.reduce((max, order) => {
        const num = parseInt(order.id.replace('EGY-', ''));
        return num > max ? num : max;
    }, 1000);
    const newOrderId = "EGY-" + (maxOrderId + 1);
    
    // Get product ID based on product name
    const productIds = {
        "Samsung Galaxy S24": "PRD-101",
        "Apple Watch Series 9": "PRD-102",
        "Dell Laptop Stand": "PRD-103",
        "Anker USB-C Hub": "PRD-104",
        "Razer Gaming Mouse": "PRD-105",
        "Keychron Keyboard": "PRD-106",
        "Monitor Arm Stand": "PRD-107",
        "Logitech Webcam": "PRD-108"
    };
    
    // Add to orders array
    const newOrder = {
        id: newOrderId,
        customer: customerName,
        email: email,
        phone: phone,
        address: address,
        product: product,
        productId: productIds[product] || "PRD-999",
        date: new Date().toISOString().split('T')[0],
        quantity: quantity,
        unitPrice: unitPrice,
        price: totalPrice,
        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
        orderStatus: orderStatus,
        notes: notes
    };
    
    orders.push(newOrder);
    
    // Save to localStorage
    saveOrders();
    
    // Re-render table
    renderOrdersTable();
    
    // Close modal
    try {
        const modalElement = document.getElementById('addOrderModal');
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
        } else {
            // Fallback: manually hide modal
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
        }
    } catch (error) {
        console.error("Error closing add modal:", error);
    }
    
    // Clear form
    document.getElementById('addOrderForm').reset();
    
    showToast("Order " + newOrderId + " added successfully", "success");
}

// Print order
function printOrder() {
    window.print();
}

// Show toast notification
function showToast(message, type = "info") {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info';
    
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Show the toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Remove from DOM after hiding
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Render the table on page load
    renderOrdersTable();
    
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const paymentFilter = document.getElementById('paymentFilter');
    const clearButton = document.getElementById('clearFilters');
    
    if (searchInput) {
        searchInput.addEventListener('input', searchOrders);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterByStatus);
    }
    
    if (paymentFilter) {
        paymentFilter.addEventListener('change', filterByPayment);
    }
    
    if (clearButton) {
        clearButton.addEventListener('click', clearFilters);
    }
    
    console.log("Orders page loaded successfully");
    console.log("Application: " + applicationName);
    console.log("Total orders: " + orders.length);
});

// Make functions globally accessible for onclick handlers
// Must be at the end after all functions are defined
window.viewOrder = viewOrder;
window.openUpdateModal = openUpdateModal;
window.deleteOrder = deleteOrder;
window.addOrder = addOrder;
window.updateOrder = updateOrder;

