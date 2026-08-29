// SM Studio - Product Catalog
export const products = [
  {
    id: 1,
    name: 'Geometric Desk Organizer',
    slug: 'geometric-desk-organizer',
    description: 'Modern geometric desk organizer with multiple compartments for pens, clips, and small items.',
    price: 1999,
    category: 'desk-accessories',
    images: ['/products/desk-organizer.jpg'],
    materials: ['PLA', 'PETG', 'ABS'],
    colors: ['Black', 'White', 'Gray', 'Navy Blue'],
    dimensions: '15cm × 10cm × 8cm',
    printTime: '6-8 hours',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Minimalist Phone Stand',
    slug: 'minimalist-phone-stand',
    description: 'Sleek phone stand with adjustable viewing angle. Compatible with all smartphone sizes.',
    price: 1199,
    category: 'tech',
    images: ['/products/phone-stand.jpg'],
    materials: ['PLA', 'PETG'],
    colors: ['Black', 'White', 'Gray'],
    dimensions: '8cm × 7cm × 5cm',
    printTime: '3-4 hours',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 203
  },
  {
    id: 3,
    name: 'Hexagonal Wall Planter',
    slug: 'hexagonal-wall-planter',
    description: 'Modern hexagonal wall-mounted planter perfect for succulents and small plants.',
    price: 1499,
    category: 'home-decor',
    images: ['/products/wall-planter.jpg'],
    materials: ['PLA', 'PETG'],
    colors: ['White', 'Black', 'Terracotta', 'Sage Green'],
    dimensions: '12cm × 10cm × 6cm',
    printTime: '4-5 hours',
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 4,
    name: 'Cable Management Clips (Set of 6)',
    slug: 'cable-management-clips',
    description: 'Keep your desk tidy with these adhesive cable management clips. Set includes 6 clips.',
    price: 799,
    category: 'desk-accessories',
    images: ['/products/cable-clips.jpg'],
    materials: ['PLA', 'TPU'],
    colors: ['Black', 'White', 'Gray'],
    dimensions: '3cm × 2cm × 1.5cm each',
    printTime: '2-3 hours',
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 312
  },
  {
    id: 5,
    name: 'Articulated Dragon',
    slug: 'articulated-dragon',
    description: 'Fully articulated dragon figurine. A desk companion that moves and poses.',
    price: 2399,
    category: 'collectibles',
    images: ['/products/dragon.jpg'],
    materials: ['PLA', 'PETG'],
    colors: ['Black', 'White', 'Red', 'Blue', 'Green', 'Gold'],
    dimensions: '20cm × 8cm × 6cm',
    printTime: '8-10 hours',
    inStock: true,
    featured: true,
    rating: 5.0,
    reviews: 167
  },
  {
    id: 6,
    name: 'Headphone Stand',
    slug: 'headphone-stand',
    description: 'Premium headphone stand with cable management and non-slip base.',
    price: 1799,
    category: 'tech',
    images: ['/products/headphone-stand.jpg'],
    materials: ['PLA', 'PETG', 'ABS'],
    colors: ['Black', 'White', 'Gray'],
    dimensions: '25cm × 12cm × 12cm',
    printTime: '6-7 hours',
    inStock: true,
    featured: false,
    rating: 4.8,
    reviews: 145
  },
  {
    id: 7,
    name: 'Modular Drawer Organizer',
    slug: 'modular-drawer-organizer',
    description: 'Customizable modular drawer organizer system. Stackable and expandable.',
    price: 1599,
    category: 'utility',
    images: ['/products/drawer-organizer.jpg'],
    materials: ['PLA', 'PETG'],
    colors: ['Black', 'White', 'Gray'],
    dimensions: '10cm × 10cm × 5cm per module',
    printTime: '4-5 hours',
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 98
  },
  {
    id: 8,
    name: 'Custom Name Sign',
    slug: 'custom-name-sign',
    description: 'Personalized name sign for your desk, door, or wall. Specify your text at checkout.',
    price: 1299,
    category: 'personalized',
    images: ['/products/name-sign.jpg'],
    materials: ['PLA', 'PETG'],
    colors: ['Black', 'White', 'Gold', 'Silver'],
    dimensions: 'Custom (up to 30cm)',
    printTime: '3-5 hours',
    inStock: true,
    featured: false,
    customizable: true,
    rating: 4.9,
    reviews: 234
  },
  {
    id: 9,
    name: 'Laptop Riser',
    slug: 'laptop-riser',
    description: 'Ergonomic laptop stand with ventilation slots. Improves posture and cooling.',
    price: 2799,
    category: 'tech',
    images: ['/products/laptop-riser.jpg'],
    materials: ['PLA', 'PETG', 'ABS'],
    colors: ['Black', 'White', 'Gray'],
    dimensions: '28cm × 22cm × 6cm',
    printTime: '8-10 hours',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 176
  },
  {
    id: 10,
    name: 'Succulent Pot Set (3 pcs)',
    slug: 'succulent-pot-set',
    description: 'Set of three minimalist succulent pots with drainage holes.',
    price: 1699,
    category: 'home-decor',
    images: ['/products/succulent-pots.jpg'],
    materials: ['PLA', 'PETG'],
    colors: ['White', 'Black', 'Terracotta', 'Mint Green'],
    dimensions: '6cm diameter each',
    printTime: '5-6 hours',
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 112
  },
  {
    id: 11,
    name: 'Mechanical Keyboard Wrist Rest',
    slug: 'keyboard-wrist-rest',
    description: 'Ergonomic wrist rest designed for mechanical keyboards. Reduces strain during long typing sessions.',
    price: 2199,
    category: 'gaming',
    images: ['/products/wrist-rest.jpg'],
    materials: ['PLA', 'TPU'],
    colors: ['Black', 'Gray', 'Purple'],
    dimensions: '36cm × 8cm × 2cm',
    printTime: '7-9 hours',
    inStock: true,
    featured: false,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 12,
    name: 'Monitor Light Bar Holder',
    slug: 'monitor-light-holder',
    description: 'Universal holder for monitor light bars. Adjustable width fits most monitors.',
    price: 999,
    category: 'tech',
    images: ['/products/light-holder.jpg'],
    materials: ['PLA', 'PETG'],
    colors: ['Black', 'White'],
    dimensions: '15cm × 5cm × 3cm',
    printTime: '3-4 hours',
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 67
  }
];

export const categories = [
  { id: 'all', name: 'All Products', slug: 'all' },
  { id: 'home-decor', name: 'Home & Decor', slug: 'home-decor' },
  { id: 'desk-accessories', name: 'Desk Accessories', slug: 'desk-accessories' },
  { id: 'gaming', name: 'Gaming', slug: 'gaming' },
  { id: 'tech', name: 'Tech Accessories', slug: 'tech' },
  { id: 'collectibles', name: 'Collectibles', slug: 'collectibles' },
  { id: 'utility', name: 'Utility', slug: 'utility' },
  { id: 'personalized', name: 'Personalized', slug: 'personalized' }
];

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
