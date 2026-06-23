import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiPercent } from 'react-icons/fi';
import './Offers.css';

const Offers = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const offersData = [
    {
      id: 1,
      tag: 'Student Exclusive',
      title: 'Flat 10% Off on Books & Art Supplies',
      desc: 'Show your university or school ID card at pick-up or upload it with your order to claim discount on any textbook and fine arts purchase.',
      code: 'STUDENT10',
      bgGradient: 'linear-gradient(135deg, #1C1C1E 0%, var(--accent-glow) 100%)',
    },
    {
      id: 2,
      tag: 'Bulk Xerox printing',
      title: 'Get prints at just ₹1.5 / page',
      desc: 'Printing a syllabus handbook or exam prep papers? For printing orders above 250 pages, rates drop automatically. Spiral binding is 20% off!',
      code: 'BULKPRINT',
      bgGradient: 'linear-gradient(135deg, #1C1C1E 0%, rgba(52, 199, 89, 0.08) 100%)',
    },
    {
      id: 3,
      tag: 'Fast Shipping',
      title: 'Free Doorstep Delivery above ₹999',
      desc: 'Get your textbooks, custom printed notebooks, and binded Xerox files dispatched directly to your doorstep. Safe packaging ensured.',
      code: 'FREESHIP',
      bgGradient: 'linear-gradient(135deg, #1C1C1E 0%, rgba(0, 122, 255, 0.08) 100%)',
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === offersData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? offersData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="offers-section section">
      <div className="container">
        
        <div className="offers-slider-wrapper glass-card">
          <div className="slider-nav-btns">
            <button onClick={handlePrev} className="btn-icon-only slider-btn" aria-label="Previous Offer">
              <FiChevronLeft />
            </button>
            <button onClick={handleNext} className="btn-icon-only slider-btn" aria-label="Next Offer">
              <FiChevronRight />
            </button>
          </div>

          <div
            className="offers-carousel-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {offersData.map((offer) => (
              <div
                key={offer.id}
                className="offer-slide"
                style={{ background: offer.bgGradient }}
              >
                <div className="offer-content">
                  <span className="offer-tag-badge">
                    <FiPercent /> {offer.tag}
                  </span>
                  <h2 className="offer-title">{offer.title}</h2>
                  <p className="offer-desc">{offer.desc}</p>
                  <div className="offer-promo-code">
                    Use Code: <span>{offer.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots selector */}
          <div className="slider-indicator-dots">
            {offersData.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Offers;
