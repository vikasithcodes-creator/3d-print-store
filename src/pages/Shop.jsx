import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import Button from '../components/Button';
import './Shop.css';

export default function Shop() {
  const { products, categories } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState('all');

  const categoryRefs = useRef({});
  const observerRef = useRef(null);

  // Filter + sort logic
  useEffect(() => {
    let filtered = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'price-low': filtered.sort((a,b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a,b) => b.price - a.price); break;
      case 'name': filtered.sort((a,b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    setFilteredProducts(filtered);
  }, [searchQuery, sortBy, products]);

  // Category grouping (show all categories with products, like home)
  const groupedProducts = categories.reduce((acc, category) => {
    if (category.id === 'all') return acc;
    const list = filteredProducts.filter(p => p.category === category.id);
    if (list.length > 0) acc.push({ category, products: list });
    return acc;
  }, []);

  // Active-state scroll observer (same as home)
  useEffect(() => {
    const opts = { root: null, rootMargin: '-150px 0px -40% 0px', threshold: 0.1 };
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cat = entry.target.dataset.category;
          if (cat) setActiveCategory(cat);
        }
      });
    }, opts);
    setTimeout(() => {
      Object.values(categoryRefs.current).forEach(ref => { if (ref) observerRef.current.observe(ref); });
    }, 100);
    return () => observerRef.current?.disconnect();
  }, [filteredProducts]);

  const scrollToCategory = (id) => {
    const el = categoryRefs.current[id];
    if (el) {
      const offset = 150;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="shop">
      {/* Hero / Intro (compact, matching homepage tone) */}
      <section className="shop-hero">
        <div className="container">
          <div className="shop-hero-inner">
            <div>
              <h1>Browse Our Collection</h1>
              <p>Precision 3D printed products organized by category</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main shop layout — identical structure to homepage .shop-section */}
      <section className="shop-section">
        <div className="container">
          <div className="shop-layout">
            {/* LEFT SIDEBAR — reuse homepage category navigation exactly */}
            <aside className="category-nav-wrapper" aria-label="Category navigation">
              <nav className="category-nav">
                <button
                  className={`category-nav-item ${activeCategory === 'all' ? 'category-nav-item--active' : ''}`}
                  onClick={() => { setActiveCategory('all'); window.scrollTo({ top: document.querySelector('.shop-section').offsetTop - 70, behavior: 'smooth' }); }}
                >
                  All Products
                </button>
                {categories.filter(c => c.id !== 'all').map(cat => (
                  <button
                    key={cat.id}
                    className={`category-nav-item ${activeCategory === cat.id ? 'category-nav-item--active' : ''}`}
                    onClick={() => scrollToCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </aside>

            {/* RIGHT MAIN CONTENT */}
            <div className="shop-main">
              {/* Search + Sort toolbar */}
              <div className="shop-toolbar">
                <div className="search-box-inline">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <div className="toolbar-right">
                  <span className="results-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</span>
                  <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="featured">Featured</option>
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Product content grouped by category (same as home) */}
              <div className="shop-content">
                {groupedProducts.length > 0 ? (
                  groupedProducts.map(({ category, products }) => (
                    <div key={category.id} className="category-section" ref={el => categoryRefs.current[category.id] = el} data-category={category.id}>
                      <h2 className="category-title">{category.name}</h2>
                      <div className="product-grid">
                        {products.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-products"><p>No products found matching your criteria.</p></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
