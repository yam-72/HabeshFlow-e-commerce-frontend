import { motion } from "framer-motion";
import { FiPackage, FiTruck, FiCheck } from "react-icons/fi";
import PageWrapper from "../../components/common/PageWrapper";
import { orders } from "../../data/mockData";

const STATUS_COLORS = {
  Delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Shipped: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Processing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function OrdersPage() {
  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-6">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-gray-800 dark:text-white">{order.id}</span>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                </div>
                <span className="font-black text-gray-900 dark:text-white">ETB {order.amount.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl">📦</div>
                <div>
                  <p className="font-bold text-sm text-gray-800 dark:text-white">{order.product}</p>
                  <p className="text-xs text-gray-400">{order.store}</p>
                </div>
              </div>

              {order.tracking && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <FiTruck className="text-green-600" size={16} />
                    <span className="text-gray-600 dark:text-gray-300">Tracking: <strong className="text-gray-800 dark:text-white">{order.tracking}</strong></span>
                  </div>
                  <span className="text-xs text-green-600 font-semibold cursor-pointer hover:underline">Track →</span>
                </div>
              )}

              {/* Delivery progress */}
              <div className="flex items-center gap-2 mt-4">
                {["Order Placed", "Processing", "Shipped", "Delivered"].map((s, idx) => {
                  const stepDone = (order.status === "Processing" && idx <= 1) ||
                    (order.status === "Shipped" && idx <= 2) ||
                    (order.status === "Delivered" && idx <= 3);
                  return (
                    <div key={s} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${stepDone ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}`}>
                        {stepDone ? <FiCheck size={11} /> : idx + 1}
                      </div>
                      <span className="text-[9px] text-gray-400 text-center leading-tight">{s}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
