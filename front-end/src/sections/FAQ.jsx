import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: 'How do I upload document files for printing?',
      answer: 'Simply scroll to the "Xerox Printing" section, drag and drop your PDF, Word file, or images into the dropzone (or click to browse). Our document scanner will automatically verify the file and read the total page count. You can then configure color modes, print sides, and binding, and add it to your cart.',
    },
    {
      question: 'What file formats do you accept for Xerox printing?',
      answer: 'We accept PDF (.pdf), Word Documents (.doc, .docx), and standard image files (.jpg, .jpeg, .png). We recommend converting slides and text files to PDF beforehand to preserve exact formatting and layouts.',
    },
    {
      question: 'How long does it take to prepare my print job or book order?',
      answer: 'Standard printing orders (under 200 pages) are usually ready for pickup or dispatch within 2 to 4 hours. Larger bulk orders or books that need to be packaged may take up to 24 hours. We will call or WhatsApp you as soon as your order status is marked as complete.',
    },
    {
      question: 'Do you offer home delivery in the local area?',
      answer: 'Yes! We offer home delivery across the city. Delivery is free for all orders above ₹999, and a flat fee of ₹40 applies for smaller orders. You can select "Home Delivery" during checkout and fill in your delivery address details.',
    },
    {
      question: 'What are the charges for spiral binding and document lamination?',
      answer: 'We provide spiral binding at a flat rate of ₹50 per book copy, and lamination at ₹30 per document sheet. You can toggle these add-on preferences directly in the Live Printing Calculator to see cost calculations before placing your order.',
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section section">
      <div className="container">
        
        <div className="section-header">
          <span className="badge badge-accent">Help Center</span>
          <h2>Frequently Asked Questions</h2>
          <p>Find quick answers regarding our online print submissions, file requirements, delivery areas, and binding facilities.</p>
        </div>

        <div className="faq-accordions-wrapper">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-card glass-card ${isOpen ? 'open' : ''}`}>
                <button
                  className="faq-question-btn"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-toggle-icon">
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>
                <div className="faq-answer-panel">
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
