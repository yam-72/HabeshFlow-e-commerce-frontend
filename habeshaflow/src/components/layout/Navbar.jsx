import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";
import {
  FiShoppingCart, FiHeart, FiBell, FiSearch, FiMenu, FiX,
  FiUser, FiLogOut, FiSettings, FiPackage, FiMessageSquare,
  FiChevronDown, FiSun, FiMoon,
} from "react-icons/fi";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Listings", path: "/listings" },
  { label: "Categories", path: "/categories" },
];

export default function Navbar() {
  const { cartCount, wishlistCount, unreadCount, notifications, markAllRead, user, darkMode, setDarkMode } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const notifsRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setShowNotifs(false);
    setShowProfile(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) navigate(`/products?q=${searchVal}`);
  };

  const navBg = scrolled
    ? "bg-white/95 dark:bg-gray-900/95 shadow-lg shadow-black/5 backdrop-blur-md"
    : "bg-white dark:bg-gray-900";

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-black text-lg"
            >
              H
            </motion.div>
            <span className="font-black text-xl text-gray-900 dark:text-white">
              Habesha<span className="text-green-600">Flow</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "text-gray-600 hover:text-green-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar (desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 gap-2 w-64 border border-gray-200 dark:border-gray-700 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition-all"
          >
            <FiSearch className="text-gray-400 shrink-0" />
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search products…"
              className="bg-transparent text-sm text-gray-700 dark:text-gray-200 outline-none w-full placeholder-gray-400"
            />
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Dark mode */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
            </motion.button>

            {/* Wishlist */}
            <Link to="/buyer/wishlist" className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <FiHeart />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/buyer/cart" className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <FiShoppingCart />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Notifications */}
            <div className="relative" ref={notifsRef}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
                className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <FiBell />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </motion.button>
              <AnimatePresence>
                {showNotifs && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="font-bold text-sm text-gray-800 dark:text-white">Notifications</span>
                      <button onClick={markAllRead} className="text-xs text-green-600 hover:underline">Mark all read</button>
                    </div>
                    {notifications.map((n) => (
                      <div key={n.id} className={`px-4 py-3 flex gap-3 items-start border-b border-gray-50 dark:border-gray-800 last:border-0 ${!n.read ? "bg-green-50/50 dark:bg-green-900/10" : ""}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? "bg-green-500" : "bg-gray-200"}`} />
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-200">{n.text}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                  {user.avatar}
                </div>
                <span className="hidden sm:block text-xs font-semibold text-gray-700 dark:text-gray-200">{user.name.split(" ")[0]}</span>
                <FiChevronDown className="text-gray-400 text-xs" />
              </motion.button>
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="font-bold text-sm text-gray-800 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                    </div>
                    {[
                      { icon: FiUser, label: "Profile", path: "/buyer/dashboard" },
                      { icon: FiPackage, label: "My Orders", path: "/buyer/orders" },
                      { icon: FiMessageSquare, label: "Messages", path: "/buyer/messages" },
                      { icon: FiSettings, label: "Settings", path: "/buyer/dashboard" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      >
                        <item.icon className="text-gray-400" size={15} />
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 dark:border-gray-700">
                      <Link to="/login" className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
                        <FiLogOut size={15} />
                        Sign Out
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <form onSubmit={handleSearch} className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 gap-2 mb-3">
                <FiSearch className="text-gray-400" />
                <input
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search…"
                  className="bg-transparent text-sm text-gray-700 dark:text-gray-200 outline-none w-full"
                />
              </form>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
