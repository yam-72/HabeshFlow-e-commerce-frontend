import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/common/PageWrapper";
import { categories } from "../../data/mockData";

export default function CategoriesPage() {
  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">Discover</p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">All Categories</h1>
          <p className="text-gray-500 mt-2">Browse thousands of products across every category</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <Link
                to={`/products?cat=${cat.name}`}
                className="block bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-100 dark:border-gray-700 hover:border-green-200 hover:shadow-xl transition-all group"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ background: cat.color + "18" }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-400">{cat.count} products</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
