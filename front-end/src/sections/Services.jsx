import React from 'react';
import { FiPrinter, FiBookOpen, FiCompass, FiAward } from 'react-icons/fi';
import './Services.css';

const Services = ({ onServiceClick }) => {
  const servicesData = [
    {
      id: 'print',
      icon: <FiPrinter />,
      title: 'Online Xerox & Printing',
      desc: 'High-speed document printing from PDF/Doc files. Custom single/double-sided options, lamination, and spiral binding options with doorstep delivery.',
      rate: 'Starting at ₹1.5 / page',
      tag: 'Most Popular',
    },
    {
      id: 'books',
      icon: <FiBookOpen />,
      title: 'Bookstore & Syllabus',
      desc: 'Academic textbooks (engineering, medicine, schooling), entrance exam prep resources, syllabus bundles, literature novels, and children guides.',
      rate: 'Up to 15% discount',
      tag: 'Huge Stock',
    },
    {
      id: 'stationery',
      icon: <FiCompass />,
      title: 'Premium Stationery',
      desc: 'Luxury notebooks, fine art canvas supplies, calligraphy sets, brushes, folders, calculators, and high-quality writing instruments.',
      rate: 'Curated Brands',
      tag: 'Best Quality',
    },
    {
      id: 'gifts',
      icon: <FiAward />,
      title: 'Corporate & Student Gifts',
      desc: 'Custom corporate diary printing, mug sublimation, photo frame mounts, and custom student academic planner kits.',
      rate: 'Custom Orders',
      tag: 'Exclusive',
    },
  ];

  return (
    <section id="services" className="services-section section">
      <div className="container">
        
        <div className="section-header">
          <span className="badge badge-accent">What We Do</span>
          <h2>Our Specialized Services</h2>
          <p>We combine digital speed with paper craft precision. Find academic materials, art supplies, and high-volume printing all in one premium hub.</p>
        </div>

        <div className="services-grid">
          {servicesData.map((svc) => (
            <div key={svc.id} className="service-card glass-card">
              {svc.tag && <span className="service-tag badge badge-accent">{svc.tag}</span>}
              <div className="service-icon-wrapper">{svc.icon}</div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <div className="service-footer">
                <span className="service-rate">{svc.rate}</span>
                <button
                  onClick={() => onServiceClick(svc.id)}
                  className="btn btn-secondary btn-sm service-action-btn"
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
