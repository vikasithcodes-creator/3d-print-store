import { createContext, useContext, useState, useEffect } from 'react';
import { products as defaultProducts, categories } from '../data/products';

const ProductContext = createContext();

const STORAGE_KEY = 'sm_studio_products_data';

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load products from localStorage, falling back to default:', e);
    }
    return defaultProducts;
  });

  // Sync products to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage:', e);
    }
  }, [products]);

  // Update an existing product
  const updateProduct = (id, updatedFields) => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product.id === id) {
          // Ensure arrays remain arrays
          const ensureArray = (value, fallback) => {
            if (value === undefined) return fallback;
            if (Array.isArray(value)) return value;
            return fallback;
          };

          return {
            ...product,
            ...updatedFields,
            // Ensure numeric price
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : product.price,
            // Ensure arrays are always arrays
            images: ensureArray(updatedFields.images, product.images || []),
            materials: ensureArray(updatedFields.materials, product.materials || ['PLA', 'PETG']),
            colors: ensureArray(updatedFields.colors, product.colors || ['Black', 'White'])
          };
        }
        return product;
      })
    );
  };

  // Add a new product
  const addProduct = (newProductData) => {
    const maxId = products.reduce((max, p) => Math.max(max, p.id || 0), 0);
    const newId = maxId + 1;

    // Generate URL slug from name if not provided
    const slug = newProductData.slug || newProductData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Ensure arrays are always arrays, never undefined/null
    const ensureArray = (value, defaultValue) => {
      if (Array.isArray(value)) return value;
      return defaultValue;
    };

    const product = {
      id: newId,
      name: newProductData.name || 'New Product',
      slug,
      description: newProductData.description || '',
      price: Number(newProductData.price) || 999,
      category: newProductData.category || 'desk-accessories',
      images: ensureArray(newProductData.images, []).length > 0
        ? ensureArray(newProductData.images, [])
        : [],
      materials: ensureArray(newProductData.materials, ['PLA', 'PETG']),
      colors: ensureArray(newProductData.colors, ['Black', 'White']),
      dimensions: newProductData.dimensions || '10cm × 10cm × 10cm',
      printTime: newProductData.printTime || '4-6 hours',
      inStock: newProductData.inStock !== undefined ? newProductData.inStock : true,
      featured: newProductData.featured !== undefined ? newProductData.featured : false,
      rating: newProductData.rating || 5.0,
      reviews: newProductData.reviews || 0,
      ...newProductData,
      // Re-apply generated/ensured values after spread to prevent newProductData from overwriting them
      slug: newProductData.slug || newProductData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      // Re-apply ensured arrays after spread to guarantee they are always arrays
      images: ensureArray(newProductData.images, []).length > 0
        ? ensureArray(newProductData.images, [])
        : [],
      materials: ensureArray(newProductData.materials, ['PLA', 'PETG']),
      colors: ensureArray(newProductData.colors, ['Black', 'White'])
    };

    setProducts(prev => [product, ...prev]);
    return product;
  };

  // Delete a product
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  // Reset to default products from products.js
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProducts(defaultProducts);
  };

  // Get product by slug
  const getProductBySlug = (slug) => {
    if (!slug || typeof slug !== 'string') return undefined;
    return products.find(p => p.slug === slug);
  };

  // Get product by id
  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  // Get featured products
  const getFeaturedProducts = () => {
    return products.filter(p => p.featured);
  };

  // Get products by category
  const getProductsByCategory = (category) => {
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
  };

  // Export products to formatted JavaScript code for products.js
  const exportToCode = () => {
    const code = `// SM Studio - Product Catalog
export const products = ${JSON.stringify(products, null, 2)};

export const categories = ${JSON.stringify(categories, null, 2)};

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug);
}

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

export function getProductsByCategory(category) {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}
`;
    return code;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        updateProduct,
        addProduct,
        deleteProduct,
        resetToDefaults,
        getProductBySlug,
        getProductById,
        getFeaturedProducts,
        getProductsByCategory,
        exportToCode
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
