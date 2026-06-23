import React, { useState } from 'react';
import { FiSend, FiPhoneCall, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">

        <div className="section-header">
          <span className="badge badge-accent">Find Us</span>
          <h2>Get in Touch with Us</h2>
          <p>Have questions about bulk textbook sourcing, custom diary prints, or special print binding? Write to us or visit our storefront.</p>
        </div>

        <div className="contact-grid">

          {/* Col 1: Contact Form */}
          <div className="contact-form-card glass-card">
            {submitted ? (
              <div className="form-success-state animate-fade-in">
                <FiCheckCircle className="success-icon" />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. Our staff will review your message and respond via email or phone call within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3>Send Us a Message</h3>

                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. John Doe"
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g. john@example.com"
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Bulk Xerox Printing Query"
                    className="input-field"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Message details</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Describe your query in detail..."
                    className="input-field contact-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary contact-submit-btn">
                  <FiSend /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Col 2: Info & Mock Map */}
          <div className="contact-info-col">
            {/* Info Cards */}
            <div className="info-cards-list">
              <div className="info-row-card glass-card">
                <FiMapPin className="info-card-icon" />
                <div className="info-card-text">
                  <h4>Our Location</h4>
                  <p>Near Siddharadha College, Vikarabad, Telangana 501101</p>
                </div>
              </div>

              <div className="info-row-card glass-card">
                <FiPhoneCall className="info-card-icon" />
                <div className="info-card-text">
                  <h4>Phone & Call</h4>
                  <p>+91 9866279641  <br />+91 98765 43211 (Xerox Desk)</p>
                </div>
              </div>

              <div className="info-row-card glass-card">
                <FiClock className="info-card-text-icon info-row-card-clock">
                  <FiClock className="info-card-icon" />
                </FiClock>
                <div className="info-card-text">
                  <h4>Store Timings</h4>
                  <p>Mon - Sat: 9:00 AM - 9:00 PM <br />Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Mock Map Card */}
            <div className="mock-map-card glass-card">
              <div className="map-graphic-bg">
                {/* Map Grid Patterns */}
                <div className="map-grid-line h-line line-1"></div>
                <div className="map-grid-line h-line line-2"></div>
                <div className="map-grid-line v-line line-3"></div>
                <div className="map-grid-line v-line line-4"></div>

                {/* Simulated Landmarks */}
                <div className="map-landmark university">Siddhardha Degree College</div>
                <div className="map-landmark metro">Vikarabad Bus Stand</div>

                {/* Blinking Pin */}
                <div className="map-pin-wrapper">
                  <div className="map-pin-dot"></div>
                  <div className="map-pin-pulse"></div>
                  <span className="map-pin-label">Sri Balaji Xerox Center</span>
                </div>
              </div>
              <div className="map-footer-row">
                <div className="map-coords">22.5746° N, 88.3639° E</div>
                <a
                  href="https://maps.google.com/?q=Presidency+University+College+Street+Kolkata"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm directions-btn"
                >
                  Open Directions
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
