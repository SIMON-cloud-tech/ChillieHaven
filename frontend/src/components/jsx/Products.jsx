import { useState, useEffect, useCallback, memo } from 'react';
import '../css/Products.css';
import { addToCart } from '../../utils/CartUtil.js';

console.log('API BASE:', import.meta.env.VITE_API_BASE_URL);

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ─────────────────────────────────────────────
// 🛒 CART ICON
// ─────────────────────────────────────────────
const CartIcon = memo(({ count, onClick }) => (
  <button
    className="cart-trigger"
    onClick={onClick}
    aria-label={`Open cart, ${count} item${count !== 1 ? 's' : ''}`}
  >
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M3 6h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M16 10a4 4 0 01-8 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>

    {count > 0 && (
      <span className="cart-badge">
        {count > 99 ? '99+' : count}
      </span>
    )}
  </button>
));
CartIcon.displayName = 'CartIcon';

// ─────────────────────────────────────────────
// 🧩 PRODUCT CARD
// ─────────────────────────────────────────────
const ProductCard = memo(({ product, onOrder, index }) => (
  <article
    className="product-card"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    <div className="product-card__img-wrap">
      <img
        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/images/${product.image}`}
        alt={product.name}
        className="product-card__img"
        loading="lazy"
        decoding="async"
      />

      <div className="product-card__overlay">
        <button
          className="product-card__order-btn"
          onClick={() => onOrder(product)}
        >
          Add to Order
        </button>
      </div>
    </div>

    <div className="product-card__body">
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__desc">{product.description}</p>
      <p className="product-price">KES. {product.price}</p>
    </div>
  </article>
));
ProductCard.displayName = 'ProductCard';

// ─────────────────────────────────────────────
// 🌶️ MAIN COMPONENT
// ─────────────────────────────────────────────
const INITIAL_VISIBLE = 3;
const LOAD_MORE_STEP = 3;

const Products = ({ setCart }) => {

  // ── STATE ──
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  // ── FETCH DATA ──
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/vendor/inventory`, {
          signal: controller.signal
        });

        const data = await res.json();
        setProducts(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  // ── ADD TO CART ──
  const handleOrder = useCallback((product) => {
    setCart(prev => addToCart(prev, product));
    setToastMsg(`${product.name} added to chilli order 🌶️`);
    setTimeout(() => setToastMsg(''), 2000);
  }, [setCart]);

  // ── LOAD MORE ──
  const handleLoadMore = useCallback(() => {
    setVisible(prev => prev + LOAD_MORE_STEP);
  }, []);

  // ─────────────────────────────────────────────
  // ✅ SEARCH FILTER (FIXED ORDER)
  // ─────────────────────────────────────────────
  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      String(product.price).includes(query)
    );
  });

  // ── PAGINATION ON FILTERED DATA ──
  const visibleItems = filteredProducts.slice(0, visible);
  const hasMore = visible < filteredProducts.length;

  // ── LOADING ──
  if (loading) {
    return (
      <section className="products-section">
        <p>Loading fresh chillies...</p>
      </section>
    );
  }

  // ── ERROR ──
  if (error) {
    return (
      <section className="products-section">
        <p>{error}</p>
      </section>
    );
  }

  // ── UI ──
  return (
    <>
      {/* TOAST */}
      {toastMsg && (
        <div className="products-toast">
          {toastMsg}
        </div>
      )}

      <section className="products-section">

        {/* HEADER */}
        <div className="products-header">
          <h2 className="products-title">
            Fresh Chillies & Spice Products 🌶️
          </h2>

          <p className="products-subtitle">
            Fresh farm chillies delivered across Nairobi (SouthB, Syokimau, Cabanas & Embakasi South).
          </p>
        </div>

        {/* LOAD MORE */}
        {hasMore && (
          <div className="products-load-more">
            <button onClick={handleLoadMore} className="load-more-btn">
              Load More
            </button>
          </div>
        )}

        {/* SEARCH BAR */}
        <div className="products-search">
          <input
            type="text"
            placeholder="Search chillies by name, description or price..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisible(INITIAL_VISIBLE); // reset pagination
            }}
            className="products-search-input"
          />
        </div>

        {/* GRID */}
        <div className="products-grid">
          {visibleItems.map((product, i) => (
            <ProductCard
              key={product._id}
              product={product}
              onOrder={handleOrder}
              index={i}
            />
          ))}
        </div>

      </section>
    </>
  );
};

export default Products;