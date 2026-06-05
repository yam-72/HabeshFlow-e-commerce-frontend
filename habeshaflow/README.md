# 🛒 HabeshaFlow — Ethiopia's Hybrid E-Commerce & Marketplace

A full-stack-ready React frontend for Ethiopia's premier hybrid marketplace platform combining multi-vendor stores, peer-to-peer listings, messaging, analytics, and more.

---

## ✨ Features

### 🛍️ Marketplace
- Multi-vendor product store with categories, filters, sort & search
- Peer-to-peer listings (Jiji-style classifieds)
- Product detail page with reviews, tabs, related products
- Cart, wishlist, and checkout with payment selection

### 👤 Authentication
- Login & Register with multi-step form
- Role selection: Buyer / Seller / Both
- Quick demo access for all 3 dashboards

### 📦 Buyer Dashboard
- Overview with order stats, messages, quick links
- Shopping cart with quantity management
- Wishlist page
- Multi-step checkout with Telebirr / Bank / COD payment options
- Order tracking with progress indicator
- Real-time messaging UI with chat bubbles

### 📊 Seller Dashboard
- Animated analytics with Recharts (line, bar, pie charts)
- Product management table (add/edit/delete)
- Orders management
- Revenue trend & conversion metrics

### 🛡️ Admin Dashboard
- Collapsible sidebar navigation
- User management with search + suspend/approve
- Seller approval workflow
- Product moderation table
- Dispute resolution with multi-action buttons
- Report management (remove / dismiss)
- Platform analytics with category breakdown
- Platform settings with animated toggles & commission slider

### 🎨 Design
- Tailwind CSS utility-first styling
- Framer Motion animations throughout
- Animated hero carousel with auto-slide
- Animated stat counters (IntersectionObserver)
- Hover-lift cards, smooth transitions
- Dark mode ready (via Tailwind `dark:` classes)
- Fully responsive (mobile, tablet, desktop)
- Sticky navbar with scroll-aware shadow
- Notifications & profile dropdowns
- Mobile hamburger menu

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm start
```

Opens at **http://localhost:3000**

---

## 📁 Project Structure

```
habeshaflow/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx                    # Router + layout wrapper
│   ├── index.js                   # React entry point
│   ├── index.css                  # Tailwind + global styles
│   ├── context/
│   │   └── AppContext.jsx          # Cart, wishlist, user, notifications
│   ├── data/
│   │   └── mockData.js             # All mock data (products, orders, etc.)
│   ├── hooks/
│   │   └── useCounter.js           # Animated counter hook
│   ├── components/
│   │   ├── common/
│   │   │   ├── PageWrapper.jsx     # Page transition wrapper
│   │   │   └── ScrollToTop.jsx     # Auto scroll on route change
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Full navbar with dropdowns
│   │   │   └── Footer.jsx          # Footer with newsletter
│   │   ├── product/
│   │   │   └── ProductCard.jsx     # Animated product card
│   │   └── listing/
│   │       └── ListingCard.jsx     # Listing card
│   └── pages/
│       ├── public/
│       │   ├── HomePage.jsx        # Full landing page
│       │   ├── ProductsPage.jsx    # Products marketplace
│       │   ├── ProductDetailPage.jsx
│       │   ├── ListingsPage.jsx    # Classifieds
│       │   ├── CategoriesPage.jsx
│       │   ├── LoginPage.jsx
│       │   └── RegisterPage.jsx
│       ├── buyer/
│       │   ├── BuyerDashboard.jsx
│       │   ├── CartPage.jsx
│       │   ├── WishlistPage.jsx
│       │   ├── CheckoutPage.jsx
│       │   ├── OrdersPage.jsx
│       │   └── MessagesPage.jsx
│       ├── seller/
│       │   └── SellerDashboard.jsx
│       └── admin/
│           └── AdminDashboard.jsx
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Green (Primary) | `#16a34a` | Buttons, accents, buyer role |
| Green Light | `#22c55e` | Hover states |
| Amber/Gold | `#F59E0B` | Flash sales, listings, badges |
| Blue | `#3B82F6` | Info states, seller role |
| Red | `#EF4444` | Disputes, alerts, admin |
| Purple | `#6366F1` | Analytics charts |
| Dark | `#111827` | Backgrounds, hero sections |

---

## 💳 Payment Methods Supported (UI)
- 📱 **Telebirr** — Ethiopia's #1 mobile money
- 🏦 **CBE Birr** — Commercial Bank of Ethiopia
- 💳 **Bank Transfer** — Direct transfer
- 💵 **Cash on Delivery** — Pay on receipt

---

## 🔌 Backend Integration

All pages are ready for real API integration. Replace mock data in `src/data/mockData.js` with Axios calls:

```js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getProducts = () => API.get("/products");
export const getOrders = (userId) => API.get(`/orders?userId=${userId}`);
export const createOrder = (data) => API.post("/orders", data);
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 (CRA) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v11 |
| Routing | React Router DOM v6 |
| Charts | Recharts v2 |
| HTTP | Axios |
| Icons | React Icons v5 |
| State | Context API + useReducer |

---

## 👨‍💻 Made by
**Group 5 — Section B**  
Department of Electrical & Computer Engineering  
Addis Ababa Science & Technology University (AASTU)  
May 2026
