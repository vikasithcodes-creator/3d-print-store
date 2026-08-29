import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SM Studio</h3>
            <p className="footer-description">
              Professional 3D printing services delivering precision and quality.
              From prototype to production, we bring your designs to life.
            </p>
          </div>

          <div className="footer-section">
            <h3>Shop</h3>
            <div className="footer-links">
              <Link to="/shop" className="footer-link">All Products</Link>
              <Link to="/shop?category=home-decor" className="footer-link">Home & Decor</Link>
              <Link to="/shop?category=desk-accessories" className="footer-link">Desk Accessories</Link>
              <Link to="/shop?category=tech" className="footer-link">Tech Accessories</Link>
              <Link to="/custom" className="footer-link">Custom Printing</Link>
            </div>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <div className="footer-links">
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/faq" className="footer-link">FAQ</Link>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-link">Terms & Conditions</Link>
            </div>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <div className="footer-links">
              <a href="mailto:hello@smstudio.com" className="footer-link">hello@smstudio.com</a>
              <a href="tel:+919876543210" className="footer-link">+91 98765 43210</a>
              <a href="https://wa.me/919876543210" className="footer-link" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} SM Studio. All rights reserved.
          </p>

          <div className="social-links">
            <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
            <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
