function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalContainer.innerHTML = '';
        return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item">
                <div>${item.name}</div>
                <div>₱${item.price}</div>
                <div>Quantity: ${item.quantity}</div>
                <div class="remove-btn" onclick="removeFromCart(${index})">Remove</div>
            </div>
        `;
        total += item.price * item.quantity;
    });

    cartItemsContainer.innerHTML = cartHTML;
    cartTotalContainer.innerHTML = `Total: ₱${total}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}


document.addEventListener('DOMContentLoaded', displayCart);