export const categories = [
  { id: 1, name: "Electronics", icon: "📱", count: 248, color: "#3B82F6" },
  { id: 2, name: "Fashion", icon: "👗", count: 512, color: "#EC4899" },
  { id: 3, name: "Home & Living", icon: "🏠", count: 189, color: "#F59E0B" },
  { id: 4, name: "Vehicles", icon: "🚗", count: 97, color: "#6366F1" },
  { id: 5, name: "Agriculture", icon: "🌾", count: 143, color: "#10B981" },
  { id: 6, name: "Books", icon: "📚", count: 86, color: "#8B5CF6" },
  { id: 7, name: "Beauty", icon: "💄", count: 201, color: "#F43F5E" },
  { id: 8, name: "Sports", icon: "⚽", count: 134, color: "#0EA5E9" },
];

export const products = [
  { id: 1, name: "Samsung Galaxy A54", price: 12500, originalPrice: 15000, image: "📱", category: "Electronics", store: "Addis Tech Store", rating: 4.5, reviews: 128, location: "Addis Ababa", badge: "Hot", inStock: true },
  { id: 2, name: "Traditional Habesha Kemis", price: 2800, originalPrice: 3500, image: "👗", category: "Fashion", store: "Selam Fashion", rating: 4.8, reviews: 89, location: "Addis Ababa", badge: "New", inStock: true },
  { id: 3, name: "Ethiopian Coffee Set", price: 1200, originalPrice: 1200, image: "☕", category: "Home & Living", store: "Ethiopian Craft", rating: 4.9, reviews: 215, location: "Jimma", badge: "Top", inStock: true },
  { id: 4, name: "Leather Laptop Bag", price: 950, originalPrice: 1400, image: "💼", category: "Fashion", store: "Leather World", rating: 4.3, reviews: 44, location: "Addis Ababa", badge: "Sale", inStock: true },
  { id: 5, name: "Solar Power Bank 20000mAh", price: 1800, originalPrice: 2200, image: "🔋", category: "Electronics", store: "GreenTech ET", rating: 4.6, reviews: 67, location: "Dire Dawa", badge: null, inStock: true },
  { id: 6, name: "Handwoven Basket Set", price: 650, originalPrice: 650, image: "🧺", category: "Home & Living", store: "Artisan Hub", rating: 5.0, reviews: 34, location: "Bahir Dar", badge: "Top", inStock: true },
  { id: 7, name: "Nike Running Shoes", price: 4200, originalPrice: 5500, image: "👟", category: "Sports", store: "Sport Zone ET", rating: 4.7, reviews: 92, location: "Addis Ababa", badge: "Sale", inStock: false },
  { id: 8, name: "Bluetooth Speaker", price: 2100, originalPrice: 2600, image: "🔊", category: "Electronics", store: "Addis Tech Store", rating: 4.4, reviews: 56, location: "Addis Ababa", badge: null, inStock: true },
];

export const listings = [
  { id: 1, title: "Toyota Corolla 2018", price: 1350000, image: "🚗", category: "Vehicles", user: "Kebede M.", location: "Addis Ababa", posted: "2h ago", condition: "Good", views: 245 },
  { id: 2, title: "2-Bedroom Apartment for Rent", price: 8500, priceUnit: "/mo", image: "🏠", category: "Real Estate", user: "Sara T.", location: "Bole, AA", posted: "5h ago", condition: "New", views: 189 },
  { id: 3, title: "iPhone 13 Pro Max", price: 68000, image: "📱", category: "Electronics", user: "Dawit A.", location: "Piassa, AA", posted: "1d ago", condition: "Like New", views: 312 },
  { id: 4, title: "Ethiopian Tej (Honey Wine)", price: 350, image: "🍯", category: "Food & Drink", user: "Alemu G.", location: "Gondar", posted: "3h ago", condition: "New", views: 78 },
  { id: 5, title: "Office Desk & Chair Set", price: 4500, image: "🪑", category: "Furniture", user: "Meron B.", location: "Addis Ababa", posted: "1d ago", condition: "Good", views: 134 },
  { id: 6, title: "German Shepherd Puppy", price: 12000, image: "🐕", category: "Pets", user: "Yonas H.", location: "CMC, AA", posted: "6h ago", condition: "N/A", views: 421 },
];

export const stores = [
  { id: 1, name: "Addis Tech Store", owner: "Tewodros K.", products: 124, rating: 4.7, sales: 2341, verified: true, city: "Addis Ababa" },
  { id: 2, name: "Selam Fashion", owner: "Selam A.", products: 89, rating: 4.9, sales: 1876, verified: true, city: "Addis Ababa" },
  { id: 3, name: "Ethiopian Craft", owner: "Tigist M.", products: 56, rating: 4.8, sales: 987, verified: true, city: "Jimma" },
  { id: 4, name: "GreenTech ET", owner: "Biruk T.", products: 43, rating: 4.5, sales: 654, verified: false, city: "Dire Dawa" },
];

export const testimonials = [
  { id: 1, name: "Abeba Haile", role: "Buyer", avatar: "AH", text: "HabeshaFlow is the best marketplace in Ethiopia. Fast delivery, great products!", rating: 5, city: "Addis Ababa" },
  { id: 2, name: "Tekle Berhe", role: "Seller", avatar: "TB", text: "My sales tripled after joining HabeshaFlow. The seller dashboard is amazing.", rating: 5, city: "Mekelle" },
  { id: 3, name: "Liya Tadesse", role: "Buyer", avatar: "LT", text: "Found exactly what I was looking for — great prices and authentic Ethiopian products.", rating: 4, city: "Hawassa" },
];

export const statsData = {
  products: 12450,
  sellers: 1820,
  buyers: 48000,
  cities: 56,
};

export const salesChartData = [
  { month: "Jan", revenue: 42000, orders: 320 },
  { month: "Feb", revenue: 58000, orders: 410 },
  { month: "Mar", revenue: 51000, orders: 370 },
  { month: "Apr", revenue: 76000, orders: 520 },
  { month: "May", revenue: 89000, orders: 610 },
  { month: "Jun", revenue: 102000, orders: 720 },
];

export const orders = [
  { id: "#1042", product: "Samsung Galaxy A54", store: "Addis Tech Store", date: "May 28, 2026", status: "Shipped", amount: 12500, tracking: "ET4829017" },
  { id: "#1039", product: "Ethiopian Coffee Set", store: "Ethiopian Craft", date: "May 25, 2026", status: "Delivered", amount: 1200, tracking: "ET4720183" },
  { id: "#1031", product: "Leather Laptop Bag", store: "Leather World", date: "May 20, 2026", status: "Delivered", amount: 950, tracking: "ET4610224" },
  { id: "#1028", product: "Bluetooth Speaker", store: "Addis Tech Store", date: "May 17, 2026", status: "Processing", amount: 2100, tracking: null },
];

export const messages = [
  { id: 1, from: "Selam Fashion", avatar: "SF", last: "Your order is ready for pickup!", time: "2m ago", unread: 2 },
  { id: 2, from: "Addis Tech Store", avatar: "AT", last: "We have a discount for you this week", time: "1h ago", unread: 0 },
  { id: 3, from: "GreenTech ET", avatar: "GE", last: "Is the power bank still available?", time: "3h ago", unread: 1 },
];
