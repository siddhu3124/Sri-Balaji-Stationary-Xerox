import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import PrintCalculator from './components/PrintCalculator';
import Hero from './sections/Hero';
import Services from './sections/Services';
import FeaturedProducts from './sections/FeaturedProducts';
import Gallery from './sections/Gallery';
import Offers from './sections/Offers';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './components/Footer';

// Floating Icons
import { FiArrowUp } from 'react-icons/fi';

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartTab, setCartTab] = useState('cart'); // 'cart' or 'wishlist'
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll Spy to highlight navbar links & show back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back-to-top button
      setShowScrollTop(window.scrollY > 400);

      // Section Highlight Logic
      const sections = ['home', 'services', 'shop', 'print', 'gallery', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 120; // accounting for navbar offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openCartTab = (tabName) => {
    setCartTab(tabName);
    setCartOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* Sticky Header Navigation */}
      <Navbar
        onCartOpen={() => openCartTab('cart')}
        onWishlistOpen={() => openCartTab('wishlist')}
        activeSection={activeSection}
      />

      {/* Main Page Content */}
      <main style={{ flexGrow: 1 }}>
        {/* 1. Hero Entrance */}
        <Hero
          onShopClick={() => handleScrollTo('shop')}
          onPrintClick={() => handleScrollTo('print')}
        />

        {/* 2. Services Overview */}
        <Services onServiceClick={(serviceId) => handleScrollTo(serviceId === 'print' ? 'print' : 'shop')} />

        {/* 3. Bookstore & Shop */}
        <FeaturedProducts onQuickView={(prod) => setQuickViewProduct(prod)} />

        {/* 4. Printing/Xerox Section */}
        <section id="print" className="print-section section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <div className="section-header">
              <span className="badge badge-accent">Xerox Service</span>
              <h2>Instant Online Xerox Center</h2>
              <p>Configure and print your course handbooks, study sheets, project papers, and PDF documents. Live pricing calculation with auto-page scanning.</p>
            </div>

            <PrintCalculator onOrderAdded={() => openCartTab('cart')} />
          </div>
        </section>

        {/* 5. Offers Section */}
        <Offers />

        {/* 6. Photo Gallery */}
        <Gallery />

        {/* 7. FAQ accordions */}
        <FAQ />

        {/* 8. Contact Form and Location Map */}
        <Contact />
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Shopping Drawer overlays */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        activeTab={cartTab}
        setActiveTab={setCartTab}
      />

      {/* Quick View Product details modal */}
      <ProductModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* WhatsApp CTA Floater */}
      <a
        href="https://wa.me/919866279641?text=Hi%20Ink%20and%20Pages%20Store!%20I%20have%20a%20printing/bookstore%20query."
        target="_blank"
        rel="noreferrer"
        className="whatsapp-floater"
        title="WhatsApp Support"
        aria-label="WhatsApp Support"
      >
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/WhatsApp_Logo_green.svg/960px-WhatsApp_Logo_green.svg.png' style={{ width: '40px', height: '40px' }}></img>
      </a>

      {/* Back to Top Scroll Button */}
      <button
        onClick={handleScrollToTop}
        className={`back-to-top-btn btn-icon-only ${showScrollTop ? 'visible' : ''}`}
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        <FiArrowUp />
      </button>

      {/* Injected CSS for Floaters & App container details */}
      <style>{`
        .whatsapp-floater {
          position: fixed;
          bottom: 24px;
          left: 24px;
          width: 56px;
          height: 56px;
          background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/WhatsApp_Logo_green.svg/960px-WhatsApp_Logo_green.svg.png');
          background-size: cover;
          background-position: center;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          color: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          z-index: 999;
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        
        .whatsapp-floater:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
        }
        
        .back-to-top-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 50px;
          height: 50px;
          background-color: var(--bg-secondary) !important;
          border: 1px solid var(--border-color) !important;
          box-shadow: var(--shadow-md);
          z-index: 999;
          opacity: 0;
          pointer-events: none;
          transform: translateY(15px);
          transition: all var(--transition-normal);
        }
        
        .back-to-top-btn.visible {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }
        
        .back-to-top-btn:hover {
          background-color: var(--text-primary) !important;
          color: var(--bg-primary);
          border-color: var(--text-primary) !important;
        }
      `}</style>

    </div>
  );
};

export default App;
