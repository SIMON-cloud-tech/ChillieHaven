import { useState, useCallback, memo } from 'react';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import LogoImage from '../../../public/logo.svg';
import { FiMenu, FiX, FiShoppingBag } from "react-icons/fi";

import { getCartCount } from '../../utils/CartUtil.js';
import Cart from './Cart.jsx';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Contact us', path: '/contact' },
  { label: 'Clientele', path: '/clientele' },
  { label: 'Blogs', path: '/blogs'}
];

const NavItem = memo(({ label, path, onClick }) => (
  <li className="nav-item">
    <Link to={path} className="nav-link" onClick={onClick}>
      {label}
    </Link>
  </li>
));

NavItem.displayName = 'NavItem';

/* ─────────────────────────────────────────────
   HAMBURGER ICON (NOW CLICKABLE DIRECTLY)
───────────────────────────────────────────── */
const HamburgerIcon = ({ open, onClick }) => (
  <div
    onClick={onClick}
    className="hamburger-icon-wrapper"
    aria-label={open ? 'Close menu' : 'Open menu'}
    role="button"
    tabIndex={0}
  >
    {open ? <FiX className="icon" /> : <FiMenu className="icon" />}
  </div>
);

HamburgerIcon.displayName = 'HamburgerIcon';

/* ─────────────────────────────────────────────
   CART BUTTON
───────────────────────────────────────────── */
const CartButton = memo(({ count, onClick }) => (
  <button
    className="nav-cart-btn"
    onClick={onClick}
    aria-label={`Open cart, ${count} item${count !== 1 ? 's' : ''}`}
  >
    <FiShoppingBag className="cart-react-icon" />

    {count > 0 && (
      <span className="nav-cart-badge">
        {count > 99 ? '99+' : count}
      </span>
    )}
  </button>
));

CartButton.displayName = 'CartButton';

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const Navbar = ({ cart, setCart }) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleCart = useCallback(() => setCartOpen(prev => !prev), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const cartCount = getCartCount(cart);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">

        {/* LOGO */}
        <Link to="/" className="navbar-logo" aria-label="FreshGrow Home">
          <img src={LogoImage} alt='FG' />
          <span className="logo-text">ChillieHaven</span>
        </Link>

        {/* DESKTOP NAV */}
        <ul className="nav-list" role="list">
          {NAV_ITEMS.map(item => (
            <NavItem key={item.label} {...item} />
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="nav-right">

          <CartButton
            count={cartCount}
            onClick={toggleCart}
          />

          <HamburgerIcon
            open={menuOpen}
            onClick={toggleMenu}
          />

        </div>

      </nav>

      {/* MOBILE MENU */}
      <ul
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        role="list"
        aria-hidden={!menuOpen}
      >
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.label}
            {...item}
            onClick={closeMenu}
          />
        ))}
      </ul>

      {/* CART */}
      <Cart
        cart={cart}
        setCart={setCart}
        isOpen={cartOpen}
        onClose={closeCart}
      />
    </>
  );
};

export default Navbar;