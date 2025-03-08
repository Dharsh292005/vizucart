// Cart functionality using localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart count in the navigation bar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Function to add an item to the cart
function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
        product.quantity = 1; // Add new item with quantity 1
        cartItems.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    cartContainer.innerHTML = ''; // Clear previous items

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <p>${item.name} - Rupees ${item.price} x ${item.quantity}</p>
            <button onclick="updateQuantity('${item.id}', -1)">-</button>
            <button onclick="updateQuantity('${item.id}', 1)">+</button>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    updateCartCount();
}

// Function to update quantity in the cart
function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload(); // Refresh cart display
    }
}
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

// Initialize cart functionality on page load
document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById("cart-container"); // Ensure this ID exists in HTML
    let totalAmount = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartContainer.innerHTML = ""; // Clear previous content

        cart.forEach(item => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            // Ensure all properties exist before rendering
            let itemName = item.name || "Unknown Item";
            let itemPrice = item.price || 0;
            let itemImage = item.image ? `<img src="images/${item.image}" alt="${itemName}">` : "No Image";
            let itemQuantity = item.quantity || 1;
            totalAmount += itemPrice * itemQuantity;

            cartItem.innerHTML = `
                <div class="cart-product">
                    ${itemImage}
                    <p>${itemName} - ₹${itemPrice} x ${itemQuantity}</p>
                    <button onclick="updateQuantity('${item.id}', -1)">-</button>
                    <button onclick="updateQuantity('${item.id}', 1)">+</button>
                    <button onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    document.getElementById("total-price").textContent = `Total: Rupees ${totalAmount}`;
});

