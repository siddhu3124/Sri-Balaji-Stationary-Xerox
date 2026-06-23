import React from 'react';
import './Gallery.css';

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      image: '/images/bookstore_interior.png',
      caption: 'Main Reading Library & Store Lounge',
      span: 'tall',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
      caption: 'Bestseller Literary Novels Stack',
      span: 'wide',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
      caption: 'Fine Art Calligraphy & Sketch supplies',
      span: 'normal',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop',
      caption: 'High-speed Xerox Printing Station',
      span: 'normal',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop',
      caption: 'Cozy Bookstore Corner & Student Nook',
      span: 'tall',
    },
  ];

  return (
    <section id="gallery" className="gallery-section section">
      <div className="container">
        
        <div className="section-header">
          <span className="badge badge-accent">Visual Tour</span>
          <h2>Explore Ink & Pages</h2>
          <p>Peek inside our bookstore, stationery displays, and printing centers located right near College Street.</p>
        </div>

        <div className="gallery-masonry-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className={`gallery-item ${item.span} glass-card`}>
              <img src={item.image} alt={item.caption} className="gallery-img" loading="lazy" />
              <div className="gallery-caption-overlay">
                <span className="gallery-caption-text">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
