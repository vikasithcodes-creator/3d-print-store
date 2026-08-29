import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`} className="product-image">
        {product.images && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('has-placeholder');
            }}
          />
        ) : null}
        <div className="product-placeholder">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
          <polyline points="7.5 19.79 7.5 14.6 3 12"/>
          <polyline points="21 12 16.5 14.6 16.5 19.79"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          <span className="product-placeholder-text">3D Model Preview</span>
        </div>
      </Link>

      <div className="product-info">
        <Link to={`/product/${product.slug}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>

        <p className="product-description">{product.description}</p>

        {product.rating && (
          <div className="product-rating">
            <span className="stars">★ {product.rating}</span>
            {product.reviews && (
              <span className="review-count">({product.reviews})</span>
            )}
          </div>
        )}

        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>

          <div className="product-actions">
            <Link to={`/product/${product.slug}`}>
              <button className="icon-button" aria-label="View product">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
