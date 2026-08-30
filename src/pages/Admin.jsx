import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../utils/format';
import './Admin.css';

export default function Admin() {
  const { isAdmin, login, logout } = useAdmin();
  const {
    products,
    categories,
    updateProduct,
    addProduct,
    deleteProduct,
    resetToDefaults,
    exportToCode
  } = useProducts();

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [exportedCode, setExportedCode] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [filterFeatured, setFilterFeatured] = useState('all');

  // Track form changes
  useEffect(() => {
    if (editingProduct) {
      setHasUnsavedChanges(true);
    }
  }, [editingProduct]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(password);
    if (result.success) {
      setLoginError('');
      setPassword('');
    } else {
      setLoginError(result.error || 'Login failed');
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct({ ...product });
    setHasUnsavedChanges(false);
    setShowEditModal(true);
  };

  // Add new product
  const handleAddNew = () => {
    setEditingProduct({
      name: '',
      slug: '',
      description: '',
      price: 999,
      category: 'desk-accessories',
      images: [],
      materials: ['PLA', 'PETG'],
      colors: ['Black', 'White'],
      dimensions: '',
      printTime: '',
      inStock: true,
      featured: false,
      rating: 5.0,
      reviews: 0
    });
    setHasUnsavedChanges(false);
    setShowEditModal(true);
  };

  // Close modal with confirmation
  const handleCloseModal = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Discard them?')) {
        setShowEditModal(false);
        setEditingProduct(null);
        setHasUnsavedChanges(false);
      }
    } else {
      setShowEditModal(false);
      setEditingProduct(null);
    }
  };

  // Update field
  const updateField = (field, value) => {
    setEditingProduct({ ...editingProduct, [field]: value });
  };

  // Add image
  const addImage = () => {
    const newImages = [...(editingProduct.images || []), ''];
    updateField('images', newImages);
  };

  // Update image at index
  const updateImage = (index, value) => {
    const newImages = [...(editingProduct.images || [])];
    newImages[index] = value;
    updateField('images', newImages);
  };

  // Remove image at index
  const removeImage = (index) => {
    const newImages = [...(editingProduct.images || [])];
    newImages.splice(index, 1);
    updateField('images', newImages);
  };

  // Save product
  const handleSave = () => {
    if (!editingProduct.name || !editingProduct.price) {
      alert('Product name and price are required');
      return;
    }

    // Clean up all arrays to ensure they are never undefined/null
    const cleanedProduct = {
      ...editingProduct,
      images: Array.isArray(editingProduct.images)
        ? editingProduct.images.filter(img => img && img.trim())
        : [],
      materials: Array.isArray(editingProduct.materials)
        ? editingProduct.materials
        : ['PLA', 'PETG'],
      colors: Array.isArray(editingProduct.colors)
        ? editingProduct.colors
        : ['Black', 'White']
    };

    if (cleanedProduct.id) {
      updateProduct(cleanedProduct.id, cleanedProduct);
    } else {
      addProduct(cleanedProduct);
    }

    setShowEditModal(false);
    setEditingProduct(null);
    setHasUnsavedChanges(false);
  };

  // Delete product
  const handleDelete = (product) => {
    if (window.confirm(`Delete "${product.name}"?\n\nThis action cannot be undone.`)) {
      deleteProduct(product.id);
    }
  };

  // Export code
  const handleExport = () => {
    const code = exportToCode();
    setExportedCode(code);
    setShowExportModal(true);
  };

  // Copy to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(exportedCode);
    alert('Code copied to clipboard!\n\nReplace src/data/products.js with this code, then commit to Git.');
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.slug.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filterCategory !== 'all' && product.category !== filterCategory) {
      return false;
    }

    // Stock filter
    if (filterStock === 'in-stock' && !product.inStock) return false;
    if (filterStock === 'out-of-stock' && product.inStock) return false;

    // Featured filter
    if (filterFeatured === 'featured' && !product.featured) return false;
    if (filterFeatured === 'not-featured' && product.featured) return false;

    return true;
  });

  // If not logged in, show login screen
  if (!isAdmin) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <h1>SM Studio</h1>
          <p className="admin-login-subtitle">Admin Panel</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {loginError && <p className="error">{loginError}</p>}
            <button type="submit" className="btn btn--primary btn--full">Login</button>
            <p className="hint">Default password: admin123</p>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-titles">
            <h1>SM Studio</h1>
            <p className="admin-subtitle">Admin Panel</p>
          </div>
          <button onClick={logout} className="btn btn--secondary">Logout</button>
        </div>
        <div className="admin-page-title">
          <h2>Product Management</h2>
          <p className="admin-page-subtitle">Manage your product catalog, pricing, and inventory</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-value">{products.length}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{products.filter(p => p.inStock).length}</div>
          <div className="stat-label">In Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{products.filter(p => p.featured).length}</div>
          <div className="stat-label">Featured</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{categories.length - 1}</div>
          <div className="stat-label">Categories</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-toolbar-primary">
          <button onClick={handleAddNew} className="btn btn--primary">
            <span className="btn-icon">+</span>
            Add Product
          </button>
          <button onClick={handleExport} className="btn btn--secondary">
            Export products.js
          </button>
        </div>
        <div className="admin-toolbar-secondary">
          <button
            onClick={() => {
              if (window.confirm('Reset all products to defaults?\n\nAll your changes will be lost. This cannot be undone.')) {
                resetToDefaults();
              }
            }}
            className="btn btn--danger"
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <div className="filter-search">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="search-icon">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search products by name, slug, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-search-input"
          />
        </div>
        <div className="filter-dropdowns">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c.id !== 'all').map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Stock Status</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <select
            value={filterFeatured}
            onChange={(e) => setFilterFeatured(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Products</option>
            <option value="featured">Featured Only</option>
            <option value="not-featured">Not Featured</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="admin-results">
        <p className="results-text">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Table */}
      <div className="admin-products-table">
        <table>
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Image</th>
              <th>Product</th>
              <th style={{ width: '120px' }}>Price</th>
              <th style={{ width: '160px' }}>Category</th>
              <th style={{ width: '120px' }}>Stock</th>
              <th style={{ width: '80px' }}>Featured</th>
              <th style={{ width: '140px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="product-thumb">
                      {product.images && product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }} />
                      ) : null}
                      <div className="product-thumb-placeholder" style={{ display: product.images && product.images[0] ? 'none' : 'flex' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="product-info-cell">
                      <div className="product-name">{product.name}</div>
                      <div className="product-slug">/{product.slug}</div>
                    </div>
                  </td>
                  <td>
                    <div className="product-price">{formatPrice(product.price)}</div>
                  </td>
                  <td>
                    <span className="category-badge">
                      {categories.find(c => c.id === product.category)?.name || product.category}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${product.inStock ? 'status-badge--success' : 'status-badge--error'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="text-center">
                    {product.featured && <span className="featured-icon">⭐</span>}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(product)} className="btn-action btn-action--edit" title="Edit Product">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product)} className="btn-action btn-action--delete" title="Delete Product">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  <div className="no-results-content">
                    <p>No products found matching your filters.</p>
                    {(searchQuery || filterCategory !== 'all' || filterStock !== 'all' || filterFeatured !== 'all') && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setFilterCategory('all');
                          setFilterStock('all');
                          setFilterFeatured('all');
                        }}
                        className="btn btn--secondary btn--small"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Product Modal */}
      {showEditModal && editingProduct && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-content">
                <h2>{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
                {editingProduct.id && editingProduct.name && (
                  <p className="modal-subtitle">{editingProduct.name}</p>
                )}
              </div>
              <button onClick={handleCloseModal} className="modal-close" aria-label="Close">×</button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* Section 1: Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">
                      Product Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingProduct.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Geometric Desk Organizer"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">URL Slug</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingProduct.slug}
                      onChange={(e) => updateField('slug', e.target.value)}
                      placeholder="geometric-desk-organizer"
                    />
                    <p className="form-help">Auto-generated from product name if left empty</p>
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={editingProduct.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    rows="3"
                    placeholder="Enter product description..."
                  />
                </div>
              </div>

              {/* Section 2: Pricing & Category */}
              <div className="form-section">
                <h3 className="form-section-title">Pricing & Category</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">
                      Price <span className="required">*</span>
                    </label>
                    <div className="form-input-group">
                      <span className="form-input-prefix">₹</span>
                      <input
                        type="number"
                        className="form-input form-input--with-prefix"
                        value={editingProduct.price}
                        onChange={(e) => updateField('price', Number(e.target.value))}
                        min="0"
                        step="1"
                      />
                    </div>
                    <p className="form-help">Price in Indian Rupees</p>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={editingProduct.category}
                      onChange={(e) => updateField('category', e.target.value)}
                    >
                      {categories.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Product Images */}
              <div className="form-section">
                <h3 className="form-section-title">Product Images</h3>
                <p className="form-section-description">
                  Add images to <code>public/products/</code> folder, then enter their paths below.
                </p>
                <div className="image-manager">
                  {editingProduct.images && editingProduct.images.length > 0 ? (
                    editingProduct.images.map((image, index) => (
                      <div key={index} className="image-item">
                        <div className="image-item-preview">
                          {image ? (
                            <img src={image} alt={`Product ${index + 1}`} onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }} />
                          ) : null}
                          <div className="image-item-placeholder" style={{ display: image ? 'none' : 'flex' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                          </div>
                        </div>
                        <div className="image-item-content">
                          <input
                            type="text"
                            className="form-input form-input--small"
                            value={image}
                            onChange={(e) => updateImage(index, e.target.value)}
                            placeholder="/products/my-image.jpg"
                          />
                          <button
                            type="button"
                            className="btn-action btn-action--delete btn-action--small"
                            onClick={() => removeImage(index)}
                            title="Remove image"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="image-empty-state">
                      <p>No images added yet</p>
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn--secondary btn--small"
                    onClick={addImage}
                  >
                    + Add Image
                  </button>
                </div>
              </div>

              {/* Section 4: Product Specifications */}
              <div className="form-section">
                <h3 className="form-section-title">Product Specifications</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Dimensions</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingProduct.dimensions}
                      onChange={(e) => updateField('dimensions', e.target.value)}
                      placeholder="15cm × 10cm × 8cm"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Print Time</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingProduct.printTime}
                      onChange={(e) => updateField('printTime', e.target.value)}
                      placeholder="6-8 hours"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: Product Status */}
              <div className="form-section">
                <h3 className="form-section-title">Product Status</h3>
                <div className="form-toggle-group">
                  <div className="form-toggle">
                    <div className="form-toggle-content">
                      <div className="form-toggle-label">In Stock</div>
                      <div className="form-toggle-description">Product is available for purchase</div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={editingProduct.inStock}
                        onChange={(e) => updateField('inStock', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="form-toggle">
                    <div className="form-toggle-content">
                      <div className="form-toggle-label">Featured Product</div>
                      <div className="form-toggle-description">Show this product in featured sections</div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={editingProduct.featured}
                        onChange={(e) => updateField('featured', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button onClick={handleCloseModal} className="btn btn--secondary">Cancel</button>
              <button onClick={handleSave} className="btn btn--primary">
                {editingProduct.id ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Code Modal */}
      {showExportModal && (
        <div className="modal-backdrop" onClick={() => setShowExportModal(false)}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-content">
                <h2>Export products.js</h2>
                <p className="modal-subtitle">Copy this code to commit your changes to Git</p>
              </div>
              <button onClick={() => setShowExportModal(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <p className="export-instructions">
                Copy the code below and replace the contents of <code>src/data/products.js</code>, then commit to Git.
              </p>
              <textarea
                className="code-export"
                value={exportedCode}
                readOnly
                rows="20"
              />
            </div>
            <div className="modal-footer">
              <button onClick={handleCopyCode} className="btn btn--primary">Copy to Clipboard</button>
              <button onClick={() => setShowExportModal(false)} className="btn btn--secondary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
