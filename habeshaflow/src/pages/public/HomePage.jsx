import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiSearch, FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiStar, FiChevronRight } from "react-icons/fi";
import PageWrapper from "../../components/common/PageWrapper";
import ProductCard from "../../components/product/ProductCard";
import ListingCard from "../../components/listing/ListingCard";
import useCounter from "../../hooks/useCounter";
import { categories, products, listings, stores, testimonials, statsData } from "../../data/mockData";

function StatItem({ value, suffix, label }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-black text-white">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-green-200 text-sm mt-1">{label}</div>
    </div>
  );
}

const heroSlides = [
  {
    headline: "Ethiopia's #1 Online Marketplace",
    sub: "Buy, sell & discover authentic Ethiopian products — from Addis to your door.",
    emoji: "🛍️",
    bg: "from-green-900 via-green-800 to-emerald-900",
    cta: "Shop Now",
    ctaPath: "/products",
  },
  {
    headline: "Sell Anything. Reach Everyone.",
    sub: "Open your store or post a quick listing in minutes. Join 1,820+ sellers.",
    emoji: "🏪",
    bg: "from-amber-900 via-yellow-900 to-orange-900",
    cta: "Start Selling",
    ctaPath: "/register",
  },
  {
    headline: "Classifieds Made Simple",
    sub: "Post a listing for your car, house, electronics or anything — it's free.",
    emoji: "📋",
    bg: "from-blue-900 via-indigo-900 to-purple-900",
    cta: "Post a Listing",
    ctaPath: "/listings",
  },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = heroSlides[slide];

  return (
    <PageWrapper>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={`bg-gradient-to-br ${current.bg} min-h-[88vh] flex items-center relative`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px"
            }} />

            {/* Floating orbs */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{ width: 200 + i * 80, height: 200 + i * 80, top: `${10 + i * 20}%`, right: `${-5 + i * 8}%` }}
                animate={{ y: [0, -20, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
              />
            ))}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10 w-full">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20"
                >
                  <span className="text-base">{current.emoji}</span>
                  HabeshaFlow Marketplace
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-black text-white leading-tight mb-5"
                >
                  {current.headline}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/70 text-lg mb-8 leading-relaxed"
                >
                  {current.sub}
                </motion.p>

                {/* Search */}
                <motion.form
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onSubmit={(e) => { e.preventDefault(); navigate(`/products?q=${search}`); }}
                  className="flex gap-3 mb-8"
                >
                  <div className="flex-1 flex items-center bg-white rounded-2xl px-4 py-3 gap-3 shadow-2xl">
                    <FiSearch className="text-gray-400 shrink-0" size={20} />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search products, listings, stores…"
                      className="flex-1 text-gray-700 outline-none text-base placeholder-gray-400"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="px-7 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-black rounded-2xl shadow-xl transition-colors shrink-0"
                  >
                    Search
                  </motion.button>
                </motion.form>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3"
                >
                  <Link to={current.ctaPath}>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:shadow-lg transition"
                    >
                      {current.cta} <FiArrowRight />
                    </motion.button>
                  </Link>
                  <Link to="/listings">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition"
                    >
                      View Listings
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "w-8 bg-white" : "w-2 bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FiTruck, label: "Fast Delivery", sub: "Across Ethiopia" },
              { icon: FiShield, label: "Buyer Protection", sub: "100% Secure" },
              { icon: FiRefreshCw, label: "Easy Returns", sub: "7-day policy" },
              { icon: FiHeadphones, label: "24/7 Support", sub: "Always here" },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                  <b.icon className="text-green-600" size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{b.label}</p>
                  <p className="text-xs text-gray-500">{b.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Browse</p>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">Shop by Category</h2>
            </div>
            <Link to="/categories" className="flex items-center gap-1 text-sm text-green-600 font-semibold hover:gap-2 transition-all">
              All Categories <FiChevronRight />
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-3 flex flex-col items-center gap-2 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-green-200 hover:shadow-lg transition-all"
              >
                <div className="text-3xl">{cat.icon}</div>
                <p className="text-[11px] font-bold text-gray-700 dark:text-gray-200 text-center leading-tight">{cat.name}</p>
                <p className="text-[10px] text-gray-400">{cat.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLASH SALE BANNER ── */}
      <section className="py-6 bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl animate-bounce">⚡</span>
            <div>
              <p className="text-white font-black text-xl">Flash Sale — Up to 50% Off!</p>
              <p className="text-red-100 text-sm">Today only. Limited stock. Don't miss out.</p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 font-black rounded-xl hover:shadow-lg transition">
              Shop Flash Sale <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TRENDING PRODUCTS ── */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Trending Now</p>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">Hot Products</h2>
            </div>
            <Link to="/products" className="flex items-center gap-1 text-sm text-green-600 font-semibold hover:gap-2 transition-all">
              View All <FiChevronRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 8).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section className="py-16 bg-amber-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Classifieds</p>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">Featured Listings</h2>
            </div>
            <Link to="/listings" className="flex items-center gap-1 text-sm text-amber-600 font-semibold hover:gap-2 transition-all">
              All Listings <FiChevronRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {listings.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-gradient-to-br from-green-800 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-green-200 text-sm font-bold uppercase tracking-widest mb-10">HabeshaFlow by the Numbers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value={statsData.products} suffix="+" label="Products Listed" />
            <StatItem value={statsData.sellers} suffix="+" label="Active Sellers" />
            <StatItem value={statsData.buyers} suffix="+" label="Happy Buyers" />
            <StatItem value={statsData.cities} suffix="" label="Ethiopian Cities" />
          </div>
        </div>
      </section>

      {/* ── TOP SELLERS ── */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Community</p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">Top Sellers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stores.map((store, i) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm hover:shadow-lg transition-all text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-black text-xl mx-auto mb-3">
                  {store.name[0]}
                </div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <h3 className="font-bold text-gray-800 dark:text-white text-sm">{store.name}</h3>
                  {store.verified && <span className="text-blue-500 text-sm">✓</span>}
                </div>
                <p className="text-xs text-gray-400 mb-3">{store.city}</p>
                <div className="flex justify-around text-center">
                  <div>
                    <p className="font-black text-gray-800 dark:text-white text-sm">{store.products}</p>
                    <p className="text-[11px] text-gray-400">Products</p>
                  </div>
                  <div className="w-px bg-gray-100 dark:bg-gray-700" />
                  <div>
                    <p className="font-black text-gray-800 dark:text-white text-sm flex items-center gap-0.5">
                      <FiStar className="text-amber-400 fill-amber-400" size={11} /> {store.rating}
                    </p>
                    <p className="text-[11px] text-gray-400">Rating</p>
                  </div>
                  <div className="w-px bg-gray-100 dark:bg-gray-700" />
                  <div>
                    <p className="font-black text-gray-800 dark:text-white text-sm">{store.sales.toLocaleString()}</p>
                    <p className="text-[11px] text-gray-400">Sales</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Reviews</p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">What People Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <FiStar key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl mb-6 block">🚀</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Start Selling on HabeshaFlow</h2>
            <p className="text-gray-400 mb-8 text-lg">Open your store for free. Reach thousands of buyers across Ethiopia today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-black rounded-2xl text-lg shadow-xl shadow-green-900/30 transition"
                >
                  Create Free Store
                </motion.button>
              </Link>
              <Link to="/listings">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-lg border border-white/20 transition"
                >
                  Post a Listing
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
