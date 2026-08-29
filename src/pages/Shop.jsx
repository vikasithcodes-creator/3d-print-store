import { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import './Shop.css';

export default function Shop() {
  const { products, categories } = useProducts();
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
  }, [searchQuery, sortBy, products]);

  // Intersection Observer for scroll-based category highlighting
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: 0
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.dataset.category);
        }
      });
    }, options);

    // Observe all category sections
    Object.values(categoryRefs.current).forEach(ref => {
      if (ref) observerRef.current.observe(ref);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredProducts]);

  const scrollToCategory = (categoryId) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      const offset = 150; // Account for sticky headers
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
    <div className="shop">
      <div className="container">
        <div className="shop-header">
          <h1>Shop</h1>
          <p>Browse our collection of precision 3D printed products</p>
        </div>

        {/* Sticky Category Navigation */}
        <div className="category-nav-wrapper">
          <div className="category-nav">
            <button
              className={`category-nav-item ${activeCategory === 'all' ? 'category-nav-item--active' : ''}`}
              onClick={() => {
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
  );
}
