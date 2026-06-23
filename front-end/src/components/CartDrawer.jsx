import React, { useState } from 'react';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiHeart, FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const { cart, wishlist, removeFromCart, updateQuantity, getCartTotal, addToCart, toggleWishlist } = useCart();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'checkout', 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    delivery: 'pickup', // 'pickup' or 'delivery'
  });

  if (!isOpen) return null;

  const handleQuantityChange = (itemId, currentQty, delta) => {
    updateQuantity(itemId, currentQty + delta);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product); // Remove from wishlist after moving to cart
  };

  const handleClose = () => {
    // Reset checkout state when closing
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="cart-drawer-overlay" onClick={handleClose}>
      <div className="cart-drawer-container glass-panel animate-slide-in" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          {checkoutStep !== 'success' && (
            <div className="cart-tabs">
              <button
                className={`cart-tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('cart');
                  setCheckoutStep('cart');
                }}
              >
                <FiShoppingBag /> Cart ({cart.length})
              </button>
              <button
                className={`cart-tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('wishlist');
                  setCheckoutStep('cart');
                }}
              >
                <FiHeart /> Wishlist ({wishlist.length})
              </button>
            </div>
          )}
          {checkoutStep === 'success' && <div className="cart-tabs-title">Success</div>}
          <button className="close-btn" onClick={handleClose} aria-label="Close Drawer">
            <FiX />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {checkoutStep === 'cart' && (
            <>
              {activeTab === 'cart' ? (
                /* SHOPPING CART TAB */
                cart.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">🛒</span>
                    <p className="empty-title">Your cart is empty</p>
                    <p className="empty-subtitle">Explore our collection and add books, stationery, or Xerox jobs.</p>
                    <button className="btn btn-primary" onClick={handleClose}>Start Shopping</button>
                  </div>
                ) : (
                  <div className="cart-items-list">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item glass-card">
                        <div className="cart-item-info">
                          <div className="cart-item-image">
                            {item.isPrintJob ? '📄' : <img src={item.image} alt={item.name} />}
                          </div>
                          <div className="cart-item-details">
                            <h4 className="cart-item-name">{item.name}</h4>
                            {item.isPrintJob ? (
                              <div className="print-specs">
                                <span>{item.config.pages} pages</span> • 
                                <span>{item.config.colorMode === 'color' ? 'Color' : 'B&W'}</span> • 
                                <span>{item.config.printSides === 'double' ? 'Double-sided' : 'Single-sided'}</span> • 
                                <span>{item.config.binding === 'spiral' ? 'Spiral' : item.config.binding === 'lamination' ? 'Lamination' : 'No binding'}</span>
                              </div>
                            ) : (
                              <p className="cart-item-category">{item.category}</p>
                            )}
                            <p className="cart-item-price">₹{item.price * item.quantity}</p>
                          </div>
                        </div>
                        <div className="cart-item-actions">
                          <div className="qty-controls">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                              className="qty-btn"
                            >
                              <FiMinus />
                            </button>
                            <span className="qty-val">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                              className="qty-btn"
                            >
                              <FiPlus />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="item-delete-btn"
                            title="Remove item"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* WISHLIST TAB */
                wishlist.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">💖</span>
                    <p className="empty-title">Your wishlist is empty</p>
                    <p className="empty-subtitle">Save products you love to your wishlist to buy them later.</p>
                  </div>
                ) : (
                  <div className="cart-items-list">
                    {wishlist.map((item) => (
                      <div key={item.id} className="cart-item glass-card">
                        <div className="cart-item-info">
                          <div className="cart-item-image">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="cart-item-details">
                            <h4 className="cart-item-name">{item.name}</h4>
                            <p className="cart-item-category">{item.category}</p>
                            <p className="cart-item-price">₹{item.price}</p>
                          </div>
                        </div>
                        <div className="wishlist-item-actions">
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="btn btn-primary btn-sm"
                          >
                            Move to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="item-delete-btn"
                            title="Remove from wishlist"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            /* CHECKOUT FORM */
            <form onSubmit={handleCheckoutSubmit} className="checkout-form">
              <h3 className="checkout-title">Customer Details</h3>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  title="Ten digit phone number"
                  className="input-field"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Service Type</label>
                <div className="select-wrapper">
                  <select
                    value={formData.delivery}
                    onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                  >
                    <option value="pickup">Self-Pickup (at Xerox Shop)</option>
                    <option value="delivery">Home Delivery</option>
                  </select>
                </div>
              </div>
              {formData.delivery === 'delivery' && (
                <div className="input-group">
                  <label className="input-label">Delivery Address</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Enter full address for delivery"
                    className="input-field"
                    style={{ resize: 'none' }}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              )}

              <div className="checkout-summary-box glass-panel">
                <h4>Order Summary</h4>
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <div className="summary-line">
                  <span>Delivery Charge</span>
                  <span>{formData.delivery === 'delivery' ? '₹40' : 'Free'}</span>
                </div>
                <div className="summary-line total">
                  <span>Total</span>
                  <span>₹{getCartTotal() + (formData.delivery === 'delivery' ? 40 : 0)}</span>
                </div>
              </div>

              <div className="checkout-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCheckoutStep('cart')}
                >
                  Back to Cart
                </button>
                <button type="submit" className="btn btn-accent">
                  Place Order
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            /* SUCCESS MOCK PAGE */
            <div className="success-state animate-fade-in">
              <div className="success-icon">
                <FiCheckCircle />
              </div>
              <h3 className="success-title">Order Placed Successfully!</h3>
              <p className="success-message">
                Thank you, <strong>{formData.name}</strong>! Your order has been registered.
              </p>
              <div className="order-details-box glass-card">
                <p><strong>Order ID:</strong> #IP-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p><strong>Service Type:</strong> {formData.delivery === 'pickup' ? 'Store Pickup' : 'Home Delivery'}</p>
                <p><strong>Contact phone:</strong> {formData.phone}</p>
                {formData.delivery === 'delivery' && (
                  <p><strong>Delivery Address:</strong> {formData.address}</p>
                )}
                <p className="success-hint">We have received your print documents and items. We will notify you via call or WhatsApp when they are ready.</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  // Clear cart, close drawer
                  setCart([]);
                  handleClose();
                }}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {checkoutStep === 'cart' && activeTab === 'cart' && cart.length > 0 && (
          <div className="cart-drawer-footer glass-panel">
            <div className="cart-total-row">
              <span className="total-label">Total Amount:</span>
              <span className="total-price">₹{getCartTotal()}</span>
            </div>
            <button className="btn btn-primary checkout-btn" onClick={() => setCheckoutStep('checkout')}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
