

/**
 * Add a product to the cart.
 * If it already exists, increment quantity by 1.
 * @param {Array}  cart    - current cart array
 * @param {Object} product - product to add { _id, name, price, image, description }
 * @returns {Array} new cart array (immutable)
 */
export const addToCart = (cart, product) => {
  const exists = cart.find(item => item._id === product._id);

  if (exists) {
    return cart.map(item =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cart, { ...product, quantity: 1 }];
};

/**
 * Increment quantity of a cart item by 1.
 * @param {Array}  cart
 * @param {string} id   - product _id
 * @returns {Array} new cart array
 */
export const incrementItem = (cart, id) =>
  cart.map(item =>
    item._id === id ? { ...item, quantity: item.quantity + 1 } : item
  );

/**
 * Decrement quantity of a cart item by 1.
 * Removes the item if quantity would drop to 0.
 * @param {Array}  cart
 * @param {string} id
 * @returns {Array} new cart array
 */
export const decrementItem = (cart, id) =>
  cart
    .map(item =>
      item._id === id ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter(item => item.quantity > 0);

/**
 * Remove an item from the cart entirely.
 * @param {Array}  cart
 * @param {string} id
 * @returns {Array} new cart array
 */
export const removeFromCart = (cart, id) =>
  cart.filter(item => item._id !== id);

/**
 * Calculate the total price of all cart items.
 * @param {Array} cart
 * @returns {number} total
 */
export const getCartTotal = (cart) =>
  cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

/**
 * Calculate total number of items (sum of quantities).
 * @param {Array} cart
 * @returns {number}
 */
export const getCartCount = (cart) =>
  cart.reduce((sum, item) => sum + item.quantity, 0);

/**
 * Build a WhatsApp order message from the cart.
 * @param {Array}  cart
 * @param {string} phone - business WhatsApp number e.g. "254712345678"
 * @returns {string} full WhatsApp URL
 */export const buildWhatsAppURL = (cart, phone) => {
  const now = new Date();
  const time = now.toLocaleString('en-KE', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Nairobi'
  });

const lines = cart.map(
  (item, index) =>
    `${index + 1}. *${item.name}*\n    Qty: ${item.quantity} × KES ${item.price.toLocaleString()} = *KES ${(item.price * item.quantity).toLocaleString()}*`
);

  const total = getCartTotal(cart);

  const message = [
    '🌶️ *FreshGrow — New Chilli Order*',
    `🕐 ${time}`,
    '',
    '*Order Summary:*',
    ...lines,
    '',
    '─────────────────',
    `🧾 *Order Total: KES ${total.toLocaleString()}*`,
    '─────────────────',
    '',
    '📍 *Delivery Areas:* SouthB, Syokimau, Cabanas & Embakasi South',
    '',
    'Kindly confirm item availability, delivery time, and payment details.',
    'Thank you for choosing FreshGrow! 🌿'
  ].join('\n');

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};