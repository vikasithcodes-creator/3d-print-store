import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import Button from '../components/Button';
import Input from '../components/Input';
import './Checkout.css';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the order to a backend
    console.log('Order submitted:', { formData, cart, total: getCartTotal() });
    setOrderPlaced(true);
    clearCart();
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page page-section">
        <div className="container page-section">
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <h1>Your cart is empty</h1>
            <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-6)' }}>
              Add some products before checking out
            </p>
            <Link to="/shop">
              <Button size="large">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page page-section">
        <div className="container page-section">
          <div className="success-message page-section">
            <div className="success-icon page-section">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>
              Thank you for your order. We'll send you a confirmation email shortly with tracking details.
            </p>
            <Link to="/shop">
              <Button size="large">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page page-section">
      <div className="container page-section">
        <h1>Checkout</h1>

        <div className="checkout-layout page-section">
          <form className="checkout-form page-section" onSubmit={handleSubmit}>
            <div className="form-section page-section">
              <h2>Customer Information</h2>
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <div className="form-row page-section">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-section page-section">
              <h2>Shipping Address</h2>
              <Input
                label="Street Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <div className="form-row page-section">
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row page-section">
                <Input
                  label="PIN Code"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="e.g., 110001"
                  required
                />
                <div className="input-group page-section">
                  <label htmlFor="country" className="input-label page-section">
                    Country<span className="required page-section">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="input page-section"
                  >
                    <option value="India">India</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <Button type="submit" size="large" fullWidth>
              Place Order
            </Button>
          </form>

          <div className="order-summary-checkout page-section">
            <h2>Order Summary</h2>

            <div className="order-items page-section">
              {cart.map(item => (
                <div key={item.cartId} className="order-item page-section">
                  <div className="order-item-image page-section">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                    </svg>
                  </div>
                  <div className="order-item-details page-section">
                    <div className="order-item-name page-section">{item.name}</div>
                    <div className="order-item-meta page-section">Qty: {item.quantity}</div>
                  </div>
                  <div className="order-item-price page-section">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-row page-section">
              <span>Subtotal</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>

            <div className="summary-row page-section">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-total page-section">
              <span>Total</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
