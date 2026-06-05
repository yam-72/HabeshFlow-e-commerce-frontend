import { motion } from "framer-motion";
import { FiMapPin, FiEye, FiClock, FiMessageSquare } from "react-icons/fi";

export default function ListingCard({ listing, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-700 dark:to-gray-750 h-40 flex items-center justify-center">
        <motion.span className="text-6xl" whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 300 }}>
          {listing.image}
        </motion.span>
        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
          listing.condition === "New" ? "bg-green-500" :
          listing.condition === "Like New" ? "bg-blue-500" : "bg-amber-500"
        }`}>
          {listing.condition}
        </span>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 text-white px-2 py-0.5 rounded-full text-[10px]">
          <FiEye size={10} /> {listing.views}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 dark:text-white text-sm line-clamp-1 mb-1 group-hover:text-amber-600 transition-colors">
          {listing.title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <FiMapPin size={11} className="text-gray-400" />
          <span className="text-xs text-gray-400">{listing.location}</span>
          <span className="text-gray-200 mx-1">·</span>
          <FiClock size={11} className="text-gray-400" />
          <span className="text-xs text-gray-400">{listing.posted}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-black text-gray-900 dark:text-white text-base">
              ETB {listing.price.toLocaleString()}
            </span>
            {listing.priceUnit && <span className="text-xs text-gray-400">{listing.priceUnit}</span>}
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-xl text-xs font-semibold hover:bg-amber-100 transition"
          >
            <FiMessageSquare size={12} /> Contact
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
