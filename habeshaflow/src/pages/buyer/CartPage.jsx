import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import PageWrapper from "../../components/common/PageWrapper";
import { useApp } from "../../context/AppContext";

export default function CartPage() {
  const { cart, dispatch } = useApp();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 3000 ? 0 : 80;
  const total = subtotal + shipping;

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Shopping Cart
          <span className="text-gray-400 font-normal text-base ml-2">({cart.length} items)</span>
        </h1>
        {cart.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-7xl mb-4 block">🛒</span>
            <p className="text-gray-500 font-semibold text-lg mb-4">Your cart is empty</p>
            <Link to="/products">
              <motion.button whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-green-600 text-white font-bold rounded-2xl">
                Start Shopping
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4"
                  >
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-3xl shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-800 dark:text-white truncate">{item.name}</p>
                      <p className="text-xs text-green-600">{item.store}</p>
                      <p className="font-black text-gray-900 dark:text-white mt-1">ETB {(item.price * item.qty).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })}
                        className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <FiMinus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-gray-800 dark:text-white">{item.qty}</span>
                      <button onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })}
                        className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <FiPlus size={12} />
                      </button>
                      <button onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                        className="ml-2 w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-400 flex items-center justify-center hover:bg-red-100 transition">
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 h-fit sticky top-24">
              <h2 className="font-black text-gray-800 dark:text-white mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span><span>ETB {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>{shipping === 0 ? "Free" : `ETB ${shipping}`}</span>
                </div>
                {shipping > 0 && <p className="text-xs text-gray-400">Free shipping on orders above ETB 3,000</p>}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between font-black text-gray-900 dark:text-white">
                  <span>Total</span><span>ETB {total.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/buyer/checkout">
                <motion.button whileTap={{ scale: 0.96 }} className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition">
                  Checkout <FiArrowRight />
                </motion.button>
              </Link>
              <button onClick={() => dispatch({ type: "CLEAR" })} className="w-full mt-3 py-2 text-sm text-red-400 hover:text-red-500 transition">
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
