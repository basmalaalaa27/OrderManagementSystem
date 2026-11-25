// Customers Management JavaScript
// Week 2: JavaScript Fundamentals

// Using const for values that won't change
const applicationName = "EgyptShop E-Commerce";
const maxCustomersPerPage = 20;

// Using let for values that may change
let currentSearch = "";

// Sample customers data (demonstration data)
const customers = [
    { id: "CUST-001", name: "Mohamed Ali", email: "mohamed.ali@gmail.com", phone: "+20 100 123 4567", registrationDate: "2026-01-15", totalOrders: 24, totalSpending: 185500 },
    { id: "CUST-002", name: "Fatima Hassan", email: "fatima.hassan@yahoo.com", phone: "+20 111 234 5678", registrationDate: "2026-02-20", totalOrders: 18, totalSpending: 142200 },
    { id: "CUST-003", name: "Ahmed Mahmoud", email: "ahmed.mahmoud@hotmail.com", phone: "+20 122 345 6789", registrationDate: "2026-03-10", totalOrders: 15, totalSpending: 98600 },
    { id: "CUST-004", name: "Sara Kamel", email: "sara.kamel@gmail.com", phone: "+20 100 987 6543", registrationDate: "2026-04-05", totalOrders: 32, totalSpending: 287100 },
    { id: "CUST-005", name: "Omar El-Sayed", email: "omar.elsayed@yahoo.com", phone: "+20 111 876 5432", registrationDate: "2026-05-12", totalOrders: 45, totalSpending: 452500 }
];

// Search customers
function searchCustomers() {
    const searchInput = document.getElementById('customerSearch');
    currentSearch = searchInput.value.trim().toLowerCase();
    
    if (currentSearch.length > 0) {
        console.log("Searching customers for: " + currentSearch);
        filterCustomers();
    }
}

// Filter customers function
function filterCustomers() {
    const table = document.querySelector('.table-responsive table');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        
        const customerName = cells[1].textContent.toLowerCase();
        const customerEmail = cells[2].textContent.toLowerCase();
        
        let matchesSearch = customerName.includes(currentSearch) || customerEmail.includes(currentSearch);
        
        if (matchesSearch) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

// View customer details
function viewCustomerDetails(customerId) {
    console.log("Viewing customer: " + customerId);
    const customer = customers.find(c => c.id === customerId);
    
    if (!customer) {
        console.error("Customer not found: " + customerId);
        return;
    }
    
    // Populate the modal with customer details
    document.getElementById('viewCustomerId').textContent = customer.id;
    document.getElementById('viewCustomerName').textContent = customer.name;
    document.getElementById('viewCustomerEmail').textContent = customer.email;
    document.getElementById('viewCustomerPhone').textContent = customer.phone;
    document.getElementById('viewCustomerRegistrationDate').textContent = customer.registrationDate;
    document.getElementById('viewCustomerTotalOrders').textContent = customer.totalOrders;
    document.getElementById('viewCustomerTotalSpending').textContent = 'EGP ' + customer.totalSpending.toLocaleString();
    
    // Show the modal using Bootstrap
    try {
        const modalElement = document.getElementById('viewCustomerModal');
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
            console.log("Customer modal shown using fallback method");
        }
    } catch (error) {
        console.error("Error showing customer modal:", error);
    }
}

// Format phone number
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

// Calculate average order value
function calculateAverageOrderValue(totalSpending, totalOrders) {
    if (totalOrders === 0) return 0;
    return totalSpending / totalOrders;
}

// Open Add Customer modal
function openAddCustomerModal() {
    console.log("Opening Add Customer modal");
    try {
        const modalElement = document.getElementById('addCustomerModal');
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
            console.log("Add Customer modal shown using fallback method");
        }
    } catch (error) {
        console.error("Error showing add customer modal:", error);
    }
}

// Add new customer
function addCustomer() {
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    
    // Validate inputs
    if (!name || !email || !phone) {
        alert("Please fill in all fields");
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }
    
    // Generate new customer ID
    const maxCustomerId = customers.reduce((max, customer) => {
        const num = parseInt(customer.id.replace('CUST-', ''));
        return num > max ? num : max;
    }, 0);
    const newCustomerId = "CUST-" + String(maxCustomerId + 1).padStart(3, '0');
    
    // Add to customers array
    const newCustomer = {
        id: newCustomerId,
        name: name,
        email: email,
        phone: phone,
        registrationDate: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        totalSpending: 0
    };
    
    customers.push(newCustomer);
    
    // Close modal
    closeModal('addCustomerModal');
    
    // Clear form
    document.getElementById('addCustomerForm').reset();
    
    alert("Customer " + name + " added successfully with ID: " + newCustomerId);
    console.log("New customer added:", newCustomer);
}

// Close modal helper function
function closeModal(modalId) {
    try {
        const modalElement = document.getElementById(modalId);
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
        console.error("Error closing modal:", error);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('customerSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', searchCustomers);
    }
    
    console.log("Customers page loaded successfully");
    console.log("Application: " + applicationName);
    console.log("Total customers in sample data: " + customers.length);
    
    // Demonstrate data types
    const orderId = 1001; // Number
    const customerName = "Ahmed Ali"; // String
    const isPremium = true; // Boolean
    let selectedCustomer = null; // Null
    let currentFilter; // Undefined
    
    console.log("Data type of orderId: " + typeof orderId);
    console.log("Data type of customerName: " + typeof customerName);
    console.log("Data type of isPremium: " + typeof isPremium);
    console.log("Data type of selectedCustomer: " + typeof selectedCustomer);
    console.log("Data type of currentFilter: " + typeof currentFilter);
    
    // Demonstrate string methods
    const email = "AHMED@EXAMPLE.COM";
    console.log("Email lowercase: " + email.toLowerCase());
    console.log("Email trim: '" + email.trim() + "'");
    console.log("Email includes '@': " + email.includes("@"));
});

// Make functions globally accessible for onclick handlers
window.viewCustomerDetails = viewCustomerDetails;
window.openAddCustomerModal = openAddCustomerModal;
window.addCustomer = addCustomer;
window.closeModal = closeModal;
