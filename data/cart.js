// Load cart from localStorage
export let cart = JSON.parse(localStorage.getItem('cart'));

// ✅ Initialize cart safely if missing or broken
if (!Array.isArray(cart)) {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
}

// ✅ Optional: Clean up broken items
cart = cart.filter(item => item && item.productId && typeof item.quantity === 'number');

// Save cart to localStorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// ✅ Add item to cart
export function addToCart(productId) {
  if (!productId) {
    console.warn('❌ Cannot add to cart: productId is missing');
    return;
  }

  const matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }

  saveToStorage();
}

// ✅ Remove item from cart
export function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveToStorage();
}