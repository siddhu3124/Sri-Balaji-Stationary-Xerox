import React from 'react';
import { FiArrowRight, FiUploadCloud } from 'react-icons/fi';
import './Hero.css';


const Hero = ({ onShopClick, onPrintClick }) => {
  return (
    <section id="home" className="hero-section">
      {/* Background visual graphics */}
      <div className="hero-glowing-blob blob-1"></div>
      <div className="hero-glowing-blob blob-2"></div>

      {/* Floating Elements (Decorative) */}
      <div className="floating-shape shape-book">📚</div>
      <div className="floating-shape shape-pencil">✏️</div>
      <div className="floating-shape shape-paper">📄</div>
      <div className="floating-shape shape-palette">🎨</div>

      <div className="hero-container container">
        <div className="hero-content">
          <span className="hero-badge badge badge-accent animate-fade-in">
            📍 Vikarabad's Premium Printing & Bookstore
          </span>
          <h1 className="hero-title animate-fade-in">
            Everything for <span className="gradient-text">Learning</span>, <br />
            <span className="gold-text">Printing</span> & Creativity
          </h1>
          <p className="hero-subtitle animate-fade-in">
            Explore a curated collection of academics, best-selling literature, high-grade stationery, and customize your Xerox document printouts with our advanced online cost calculator.
          </p>

          <div className="hero-actions animate-fade-in">
            <button onClick={onPrintClick} className="btn btn-accent hero-btn main-cta">
              <FiUploadCloud /> Upload Xerox PDF
            </button>
            <button onClick={onShopClick} className="btn btn-secondary hero-btn">
              Explore Bookstore <FiArrowRight />
            </button>
          </div>

          <div className="hero-stats animate-fade-in">
            <div className="stat-card glass-card">
              <h4>10k+</h4>
              <p>Books Sold</p>
            </div>
            <div className="stat-card glass-card">
              <h4>Same Day</h4>
              <p>Xerox Dispatch</p>
            </div>
            <div className="stat-card glass-card">
              <h4>Premium</h4>
              <p>Stationery</p>
            </div>
          </div>
        </div>

        {/* Hero visual grid / illustration */}
        <div className="hero-visual-col animate-fade-in">
          <div className="visual-card-stack">
            <div className="visual-card main-visual glass-panel">
              <span className="visual-icon">📖</span>
              <h3>Bestselling Books</h3>
              <p>Novel collections, engineering, school, and entrance exam resources.</p>
              <div className="visual-tag">Flat 15% Off</div>
            </div>
            <div className="visual-card secondary-visual glass-panel">
              <span className="visual-icon">⚡</span>
              <h3>Xerox Prints</h3>
              <p>Instant file upload & live checkout pricing.</p>
              <div className="visual-tag">From ₹1.5/pg</div>
            </div>
            <div className="visual-card tertiary-visual glass-panel">
              <span className="visual-icon">🎨</span>
              <h3>Fine Arts</h3>
              <p>Brushes, canvas, journals & premium pens.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
