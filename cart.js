
function addToCart(button) {
    const itemElement = button.closest('.catalog__item');
    const id = itemElement.getAttribute('data-id');
    const name = itemElement.getAttribute('data-name');
    const price = parseFloat(itemElement.getAttribute('data-price'));

    const item = { id, name, price, quantity: 1 };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === id);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(item);
    }

    
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        

     const popupId = button.getAttribute('data-popup');
     const popup = document.getElementById(popupId);
     popup.classList.add("show");
     setTimeout(function() {
         popup.classList.remove("show");
     }, 1500);
    
}

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
    updateCartCount();
    displayCart();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countCart = document.getElementById('countCart');
    if (countCart) {
        countCart.innerHTML = cart.length.toString();
    }
}

document.addEventListener('DOMContentLoaded', displayCart);


