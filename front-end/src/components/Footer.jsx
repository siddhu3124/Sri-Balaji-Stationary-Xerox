import React, { useState } from 'react';
import { FiPhoneCall, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-grid container">

        {/* Col 1: Brand Info */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-icon">🖨️</span>
            <span className="logo-text">Sri Balaji xerox & <span className="gold-text">Stationery</span></span>
          </div>
          <p className="brand-desc">
            Your premium bookstore, stationery hub, and high-speed Xerox xerox/printing center. Delivering visual and literary excellence daily.
          </p>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/960px-Instagram_logo_2022.svg.png' className='images'></img></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><img src='https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png' className='images'></img></a>
            <a href="https://wa.me/919866279641?text=Hi%20Ink%20and%20Pages%20Store!%20I%20have%20a%20printing/bookstore%20query." target="_blank" rel="noreferrer" className="social-icon"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/WhatsApp_Logo_green.svg/960px-WhatsApp_Logo_green.svg.png' className='images'></img></a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="footer-col links-col">
          <h3>Quick Navigation</h3>
          <ul>
            <li><a href="#home">Home Page</a></li>
            <li><a href="#services">Our Services</a></li>
            <li><a href="#shop">Bookstore & Shop</a></li>
            <li><a href="#print">Xerox printing</a></li>
            <li><a href="#gallery">Interior Gallery</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Col 3: Contact & Address */}
        <div className="footer-col contact-col">
          <h3>Store Information</h3>
          <ul className="contact-info-list">
            <li>
              <FiMapPin className="contact-icon" />
              <span>Near Siddartha College, Vikarabad, Hyderabad, Telangana 501101</span>
            </li>
            <li>
              <FiPhoneCall className="contact-icon" />
              <span>+91 9866279641</span>
            </li>
            <li>
              <FiClock className="contact-icon" />
              <span>Mon - Sat: 9:00 AM - 9:00 PM<br />Sunday: 10:00 AM - 6:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="footer-col newsletter-col">
          <h3>Stay Updated</h3>
          <p>Subscribe to receive product discounts, student offers, and book arrival updates.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="input-field footer-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-accent footer-send-btn" aria-label="Subscribe">
              <FiSend />
            </button>
          </form>
          {subscribed && <span className="subscribe-success-tag animate-fade-in">Subscribed successfully!</span>}
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content container">
          <p>&copy; {new Date().getFullYear()} Ink & Pages. All rights reserved.</p>
          <p className="developer-tag">Designed with Team Aesthetics</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
