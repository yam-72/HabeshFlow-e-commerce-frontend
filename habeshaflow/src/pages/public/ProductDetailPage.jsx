import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiMapPin, FiTruck, FiShield, FiArrowLeft, FiMessageSquare } from "react-icons/fi";
import PageWrapper from "../../components/common/PageWrapper";
import { products } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import ProductCard from "../../components/product/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id)) || products[0];
  const { dispatch, wishlist, toggleWishlist } = useApp();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const isWished = wishlist.find((i) => i.id === product.id);

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-green-600">Products</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-200 font-medium truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 h-96 flex items-center justify-center shadow-sm"
          >
            <motion.span
              className="text-9xl"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {product.image}
            </motion.span>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.badge && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500 text-white">{product.badge}</span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-3 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={16} className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              <span className="text-xs text-gray-300">|</span>
              <Link to="#" className="text-xs text-green-600 font-semibold">{product.store}</Link>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-black text-gray-900 dark:text-white">
                ETB {product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">ETB {product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <FiMapPin size={14} className="text-green-600" />
              <span>{product.location}</span>
              <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full ${product.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-xl font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition">−</button>
                <span className="w-12 text-center font-bold text-gray-800 dark:text-white">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-xl font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition">+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={!product.inStock}
                onClick={() => dispatch({ type: "ADD", item: { ...product, qty } })}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 text-white font-bold rounded-2xl transition shadow-lg shadow-green-200 dark:shadow-none"
              >
                <FiShoppingCart /> Add to Cart
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition ${
                  isWished ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 dark:border-gray-600 text-gray-400 hover:border-red-200"
                }`}
              >
                <FiHeart className={isWished ? "fill-red-500" : ""} />
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} className="w-14 h-14 rounded-2xl border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <FiShare2 />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: FiTruck, label: "Fast Delivery" },
                { icon: FiShield, label: "Buyer Protection" },
                { icon: FiMessageSquare, label: "Chat Seller" },
              ].map((b, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
                  <b.icon className="text-green-600" size={18} />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 mb-12 overflow-hidden">
          <div className="flex border-b border-gray-100 dark:border-gray-700">
            {["description", "reviews", "shipping"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-bold capitalize transition ${
                  activeTab === tab ? "text-green-600 border-b-2 border-green-600 bg-green-50/50 dark:bg-green-900/10" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {activeTab === "description" && (
              <p>
                This premium product from {product.store} offers excellent quality and value. Built for the Ethiopian market with local needs in mind. Features durable construction, warranty included, and exceptional customer support.
              </p>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                {[
                  { name: "Kebede A.", rating: 5, comment: "Excellent product! Very happy with my purchase.", date: "May 2026" },
                  { name: "Sara M.", rating: 4, comment: "Good quality, fast delivery. Recommended.", date: "Apr 2026" },
                ].map((r, i) => (
                  <div key={i} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">{r.name[0]}</div>
                      <span className="font-bold text-gray-800 dark:text-white text-sm">{r.name}</span>
                      <div className="flex ml-1">{[...Array(r.rating)].map((_, j) => <FiStar key={j} size={11} className="text-amber-400 fill-amber-400" />)}</div>
                      <span className="text-xs text-gray-400 ml-auto">{r.date}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="space-y-2">
                <p>✅ Standard Delivery: 2-5 business days — ETB 50</p>
                <p>🚀 Express Delivery: 1-2 business days — ETB 120</p>
                <p>📦 Free delivery on orders above ETB 3,000</p>
                <p>🔄 Returns accepted within 7 days of delivery</p>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
