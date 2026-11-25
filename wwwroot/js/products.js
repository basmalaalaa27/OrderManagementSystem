// Products Management JavaScript
// Week 2: JavaScript Fundamentals

// Using const for values that won't change
const applicationName = "EgyptShop E-Commerce";
const defaultCurrency = "EGP";

// Using let for values that may change
let currentSearch = "";
let currentCategory = "";

// Sample products data (demonstration data)
const products = [
    { id: "PRD-101", name: "Samsung Galaxy S24", category: "Mobiles", price: 45000, stock: 25, status: "In Stock" },
    { id: "PRD-102", name: "Apple Watch Series 9", category: "Wearables", price: 28500, stock: 18, status: "In Stock" },
    { id: "PRD-103", name: "Dell Laptop Stand", category: "Accessories", price: 1200, stock: 42, status: "In Stock" },
    { id: "PRD-104", name: "Anker USB-C Hub", category: "Accessories", price: 1850, stock: 65, status: "In Stock" },
    { id: "PRD-105", name: "Razer Gaming Mouse", category: "Gaming", price: 2800, stock: 12, status: "Low Stock" },
    { id: "PRD-106", name: "Keychron Keyboard", category: "Gaming", price: 4500, stock: 0, status: "Out of Stock" }
];

// Search products
function searchProducts() {
    const searchInput = document.getElementById('productSearch');
    currentSearch = searchInput.value.trim().toLowerCase();
    
    if (currentSearch.length > 0) {
        console.log("Searching products for: " + currentSearch);
        filterProducts();
    }
}

// Filter by category
function filterByCategory() {
    const categorySelect = document.getElementById('categoryFilter');
    currentCategory = categorySelect.value;
    console.log("Category filter: " + currentCategory);
    filterProducts();
}

// Combined filter function
function filterProducts() {
    const cards = document.querySelectorAll('.col-md-6.col-lg-4.mb-4');
    
    cards.forEach(card => {
        const productName = card.querySelector('h5').textContent.toLowerCase();
        const productCategory = card.querySelector('.row .col-6:first-child .fw-bold').textContent;
        
        let matchesSearch = productName.includes(currentSearch);
        let matchesCategory = currentCategory === "" || productCategory === currentCategory;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// Clear filters
function clearProductFilters() {
    document.getElementById('productSearch').value = "";
    document.getElementById('categoryFilter').value = "";
    currentSearch = "";
    currentCategory = "";
    filterProducts();
    console.log("Product filters cleared");
}

// Check stock status
function checkStockStatus(stock) {
    if (stock === 0) {
        return "Out of Stock";
    } else if (stock < 10) {
        return "Low Stock";
    } else {
        return "In Stock";
    }
}

// Calculate total value
function calculateTotalValue(price, stock) {
    return price * stock;
}

// Edit product
function editProduct(productId) {
    console.log("Edit product: " + productId);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error("Product not found: " + productId);
        return;
    }
    
    // For now, show an alert with product info
    alert("Edit Product: " + product.name + "\n\n" +
          "ID: " + product.id + "\n" +
          "Category: " + product.category + "\n" +
          "Price: EGP " + product.price + "\n" +
          "Stock: " + product.stock + "\n" +
          "Status: " + product.status);
}

// Delete product
function deleteProduct(productId) {
    console.log("Delete product: " + productId);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error("Product not found: " + productId);
        return;
    }
    
    // Confirm deletion
    if (confirm("Are you sure you want to delete " + product.name + "?")) {
        console.log("Product " + productId + " would be deleted");
        alert("Product " + product.name + " deleted (demo only)");
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded'), function(){
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const clearButton = document.getElementById('clearProductFilters');
    
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterByCategory);
    }
    
    if (clearButton) {
        clearButton.addEventListener('click', clearProductFilters);
    }
    
    console.log("Products page loaded successfully");
    console.log("Application: " + applicationName);
    console.log("Currency: " + defaultCurrency);
    console.log("Total products in sample data: " + products.length);
    
    // Demonstrate string methods
    const firstProduct = products[0].name;
    console.log("First product name length: " + firstProduct.length);
    console.log("First product uppercase: " + firstProduct.toUpperCase());
    console.log("First product lowercase: " + firstProduct.toLowerCase());
    console.log("Contains 'Wireless': " + firstProduct.includes("Wireless"));
}

// Make functions globally accessible for onclick handlers
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
