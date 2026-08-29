import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories, getFeaturedProducts } from '../data/products';
import Button from '../components/Button';
import './Home.css';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState('all');

  const categoryRefs = useRef({});
  const observerRef = useRef(null);

  useEffect(() => {
    let filtered = [...products];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, sortBy]);

  // Intersection Observer for scroll-based category highlighting
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-150px 0px -40% 0px',
      threshold: 0.1
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const category = entry.target.dataset.category;
          if (category) {
            setActiveCategory(category);
          }
        }
      });
    }, options);

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      Object.values(categoryRefs.current).forEach(ref => {
        if (ref) observerRef.current.observe(ref);
      });
    }, 100);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredProducts]);

  const scrollToCategory = (categoryId) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // Group products by category
  const groupedProducts = categories.reduce((acc, category) => {
    if (category.id === 'all') return acc;

    const categoryProducts = filteredProducts.filter(p => p.category === category.id);
    if (categoryProducts.length > 0) {
      acc.push({
        category,
        products: categoryProducts
      });
    }
    return acc;
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Designed to Exist. Printed to Perfection.</h1>
              <p>
                Transform your ideas into reality with precision 3D printing.
                Browse our curated collection or bring your own designs to life.
              </p>
              <div className="hero-cta">
                <button
                  onClick={() => window.scrollTo({ top: window.innerHeight - 70, behavior: 'smooth' })}
                  className="btn btn--primary btn--large"
                >
                  Shop Products
                </button>
                <Link to="/custom">
                  <Button variant="secondary" size="large">Request Custom Print</Button>
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-placeholder">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Shop Section */}
      <section className="shop-section">
        <div className="container">
          <div className="shop-intro">
            <h2>Browse Our Collection</h2>
            <p>Precision 3D printed products organized by category</p>
          </div>

          <div className="shop-layout">
            {/* Left Sidebar - Sticky Category Navigation */}
            <div className="category-nav-wrapper">
              <div className="category-nav">
                <button
                  className={`category-nav-item ${activeCategory === 'all' ? 'category-nav-item--active' : ''}`}
                  onClick={() => {
                    setActiveCategory('all');
                    window.scrollTo({ top: document.querySelector('.shop-section').offsetTop - 70, behavior: 'smooth' });
                  }}
                >
                  All Products
                </button>
                {groupedProducts.map(({ category }) => (
                  <button
                    key={category.id}
                    className={`category-nav-item ${activeCategory === category.id ? 'category-nav-item--active' : ''}`}
                    onClick={() => scrollToCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Main Content */}
            <div className="shop-main">
              {/* Search and Sort Toolbar */}
              <div className="shop-toolbar">
                <div className="search-box-inline">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="toolbar-right">
                  <span className="results-count">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Products Grouped by Category */}
              <div className="shop-content">
                {groupedProducts.length > 0 ? (
                  groupedProducts.map(({ category, products }) => (
                    <div
                      key={category.id}
                      className="category-section"
                      ref={el => categoryRefs.current[category.id] = el}
                      data-category={category.id}
                    >
                      <h2 className="category-title">{category.name}</h2>
                      <div className="product-grid">
                        {products.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-products">
                    <p>No products found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us</h2>
          </div>

          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3>High-Quality Prints</h3>
              <p>
                Every print is carefully produced with attention to detail and quality control.
              </p>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Custom Solutions</h3>
              <p>
                Upload your own 3D models and we'll print them according to your specifications.
              </p>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Fast Turnaround</h3>
              <p>
                Most orders ship within 3-5 business days with clear production timelines.
              </p>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3>Reliable Support</h3>
              <p>
                Clear communication from quote to delivery. We're here to help at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Printing CTA */}
      <section className="custom-cta">
        <div className="container">
          <h2>Have Your Own Design?</h2>
          <p>
            Upload your 3D model and get a custom quote. We support STL, OBJ, and 3MF formats.
          </p>
          <Link to="/custom">
            <Button variant="secondary" size="large">Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
