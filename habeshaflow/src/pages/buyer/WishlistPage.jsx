import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/common/PageWrapper";
import { useApp } from "../../context/AppContext";
import ProductCard from "../../components/product/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useApp();
  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-6">My Wishlist
          <span className="text-gray-400 font-normal text-base ml-2">({wishlist.length} items)</span>
        </h1>
        {wishlist.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-7xl mb-4 block">❤️</span>
            <p className="text-gray-500 font-semibold text-lg mb-4">Your wishlist is empty</p>
            <Link to="/products">
              <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-green-600 text-white font-bold rounded-2xl">Browse Products</motion.button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
