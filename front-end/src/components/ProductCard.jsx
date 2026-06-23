import React from 'react';
import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.floor(rating) ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="product-card glass-card">
      {/* Product Tag */}
      {product.tag && <span className="product-tag badge badge-accent">{product.tag}</span>}

      {/* Product Image Area */}
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <div className="product-overlay">
          <button
            onClick={() => onQuickView(product)}
            className="overlay-btn"
            title="Quick View"
            aria-label="Quick View"
          >
            <FiEye />
          </button>
          <button
            onClick={() => addToCart(product, 1)}
            className="overlay-btn"
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <FiShoppingBag />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <button
            onClick={() => toggleWishlist(product)}
            className={`wishlist-toggle ${wishlisted ? 'active' : ''}`}
            title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Toggle Wishlist"
          >
            <FiHeart />
          </button>
        </div>

        <h3 className="product-name" onClick={() => onQuickView(product)}>
          {product.name}
        </h3>

        <div className="product-rating">
          <div className="stars-wrapper">{renderStars(product.rating)}</div>
          <span className="rating-num">({product.rating})</span>
        </div>

        <div className="product-footer">
          <div className="price-wrapper">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product, 1)}
            className="btn-add-cart"
            aria-label="Add to cart"
          >
            <FiShoppingBag /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
