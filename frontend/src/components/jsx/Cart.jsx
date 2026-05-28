
import { FaTimes, FaShoppingBag, FaWhatsapp } from 'react-icons/fa';
import '../css/Cart.css';
import { memo, useCallback, useState, useEffect } from 'react';
import {
  incrementItem,
  decrementItem,
  removeFromCart,
  getCartTotal,
  buildWhatsAppURL
} from '../../utils/CartUtil.js';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ─────────────────────────────────────────────
// 🧩 SINGLE CART ITEM — memoized
// ─────────────────────────────────────────────
const CartItem = memo(({ item, onIncrement, onDecrement, onRemove }) => (
  <li className="cart-item">

    <div className="cart-item__thumb">
      <img
        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/images/${item.image}`}
        alt={item.name}
        loading="lazy"
        decoding="async"
      />
    </div>

    <div className="cart-item__details">
      <p className="cart-item__name">{item.name}</p>
      <p className="cart-item__unit-price">
        KES {Number(item.price).toLocaleString()} each
      </p>

      <div className="cart-item__controls">
        <button
          className="qty-btn"
          onClick={() => onDecrement(item._id)}
          aria-label={`Decrease quantity of ${item.name}`}
        >−</button>

        <span className="qty-value" aria-live="polite">{item.quantity}</span>

        <button
          className="qty-btn"
          onClick={() => onIncrement(item._id)}
          aria-label={`Increase quantity of ${item.name}`}
        >+</button>
      </div>
    </div>

    <div className="cart-item__right">
      <p className="cart-item__line-total">
        KES {(item.price * item.quantity).toLocaleString()}
      </p>
      <button
        className="cart-item__remove"
        onClick={() => onRemove(item._id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        <FaTimes width="15" height="15" />
      </button>
    </div>

  </li>
));
CartItem.displayName = 'CartItem';

// ─────────────────────────────────────────────
// 🛒 CART DRAWER COMPONENT
// ─────────────────────────────────────────────
const Cart = ({ cart, setCart, isOpen, onClose }) => {

  // ✅ whatsappNumber fetched securely from backend
// WITH this
const [config, setConfig] = useState({ whatsappNumber: '', phoneNumber: '' });

useEffect(() => {
  fetch(`${API_BASE}/config`)
    .then(res => res.json())
    .then(data => setConfig(data))
    .catch(err => console.error('Failed to fetch config:', err));
}, []);

  const handleIncrement = useCallback((id) => {
    setCart(prev => incrementItem(prev, id));
  }, [setCart]);

  const handleDecrement = useCallback((id) => {
    setCart(prev => decrementItem(prev, id));
  }, [setCart]);

  const handleRemove = useCallback((id) => {
    setCart(prev => removeFromCart(prev, id));
  }, [setCart]);

  // WITH this
const handleCheckout = useCallback(() => {
  if (cart.length === 0 || !config.whatsappNumber) return;
  const url = buildWhatsAppURL(cart, config.whatsappNumber);
  window.open(url, '_blank', 'noopener,noreferrer');
}, [cart, config.whatsappNumber]);

const total = getCartTotal(cart); 

  return (
    <>
      <div
        className={`cart-backdrop ${isOpen ? 'cart-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >

        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Your Order
            {cart.length > 0 && (
              <span className="cart-drawer__count">{cart.length}</span>
            )}
          </h2>
          <button
            className="cart-drawer__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <FaTimes width="18" height="18" />
          </button>
        </div>

        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <FaShoppingBag className="cart-empty__icon" />
              <p>No items yet.</p>
              <span>Hover a product and tap <strong>Add to Order</strong>.</span>
            </div>
          ) : (
            <ul className="cart-list" role="list">
              {cart.map(item => (
                <CartItem
                  key={item._id}
                  item={item}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onRemove={handleRemove}
                />
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-total">
              <span className="cart-total__label">Total</span>
              <span className="cart-total__value" aria-live="polite">
                KES {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              aria-label="Checkout via WhatsApp"
              disabled={!config.whatsappNumber}
            >
              <FaWhatsapp width="18" height="18" />
              Checkout via WhatsApp
            </button>
            <a href={`tel:+${config.phoneNumber}`} className="call-btn" aria-label="Call us directly" > 📞 Call Us Directly </a>
          </div>
        )}

      </aside>
    </>
  );
};

export default Cart;