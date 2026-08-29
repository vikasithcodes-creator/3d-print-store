# SM Studio Admin Panel - User Guide

**Created:** August 29, 2026  
**Version:** 1.0  
**Default Password:** `admin123`

---

## 🎉 What Was Built

A complete developer admin panel system that lets you manage products and images directly from the website interface, with changes syncing across your Desktop PC and Laptop via Git.

---

## 🔐 How to Access Admin Panel

### Method 1: Direct URL
Navigate to: **`http://localhost:5173/admin`** (or your live site URL + `/admin`)

### Method 2: Footer Link
Scroll to the bottom of any page and click the small **🔒 Admin** link in the footer.

### Login Credentials
- **Default Password:** `admin123`
- Password is hashed (SHA-256) for security
- Stored in browser session (stays logged in until browser closes)

---

## 🛠️ Admin Panel Features

### Main Dashboard (`/admin`)

**Product Table View:**
- See all products with thumbnails, names, prices, categories
- Quick visual overview of stock status and featured items
- Stats cards showing total products, in-stock count, featured count

**Actions Available:**
1. **✏️ Edit** - Opens full product editor
2. **🗑️ Delete** - Remove product (with confirmation)
3. **+ Add Product** - Create new product

**Export Tools:**
- **Export products.js** - Generate code to commit to Git
- **Reset to Defaults** - Clear all changes, reload from original `products.js`

---

## 📝 How to Edit Products

### Full Edit (via Dashboard)

1. Go to `/admin` and log in
2. Click **✏️ Edit** button on any product
3. Modal opens with all fields:
   - **Name** - Product title
   - **URL Slug** - Auto-generated or custom
   - **Description** - Product details
   - **Price** - In Rupees (₹)
   - **Category** - Dropdown selection
   - **Image Paths** - One path per line (e.g., `/products/dragon.jpg`)
   - **Dimensions** - Size specs
   - **Print Time** - Estimated hours
   - **In Stock** - Checkbox
   - **Featured Product** - Checkbox
4. Click **Save Product**

### Quick Price Edit (on Product Detail Page)

1. Go to any product page (e.g., `/product/articulated-dragon`)
2. When logged in as admin, you'll see:
   - Black dev mode banner at top
   - **✏️ Edit Price** button next to price
3. Click Edit Price → Enter new price → Save
4. Price updates instantly across entire site

### Quick Edit from Product Cards

1. When logged in, product cards show a **✏️** icon in top-right corner
2. Click to jump directly to admin dashboard
3. Or click the price edit pencil for inline quick edit

---

## 🖼️ How to Manage Images

### Image Workflow

**SM Studio uses a manual file-based image system:**

1. **Add image files to your project:**
   ```
   public/products/
   ├── dragon.jpg
   ├── desk-organizer.jpg
   ├── phone-stand.jpg
   └── keychain.jpg
   ```

2. **In Admin Panel:**
   - Edit a product
   - In "Image Paths" field, enter one path per line:
     ```
     /products/dragon.jpg
     /products/dragon-side.jpg
     /products/dragon-back.jpg
     ```
   - Save

3. **Images appear immediately** on product cards and detail pages

### Best Practices for Images
- Use `.jpg` for photos, `.png` for graphics with transparency
- Recommended size: 800×800px minimum
- Keep file sizes under 500KB per image
- Use descriptive names: `articulated-dragon.jpg` not `IMG_1234.jpg`

---

## ➕ How to Add New Products

1. Click **+ Add Product** in admin dashboard
2. Fill in required fields:
   - **Name** (required)
   - **Price** (required)
   - Add image files to `/public/products/` folder first
   - Enter image paths like `/products/your-image.jpg`
3. Set category, dimensions, print time
4. Check "In Stock" and "Featured" if applicable
5. Click **Save Product**
6. New product appears immediately in shop

---

## 🔄 How to Sync Changes Between Devices

### Your Workflow: Desktop PC ↔ Laptop

#### On Device Where You Made Changes (e.g., Desktop PC):

1. **Make changes** in admin panel (edit prices, add products, etc.)

2. **Export the updated code:**
   - Click **Export products.js** button
   - Copy the generated code

3. **Update the source file:**
   - Open `src/data/products.js` in VS Code
   - Replace entire file contents with copied code
   - Save file

4. **Commit to Git:**
   ```powershell
   cd C:\Users\messi\Projects\3d-print-store
   git add src/data/products.js
   git add public/products/  # if you added new images
   git commit -m "Update product prices and add new items"
   git push
   ```

#### On Other Device (e.g., Laptop):

1. **Pull changes from GitHub:**
   ```bash
   cd /path/to/3d-print-store
   git pull
   ```

2. **Reload website** - Changes appear immediately

---

## ⚙️ How Admin Mode Works

### What's Stored Where

**Browser (localStorage):**
- Working copy of products for preview/testing
- Custom admin password (if changed from default)
- Product edits are temporary until you export to code

**Browser (sessionStorage):**
- Admin login session (cleared when browser closes)

**Project Files (Git):**
- `src/data/products.js` - Permanent product data
- `public/products/` - Image files
- Synced across devices via Git

### Admin Session Behavior
- **Login persists:** Until you close browser or click Logout
- **Edits are live:** Changes appear instantly on the site
- **Export to commit:** Changes become permanent only after exporting → committing to Git

---

## 🧪 Testing Checklist

### ✅ Admin Authentication
- [x] Navigate to `/admin`
- [x] Enter wrong password → Error message appears
- [x] Enter `admin123` → Dashboard unlocks
- [x] Logout button clears session

### ✅ Product Editing
- [x] Change price of a product
- [x] Visit product card and detail page → New price displays
- [x] Add to cart → Correct price in cart
- [x] Checkout → Correct price in order total

### ✅ Image Management
- [x] Add image file to `public/products/test.jpg`
- [x] Edit product, add path `/products/test.jpg`
- [x] Save → Image appears on product card
- [x] Click product → Image appears on detail page

### ✅ Add/Delete Products
- [x] Add new product with custom name and price
- [x] New product appears in shop grid
- [x] Can be added to cart
- [x] Delete test product → Removed from shop

### ✅ Code Export
- [x] Click "Export products.js"
- [x] Generated code matches format of original file
- [x] Copy code, replace `src/data/products.js`
- [x] Build project → No errors

---

## 🔒 Security Notes

### Admin Password

**To change the default password:**

1. Log into admin panel
2. Open browser console (F12)
3. Run:
   ```javascript
   const newHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('your_new_password'));
   console.log(Array.from(new Uint8Array(newHash)).map(b => b.toString(16).padStart(2, '0')).join(''));
   ```
4. Copy the hash output
5. Open `src/context/AdminContext.jsx`
6. Replace `DEFAULT_PASSWORD_HASH` value with your new hash
7. Commit to Git

**Current Security Level:**
- ✅ Password hashed with SHA-256
- ✅ Admin session isolated to browser
- ✅ No password sent over network
- ⚠️ Client-side only (suitable for single developer, not production multi-user)

---

## 📱 Quick Reference

### Admin URLs
- Dashboard: `/admin`
- Any product page: Shows admin toolbar when logged in
- Footer: Always has Admin link

### Keyboard Shortcuts
- None currently (add if desired)

### Admin Visual Indicators
- **Black dev banner** on product detail pages
- **✏️ Edit icons** on product cards and prices
- **🛠️ Admin Active** badge in footer when logged in

---

## 🐛 Troubleshooting

### "Changes not appearing on other device"
- Did you export to code and commit `products.js` to Git?
- Did you pull changes on the other device?
- Try hard refresh (Ctrl+Shift+R)

### "Images not loading"
- Check file is in `public/products/` folder
- Check path starts with `/products/` (with leading slash)
- Check filename matches exactly (case-sensitive)

### "Forgot admin password"
- Password is `admin123` by default
- If changed: Open `src/context/AdminContext.jsx` and reset `DEFAULT_PASSWORD_HASH`

### "Admin panel won't load"
- Check dev server is running (`npm run dev`)
- Try clearing browser cache
- Check browser console for errors

---

## 🚀 Next Steps

**Your admin system is ready to use!**

1. Visit `http://localhost:5173/admin`
2. Login with password: `admin123`
3. Edit a product price
4. See it update across the site
5. Export to code when ready to commit

**Pro Tips:**
- Make changes on one device, test thoroughly
- Export and commit to Git regularly
- Keep image files under 500KB
- Use descriptive product slugs for SEO

---

*Built for SM Studio | Developer Admin Panel v1.0*
