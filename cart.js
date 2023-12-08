const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const cartPlus = document.querySelector('.cartPlus');
const cartMinus = document.querySelector('.cartMinus');

function displayCart() {
  const cartContainer = document.getElementById('cartItems');
  let cartTotal = 0;

  cartContainer.innerHTML = '';

  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('product__card');
    cartItem.innerHTML = `
      <h1>${item.id}</h1>
      <h1>${item.name}</h1>
      <img src="${item.image}">
      <span>${item.price}$</span>
      <div class="puls-and-minus">
        <button class="cartMinus"> - </button>
        <p class="quantity">${item.quantity}</p>
        <button class="cartPlus"> + </button>
      </div>
      ${item.name} - $${item.price}`;
    cartContainer.appendChild(cartItem);

    cartTotal += item.price * item.quantity;
  });

  const cartTotalElement = document.getElementById('cartTotal');
  cartTotalElement.textContent = `$${cartTotal}`;
}

function clearCart() {
  localStorage.removeItem('cart');
  cartItems.length = 0;
  displayCart();
}

function increaseQuantity(itemId) {
  const index = cartItems.findIndex(item => item.id === itemId);
  if (index !== -1) {
    cartItems[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
  }
}

function decreaseQuantity(itemId) {
  const index = cartItems.findIndex(item => item.id === itemId);
  if (index !== -1 && cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
  }
}

window.addEventListener('load', () => {
  displayCart();
});

document.addEventListener('click', event => {
  if (event.target.classList.contains('cartPlus')) {
    const itemId = Number(event.target.parentElement.parentElement.querySelector('h1').textContent);
    increaseQuantity(itemId);
  } else if (event.target.classList.contains('cartMinus')) {
    const itemId = Number(event.target.parentElement.parentElement.querySelector('h1').textContent);
    decreaseQuantity(itemId);
  }
});

const clearCartBtn = document.getElementById('clearCartBtn');
clearCartBtn.addEventListener('click', () => {
  clearCart();
});
