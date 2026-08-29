import { useState } from 'react';
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
      images: [''],
      materials: ['PLA', 'PETG'],
      colors: ['Black', 'White'],
      dimensions: '',
      printTime: '',
      inStock: true,
      featured: false
    });
    setShowEditModal(true);
  };

  // Save product
  const handleSave = () => {
    if (!editingProduct.name || !editingProduct.price) {
      alert('Name and price are required');
      return;
    }

    // Clean up images array (remove empty strings)
    const cleanedProduct = {
      ...editingProduct,
      images: Array.isArray(editingProduct.images)
        ? editingProduct.images.filter(img => img && img.trim())
        : ['/products/placeholder.jpg']
    };

    if (cleanedProduct.id) {
      updateProduct(cleanedProduct.id, cleanedProduct);
    } else {
      addProduct(cleanedProduct);
    }

    setShowEditModal(false);
    setEditingProduct(null);
  };

  // Delete product
  const handleDelete = (product) => {
    if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
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
    alert('Code copied to clipboard! Replace src/data/products.js with this code.');
  };

  // If not logged in, show login screen
  if (!isAdmin) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <h1>SM Studio Admin</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {loginError && <p className="error">{loginError}</p>}
            <button type="submit">Login</button>
            <p className="hint">Default password: admin123</p>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>SM Studio Admin Panel</h1>
        <button onClick={logout} className="btn btn--secondary">Logout</button>
      </div>

      <div className="admin-toolbar">
        <button onClick={handleAddNew} className="btn btn--primary">+ Add Product</button>
        <button onClick={handleExport} className="btn btn--secondary">Export products.js</button>
        <button onClick={() => {
          if (window.confirm('Reset all products to defaults? Your changes will be lost.')) {
            resetToDefaults();
          }
        }} className="btn btn--danger">Reset to Defaults</button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>{products.length}</h3>
          <p>Total Products</p>
        </div>
        <div className="stat-card">
          <h3>{products.filter(p => p.inStock).length}</h3>
          <p>In Stock</p>
        </div>
        <div className="stat-card">
          <h3>{products.filter(p => p.featured).length}</h3>
          <p>Featured</p>
        </div>
      </div>

      <div className="admin-products-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="product-thumb">
                    {product.images && product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : (
                      <div className="placeholder">No image</div>
                    )}
                  </div>
                </td>
                <td>
                  <strong>{product.name}</strong>
                  <br />
                  <small>/{product.slug}</small>
                </td>
                <td>
                  <strong>{formatPrice(product.price)}</strong>
                </td>
                <td>
                  <span className="category-badge">
                    {categories.find(c => c.id === product.category)?.name || product.category}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td>
                  {product.featured && <span className="featured-star">⭐</span>}
                </td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => handleEdit(product)} className="btn-icon" title="Edit">
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(product)} className="btn-icon btn-danger" title="Delete">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Product Modal */}
      {showEditModal && (
        <div className="modal-backdrop" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowEditModal(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <label>
                  Product Name *
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </label>
                <label>
                  URL Slug
                  <input
                    type="text"
                    value={editingProduct.slug}
                    onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                    placeholder="auto-generated-from-name"
                  />
                </label>
              </div>

              <label>
                Description
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows="3"
                />
              </label>

              <div className="form-row">
                <label>
                  Price (₹) *
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  />
                </label>
                <label>
                  Category
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  >
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Image Paths (one per line)
                <textarea
                  value={Array.isArray(editingProduct.images) ? editingProduct.images.join('\n') : ''}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    images: e.target.value.split('\n').filter(line => line.trim())
                  })}
                  rows="3"
                  placeholder="/products/my-image.jpg&#10;/products/my-image-2.jpg"
                />
                <small>Add images to public/products/ folder, then enter paths like /products/image.jpg</small>
              </label>

              <div className="form-row">
                <label>
                  Dimensions
                  <input
                    type="text"
                    value={editingProduct.dimensions}
                    onChange={(e) => setEditingProduct({ ...editingProduct, dimensions: e.target.value })}
                    placeholder="15cm × 10cm × 8cm"
                  />
                </label>
                <label>
                  Print Time
                  <input
                    type="text"
                    value={editingProduct.printTime}
                    onChange={(e) => setEditingProduct({ ...editingProduct, printTime: e.target.value })}
                    placeholder="6-8 hours"
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  />
                  In Stock
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                  />
                  Featured Product
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowEditModal(false)} className="btn btn--secondary">Cancel</button>
              <button onClick={handleSave} className="btn btn--primary">Save Product</button>
            </div>
          </div>
        </div>
      )}

      {/* Export Code Modal */}
      {showExportModal && (
        <div className="modal-backdrop" onClick={() => setShowExportModal(false)}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Export products.js</h2>
              <button onClick={() => setShowExportModal(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <p>Copy this code and replace the contents of <code>src/data/products.js</code>, then commit to Git.</p>
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
