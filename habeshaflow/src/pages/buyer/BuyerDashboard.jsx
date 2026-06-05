import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiPackage, FiHeart, FiMessageSquare, FiCreditCard, FiTrendingUp, FiMapPin, FiClock, FiChevronRight } from "react-icons/fi";
import PageWrapper from "../../components/common/PageWrapper";
import { useApp } from "../../context/AppContext";
import { orders, messages } from "../../data/mockData";

const STATUS_COLORS = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

function StatCard({ icon: Icon, label, value, color, link }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        {link && <Link to={link} className="text-xs text-gray-400 hover:text-green-600"><FiChevronRight /></Link>}
      </div>
      <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </motion.div>
  );
}

export default function BuyerDashboard() {
  const { user, wishlistCount, cartCount } = useApp();

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-7 mb-8 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-64 h-full opacity-10" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 0)",
            backgroundSize: "24px 24px"
          }} />
          <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2 text-7xl opacity-20"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🛍️
          </motion.div>
          <p className="text-green-100 text-sm font-semibold mb-1">Welcome back,</p>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-3">{user.name} 👋</h1>
          <p className="text-green-100 text-sm">You have <strong className="text-white">{orders.filter((o) => o.status === "Shipped").length} orders</strong> in transit and <strong className="text-white">{messages.reduce((s, m) => s + m.unread, 0)} unread messages</strong>.</p>
          <div className="flex gap-3 mt-5">
            <Link to="/products">
              <motion.button whileTap={{ scale: 0.96 }} className="px-5 py-2.5 bg-white text-green-700 font-bold text-sm rounded-xl hover:shadow-lg transition">
                Shop Now
              </motion.button>
            </Link>
            <Link to="/buyer/orders">
              <motion.button whileTap={{ scale: 0.96 }} className="px-5 py-2.5 bg-white/20 text-white font-bold text-sm rounded-xl border border-white/30 hover:bg-white/30 transition">
                Track Orders
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={FiPackage} label="Total Orders" value={orders.length} color="bg-blue-100 text-blue-600" link="/buyer/orders" />
          <StatCard icon={FiHeart} label="Wishlist Items" value={wishlistCount} color="bg-pink-100 text-pink-600" link="/buyer/wishlist" />
          <StatCard icon={FiMessageSquare} label="Messages" value={messages.length} color="bg-amber-100 text-amber-600" link="/buyer/messages" />
          <StatCard icon={FiCreditCard} label="Cart Items" value={cartCount} color="bg-green-100 text-green-600" link="/buyer/cart" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-black text-gray-800 dark:text-white">Recent Orders</h2>
              <Link to="/buyer/orders" className="text-xs text-green-600 font-semibold hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl shrink-0">📦</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-800 dark:text-white truncate">{order.product}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.store} · {order.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                    <p className="text-sm font-black text-gray-800 dark:text-white mt-1">ETB {order.amount.toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Messages + Quick Links */}
          <div className="space-y-5">
            {/* Messages */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-black text-gray-800 dark:text-white">Messages</h2>
                <Link to="/buyer/messages" className="text-xs text-green-600 font-semibold hover:underline">Open</Link>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-700">
                {messages.map((msg, i) => (
                  <div key={msg.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{msg.from}</p>
                      <p className="text-xs text-gray-400 truncate">{msg.last}</p>
                    </div>
                    {msg.unread > 0 && (
                      <span className="w-5 h-5 bg-green-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {msg.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
              <h2 className="font-black text-gray-800 dark:text-white text-sm mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Track Order", icon: "🚚", path: "/buyer/orders", color: "bg-blue-50 text-blue-700" },
                  { label: "My Wishlist", icon: "❤️", path: "/buyer/wishlist", color: "bg-pink-50 text-pink-700" },
                  { label: "My Cart", icon: "🛒", path: "/buyer/cart", color: "bg-green-50 text-green-700" },
                  { label: "Profile", icon: "👤", path: "/buyer/dashboard", color: "bg-amber-50 text-amber-700" },
                ].map((link) => (
                  <Link key={link.label} to={link.path}>
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className={`rounded-xl p-3 flex flex-col items-center gap-1.5 text-center cursor-pointer ${link.color}`}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="text-xs font-bold">{link.label}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
