import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiShoppingBag, FiHeart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ onCartOpen, onWishlistOpen, activeSection }) => {
  const { isDark, toggleTheme } = useTheme();
  const { getCartCount, wishlist } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Shop', href: '#shop' },
    { label: 'Xerox Printing', href: '#print' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className={`navbar glass-panel ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="logo">
          <span className="logo-icon"><img src='https://www.wallsnapy.com/img_gallery/tirupati-govinda-png-transparent-hd-logo-358.png' className='images' alt="Logo"></img></span>
          <span className="logo-text">
            <span className="brand-name">Sri Balaji</span>
            <span className="brand-sub"> Xerox & <span className="gold-text">Stationery</span></span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={activeSection === link.href.substring(1) ? 'active' : ''}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Search Toggle (Desktop Only) */}
          <div className={`nav-search-container hide-mobile ${searchOpen ? 'open' : ''}`}>
            <input
              type="text"
              placeholder="Search books, stationery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="nav-search-input"
            />
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="action-btn"
              aria-label="Search"
            >
              <FiSearch />
            </button>
          </div>

          {/* Wishlist Icon (Desktop Only) */}
          <button onClick={onWishlistOpen} className="action-btn badge-btn hide-mobile" aria-label="Wishlist">
            <FiHeart />
            {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
          </button>

          {/* Cart Icon (Always visible) */}
          <button onClick={onCartOpen} className="action-btn badge-btn" aria-label="Cart">
            <FiShoppingBag />
            {getCartCount() > 0 && <span className="count-badge">{getCartCount()}</span>}
          </button>

          {/* Theme Toggle (Desktop Only) */}
          <button onClick={toggleTheme} className="action-btn hide-mobile" aria-label="Toggle Theme">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          {/* Mobile Menu Toggle (Mobile Only) */}
          <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-btn" aria-label="Toggle Menu">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav ${isOpen ? 'open' : ''} glass-panel`}>
        {/* Mobile Search Bar inside Drawer */}
        <div className="mobile-search-bar">
          <input
            type="text"
            placeholder="Search books, stationery..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mobile-search-input"
          />
          <FiSearch className="mobile-search-icon" />
        </div>

        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={activeSection === link.href.substring(1) ? 'active' : ''}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Drawer Actions Footer */}
        <div className="mobile-drawer-footer">
          {/* Wishlist Mobile Button */}
          <button 
            onClick={() => { onWishlistOpen(); setIsOpen(false); }} 
            className="mobile-action-btn" 
            aria-label="Wishlist"
          >
            <FiHeart />
            <span>Wishlist</span>
            {wishlist.length > 0 && <span className="mobile-count-badge">{wishlist.length}</span>}
          </button>

          {/* Theme Toggle Mobile Button */}
          <button 
            onClick={toggleTheme} 
            className="mobile-action-btn" 
            aria-label="Toggle Theme"
          >
            {isDark ? <FiSun /> : <FiMoon />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
