import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiMapPin, FiCreditCard } from "react-icons/fi";
import PageWrapper from "../../components/common/PageWrapper";
import { useApp } from "../../context/AppContext";

const PAYMENT_METHODS = [
  { id: "telebirr", label: "Telebirr", emoji: "📱", desc: "Pay via Telebirr mobile money" },
  { id: "cbebirr", label: "CBE Birr", emoji: "🏦", desc: "Commercial Bank of Ethiopia" },
  { id: "bank", label: "Bank Transfer", emoji: "💳", desc: "Direct bank transfer" },
  { id: "cod", label: "Cash on Delivery", emoji: "💵", desc: "Pay when you receive" },
];

export default function CheckoutPage() {
  const { cart, dispatch } = useApp();
  const [payMethod, setPayMethod] = useState("telebirr");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0) + (cart.reduce((s, i) => s + i.price * i.qty, 0) > 3000 ? 0 : 80);

  const handleOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    dispatch({ type: "CLEAR" });
    setStep(3);
    setLoading(false);
  };

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= s ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}`}>{s}</div>
              {i < 2 && <div className={`flex-1 h-1 w-12 rounded ${step > s ? "bg-green-500" : "bg-gray-100 dark:bg-gray-700"}`} />}
            </div>
          ))}
          <span className="text-xs text-gray-400 ml-2">
            {step === 1 ? "Address" : step === 2 ? "Payment" : "Confirmed"}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="font-black text-gray-800 dark:text-white mb-5 flex items-center gap-2"><FiMapPin className="text-green-600" /> Delivery Address</h2>
              <div className="grid grid-cols-2 gap-4">
                {[["Full Name", "Abebu Tadesse"], ["Phone", "+251 91 234 5678"], ["City", "Addis Ababa"], ["Sub-City", "Bole"]].map(([label, val]) => (
                  <div key={label}>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">{label}</label>
                    <input defaultValue={val} className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 outline-none focus:border-green-400 transition" />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">Street Address</label>
                  <input defaultValue="Near Bole International Airport, House 12" className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 outline-none focus:border-green-400 transition" />
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setStep(2)} className="mt-6 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition">
                Continue to Payment →
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="font-black text-gray-800 dark:text-white mb-5 flex items-center gap-2"><FiCreditCard className="text-green-600" /> Payment Method</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {PAYMENT_METHODS.map((pm) => (
                  <motion.div
                    key={pm.id} whileTap={{ scale: 0.97 }} onClick={() => setPayMethod(pm.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition ${payMethod === pm.id ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-gray-100 dark:border-gray-700 hover:border-gray-200"}`}
                  >
                    <span className="text-2xl">{pm.emoji}</span>
                    <p className="font-bold text-sm text-gray-800 dark:text-white mt-2">{pm.label}</p>
                    <p className="text-xs text-gray-400">{pm.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-5">
                <div className="flex justify-between font-black text-gray-900 dark:text-white text-lg">
                  <span>Total to Pay</span>
                  <span>ETB {total.toLocaleString()}</span>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleOrder}
                disabled={loading}
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-green-200 dark:shadow-none"
              >
                {loading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : `Pay ETB ${total.toLocaleString()}`}
              </motion.button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <FiCheckCircle className="text-green-600" size={40} />
              </motion.div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Order Placed! 🎉</h2>
              <p className="text-gray-500 mb-8">Your order has been confirmed. You'll receive a confirmation SMS shortly.</p>
              <div className="flex gap-3 justify-center">
                <motion.button whileTap={{ scale: 0.96 }} onClick={() => navigate("/buyer/orders")}
                  className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl">
                  Track Order
                </motion.button>
                <motion.button whileTap={{ scale: 0.96 }} onClick={() => navigate("/products")}
                  className="px-6 py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-xl">
                  Keep Shopping
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
