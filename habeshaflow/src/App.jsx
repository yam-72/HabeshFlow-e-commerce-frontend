import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/public/HomePage";
import ProductsPage from "./pages/public/ProductsPage";
import ListingsPage from "./pages/public/ListingsPage";
import ProductDetailPage from "./pages/public/ProductDetailPage";
import CategoriesPage from "./pages/public/CategoriesPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CartPage from "./pages/buyer/CartPage";
import WishlistPage from "./pages/buyer/WishlistPage";
import CheckoutPage from "./pages/buyer/CheckoutPage";
import OrdersPage from "./pages/buyer/OrdersPage";
import MessagesPage from "./pages/buyer/MessagesPage";
import ScrollToTop from "./components/common/ScrollToTop";

function AnimatedRoutes() {
  const location = useLocation();
  const noNavFooter = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!noNavFooter && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer/cart" element={<CartPage />} />
          <Route path="/buyer/wishlist" element={<WishlistPage />} />
          <Route path="/buyer/checkout" element={<CheckoutPage />} />
          <Route path="/buyer/orders" element={<OrdersPage />} />
          <Route path="/buyer/messages" element={<MessagesPage />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
      {!noNavFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <AnimatedRoutes />
      </Router>
    </AppProvider>
  );
}
