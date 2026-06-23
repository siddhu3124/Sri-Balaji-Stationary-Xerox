import React, { useState } from 'react';
import { FiX, FiShoppingBag, FiHeart, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './ProductModal.css';

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const wishlisted = isInWishlist(product.id);

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container glass-panel animate-zoom-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Quick View">
          <FiX />
        </button>

        <div className="modal-content-grid">
          {/* Column 1: Image */}
          <div className="modal-image-col">
            {product.tag && <span className="modal-product-tag badge badge-accent">{product.tag}</span>}
            <img src={product.image} alt={product.name} className="modal-image" />
          </div>

          {/* Column 2: Details */}
          <div className="modal-details-col">
            <span className="modal-category">{product.category}</span>
            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-rating">
              <span className="modal-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </span>
              <span className="modal-rating-val">{product.rating} (Customer reviews)</span>
            </div>

            <div className="modal-price-box">
              <span className="modal-price">₹{product.price}</span>
              {product.originalPrice && (
                <span className="modal-original-price">₹{product.originalPrice}</span>
              )}
            </div>

            <p className="modal-description">{product.description || 'No description available for this item. Experience premium quality craftwork, standard materials, and reliable service.'}</p>

            <div className="modal-meta-info">
              <p><strong>Availability:</strong> <span className="in-stock">In Stock (Fast dispatch)</span></p>
              <p><strong>Deliverable Area:</strong> Local printing shop pickup or city-wide shipping.</p>
            </div>

            {/* Actions */}
            <div className="modal-actions-area">
              <div className="modal-qty-picker">
                <button onClick={() => handleQuantityChange(-1)} className="qty-btn" aria-label="Decrease Quantity">
                  <FiMinus />
                </button>
                <span className="qty-value">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="qty-btn" aria-label="Increase Quantity">
                  <FiPlus />
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn btn-primary modal-add-btn">
                <FiShoppingBag /> Add to Cart
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`btn btn-secondary modal-wish-btn ${wishlisted ? 'wishlisted' : ''}`}
                aria-label="Wishlist"
              >
                <FiHeart /> {wishlisted ? 'Saved' : 'Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
