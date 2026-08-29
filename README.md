# SM Studio - Professional 3D Printing Storefront

A modern, professional e-commerce website for SM Studio's 3D printing business in India, built with React and Vite.

## Features

### Customer-Facing Features
- **Browse & Shop**: Full product catalog with search, filters, and categories
- **Product Details**: Detailed product pages with material/color selection
- **Shopping Cart**: Add to cart with variant selection and quantity management
- **Checkout**: Complete checkout flow with Indian address format
- **Custom Printing**: Upload 3D models (STL, OBJ, 3MF) and request custom quotes
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### Design System
- **Black & White Theme**: Premium, minimal aesthetic
- **Clean Typography**: Modern sans-serif font stack with clear hierarchy
- **Indian Localization**: Prices in ₹ (Rupees), Indian phone format, PIN codes
- **Consistent Spacing**: Design system with CSS variables
- **Smooth Interactions**: Subtle hover states and transitions

## Tech Stack

- **React 19** - UI framework
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped styling with CSS variables

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd 3d-print-store
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Button.jsx
│   ├── Input.jsx
│   └── ProductCard.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── CustomPrinting.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── context/         # State management
│   └── CartContext.jsx
├── data/           # Product catalog
│   └── products.js
├── utils/          # Helper functions
│   └── format.js   # Indian currency formatting
└── index.css       # Global styles and design system
```

## Editing Products & Prices

### Changing Product Prices

1. Open `src/data/products.js`
2. Find the product you want to edit
3. Change the `price` value (in Rupees, no decimals needed):

```javascript
{
  id: 1,
  name: 'Geometric Desk Organizer',
  price: 1999,  // ₹1,999 - Edit this number
  // ... other fields
}
```

### Adding Product Images

1. Place your images in the `public/products/` folder
2. Name them clearly (e.g., `desk-organizer.jpg`)
3. Update the `images` field in `products.js`:

```javascript
images: ['/products/desk-organizer.jpg']
```

### Adding New Products

Copy an existing product object and modify:
- `id` - Must be unique
- `name` - Product name
- `slug` - URL-friendly name (use-dashes-like-this)
- `price` - Price in Rupees
- `description` - Product description
- `images` - Array of image paths
- Other fields as needed

The website automatically refreshes when you save!

## Key Pages

### Homepage
- Hero section with clear CTAs
- Featured products showcase
- Trust indicators
- Custom printing CTA

### Shop
- Product grid with filtering by category
- Search functionality
- Sort options (featured, price, name)
- Responsive sidebar filters

### Product Detail
- Large product images
- Material and color selection
- Quantity selector
- Add to cart / Buy now
- Product specifications
- Related products

### Custom Printing
- 5-step process explanation
- File upload interface (STL, OBJ, 3MF)
- Quote request form with specifications
- Contact information collection

### Cart & Checkout
- Cart summary with item management
- Quantity adjustment
- Checkout form with Indian address format (PIN code, State, etc.)
- Order confirmation

## Indian Localization

The website is configured for India:
- **Currency**: All prices in ₹ (Indian Rupees)
- **Phone Format**: +91 XXXXX XXXXX
- **Address Format**: PIN code, State, India as default country
- **Timezone**: IST (Indian Standard Time) mentioned in contact hours

## Customization

### Update Contact Details

Replace placeholder contact information in:
- `src/components/Footer.jsx` - Footer contact details
- `src/pages/Contact.jsx` - Contact page

```javascript
// Update these with your actual details:
Phone: +91 98765 43210
WhatsApp: https://wa.me/919876543210
Email: hello@smstudio.com
```

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --color-black: #000000;
  --color-white: #ffffff;
  /* Add your brand colors */
}
```

### Logo
Replace "SM Studio" text in `src/components/Header.jsx` with your logo image.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] User authentication and accounts
- [ ] Order history and tracking
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Payment gateway integration (Razorpay, PayU, etc.)
- [ ] Admin panel for product management
- [ ] Email/SMS notifications
- [ ] 3D model preview in browser
- [ ] Automatic quote calculation for custom prints
- [ ] GST invoice generation

## Pricing Note

All prices are stored as integers (e.g., `1999` for ₹1,999). The `formatPrice()` utility function automatically formats them with the ₹ symbol and Indian number formatting.

## License

This project is created for SM Studio.

## Support

For questions or support, contact hello@smstudio.com or WhatsApp: +91 98765 43210
