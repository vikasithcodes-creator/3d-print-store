import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, getProductBySlug, updateProduct } = useProducts();
  const { isAdmin } = useAdmin();
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();

  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(product?.price || 0);

  useEffect(() => {
    if (product) {
      setSelectedMaterial(product.materials?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
      setNewPrice(product.price);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h1>Product Not Found</h1>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-6)' }}>
          The product you're looking for doesn't exist.
        </p>
        <Link to="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const handleSavePrice = () => {
    updateProduct(product.id, { price: Number(newPrice) });
    setIsEditingPrice(false);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      material: selectedMaterial,
      color: selectedColor
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-page">
      {/* Admin quick toolbar */}
      {isAdmin && (
        <div style={{
          background: '#000',
          color: '#fff',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px'
        }}>
          <div>
            <span>🛠️ <strong>Dev Mode:</strong> {product.name} (ID: {product.id})</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/admin" style={{ color: '#fff', textDecoration: 'underline' }}>
              Open Admin Dashboard
            </Link>
          </div>
        </div>
      )}

      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-layout">
          <div className="product-gallery">
            <div className="main-image">
              {product.images && product.images[0] ? (
                <img src={product.images[0]} alt={product.name} />
              ) : (
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              )}
            </div>
          </div>

          <div className="product-details">
            <h1>{product.name}</h1>

            <div className="product-price" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {isEditingPrice ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>₹</span>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '20px',
                      width: '120px',
                      border: '2px solid #000',
                      borderRadius: '4px'
                    }}
                    autoFocus
                  />
                  <button onClick={handleSavePrice} className="btn btn--primary" style={{ padding: '6px 12px' }}>
                    Save
                  </button>
                  <button onClick={() => setIsEditingPrice(false)} className="btn btn--secondary" style={{ padding: '6px 12px' }}>
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span>{formatPrice(product.price)}</span>
                  {isAdmin && (
                    <button
                      onClick={() => setIsEditingPrice(true)}
                      style={{
                        background: '#eee',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                      title="Edit Price (Admin)"
                    >
                      ✏️ Edit Price
                    </button>
                  )}
                </>
              )}
            </div>

            {product.rating && (
              <div className="product-rating">
                <span className="stars">★ {product.rating}</span>
                {product.reviews && (
                  <span className="review-count">({product.reviews} reviews)</span>
                )}
              </div>
            )}

            <p className="product-description">{product.description}</p>

            {product.materials && product.materials.length > 0 && (
              <div className="option-group">
                <label className="option-label">Material</label>
                <div className="option-buttons">
                  {product.materials.map(material => (
                    <button
                      key={material}
                      className={`option-btn ${selectedMaterial === material ? 'option-btn--selected' : ''}`}
                      onClick={() => setSelectedMaterial(material)}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="option-group">
                <label className="option-label">Color</label>
                <div className="option-buttons">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`option-btn ${selectedColor === color ? 'option-btn--selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="quantity-selector">
              <span className="quantity-label">Quantity</span>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="product-actions">
              <Button size="large" fullWidth onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="secondary" size="large" fullWidth onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            <div className="info-section">
              <h2>Specifications</h2>
              <div className="specs-grid">
                <div className="spec-item">
                  <div className="spec-label">Dimensions</div>
                  <div className="spec-value">{product.dimensions}</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Print Time</div>
                  <div className="spec-value">{product.printTime}</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Materials</div>
                  <div className="spec-value">{product.materials.join(', ')}</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Availability</div>
                  <div className="spec-value">{product.inStock ? 'In Stock' : 'Out of Stock'}</div>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h2>Shipping Information</h2>
              <p style={{ color: 'var(--color-gray-700)', lineHeight: 1.7 }}>
                Production time: {product.printTime}. Orders typically ship within 3-5 business days.
                Shipping costs calculated at checkout based on location.
              </p>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="product-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
