import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './FeaturedProducts.css';

const FeaturedProducts = ({ onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Collection' },
    { id: 'books', label: 'Bookstore' },
    { id: 'stationery', label: 'Stationery' },
    { id: 'gifts', label: 'Customized Gifts' },
  ];

  const productsData = [
    {
      id: 'book-1',
      name: 'The Ink & Pages Anthology',
      price: 399,
      originalPrice: 499,
      category: 'books',
      rating: 4.8,
      image: '/images/book_cover.png',
      tag: 'Bestseller',
      description: 'A premium, custom-bound literature novel exploring printing history, library mysteries, and the written word. Intricate cover craftsmanship.',
    },
    {
      id: 'journal-1',
      name: 'Aesthetic Tan Leather Journal',
      price: 1650,
      originalPrice: 1950,
      category: 'stationery',
      rating: 4.9,
      image: '/images/stationery_notebook.png',
      tag: 'Premium',
      description: 'Top-grain luxury handcrafted leather journal. Packed with 120GSM warm wood-free cream paper. Fits fountain pens without bleeding.',
    },
    {
      id: 'book-2',
      name: 'Fundamentals of Electrical Engineering',
      price: 599,
      originalPrice: 699,
      category: 'books',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop',
      tag: 'Academic',
      description: 'Comprehensive guide covering circuits, systems, electrical machines, and modern power electronics. Core textbook for undergraduates.',
    },
    {
      id: 'book-3',
      name: 'Indian Polity (6th Edition) - M. Laxmikanth',
      price: 650,
      originalPrice: 750,
      category: 'books',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
      tag: 'UPSC Guide',
      description: 'The definitive handbook for civil services and state service entrance examinations. Covers constitutional frameworks and local governments.',
    },
    {
      id: 'pen-1',
      name: 'Parker Sonnet Matte Black Fountain Pen',
      price: 2200,
      originalPrice: 2500,
      category: 'stationery',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop',
      tag: 'Elegant',
      description: 'Timeless luxury pen with a matte black barrel and shiny gold trim accents. Outfitted with an 18k gold plated stainless steel nib.',
    },
    {
      id: 'brush-1',
      name: 'Winsor & Newton Watercolour Set',
      price: 850,
      originalPrice: 999,
      category: 'stationery',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
      tag: 'Art Supplies',
      description: 'Professional-grade brushes with natural synthetic hair fibers. Offers superb fluid flow, color carrying capacity, and retention.',
    },
    {
      id: 'gift-1',
      name: 'Personalized Custom Ceramic Mug',
      price: 299,
      originalPrice: 399,
      category: 'gifts',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
      tag: 'Custom',
      description: 'Personalized sublimation printing on double-wall matte black mugs. Dishwasher and microwave safe. Upload your design at checkout.',
    },
    {
      id: 'gift-2',
      name: 'Executive Custom Planner 2026',
      price: 599,
      originalPrice: 799,
      category: 'gifts',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop',
      tag: 'New',
      description: 'Hardcover leatherette executive student planner. Custom debossing available. Weekly, monthly layout grids and goal setting maps.',
    },
  ];

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="shop" className="featured-section section">
      <div className="container">
        
        <div className="section-header">
          <span className="badge badge-accent">Our Inventory</span>
          <h2>Shop Bookstore & Supplies</h2>
          <p>Browse books across standard categories, discover premium writing paper, or choose a customizable accessory gift card.</p>
        </div>

        {/* Toolbar: Category selection and Search query */}
        <div className="shop-toolbar glass-panel">
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="shop-search-bar">
            <input
              type="text"
              placeholder="Search product name..."
              className="input-field search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-products-state glass-card">
            <h3>No Products Found</h3>
            <p>We couldn't find anything matching your search term. Try checking another category or refining your spellings.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;
