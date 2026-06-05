import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiStar, FiShoppingCart, FiMapPin } from "react-icons/fi";
import { useApp } from "../../context/AppContext";

export default function ProductCard({ product, index = 0 }) {
  const { dispatch, wishlist, toggleWishlist } = useApp();
  const isWished = wishlist.find((i) => i.id === product.id);
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 h-44 flex items-center justify-center overflow-hidden">
        <motion.span
          className="text-7xl"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {product.image}
        </motion.span>

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
            product.badge === "Hot" ? "bg-red-500" :
            product.badge === "New" ? "bg-blue-500" :
            product.badge === "Top" ? "bg-amber-500" : "bg-green-500"
          }`}>
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleWishlist(product)}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FiHeart
            size={15}
            className={isWished ? "text-red-500 fill-red-500" : "text-gray-400"}
          />
        </motion.button>

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-500 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-green-600 font-semibold mb-1">{product.store}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-bold text-gray-800 dark:text-white line-clamp-2 hover:text-green-600 transition-colors leading-snug mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={11}
                className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3">
          <FiMapPin size={11} className="text-gray-400" />
          <span className="text-xs text-gray-400">{product.location}</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-base font-black text-gray-900 dark:text-white">
              ETB {product.price.toLocaleString()}
            </span>
            {discount > 0 && (
              <span className="block text-xs text-gray-400 line-through">
                ETB {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            disabled={!product.inStock}
            onClick={() => dispatch({ type: "ADD", item: product })}
            className="w-9 h-9 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-200 text-white flex items-center justify-center transition-colors shadow-md shadow-green-200 dark:shadow-none"
          >
            <FiShoppingCart size={15} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
