import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell,
} from "recharts";
import { FiTrendingUp, FiShoppingBag, FiDollarSign, FiUsers, FiStar, FiPackage, FiPlus, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import PageWrapper from "../../components/common/PageWrapper";
import { salesChartData, products, orders } from "../../data/mockData";

const TABS = ["Overview", "Products", "Orders", "Analytics"];

const PIE_DATA = [
  { name: "Electronics", value: 40, color: "#3B82F6" },
  { name: "Fashion", value: 28, color: "#EC4899" },
  { name: "Home", value: 18, color: "#F59E0B" },
  { name: "Others", value: 14, color: "#10B981" },
];

function StatCard({ icon: Icon, label, value, change, color }) {
  const positive = change >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}><Icon size={20} /></div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {positive ? "+" : ""}{change}%
        </span>
      </div>
      <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </motion.div>
  );
}

export default function SellerDashboard() {
  const [tab, setTab] = useState("Overview");

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="text-xs text-green-600 font-bold uppercase tracking-widest">Seller Dashboard</p>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Addis Tech Store</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow-lg shadow-green-200 dark:shadow-none text-sm"
          >
            <FiPlus size={16} /> Add Product
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl mb-8 w-fit">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition ${tab === t ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Overview" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={FiDollarSign} label="Total Revenue" value="ETB 102K" change={18} color="bg-green-100 text-green-600" />
              <StatCard icon={FiShoppingBag} label="Total Orders" value="720" change={12} color="bg-blue-100 text-blue-600" />
              <StatCard icon={FiUsers} label="Customers" value="2,341" change={8} color="bg-purple-100 text-purple-600" />
              <StatCard icon={FiStar} label="Avg. Rating" value="4.7 ⭐" change={2} color="bg-amber-100 text-amber-600" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-black text-gray-800 dark:text-white">Revenue & Orders</h2>
                  <select className="text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 text-gray-600 dark:text-gray-300 outline-none">
                    <option>Last 6 months</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={salesChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                      formatter={(v, n) => [n === "revenue" ? `ETB ${v.toLocaleString()}` : v, n === "revenue" ? "Revenue" : "Orders"]}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4, fill: "#16a34a" }} />
                    <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} strokeDasharray="4 2" dot={{ r: 3, fill: "#3B82F6" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category Pie */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                <h2 className="font-black text-gray-800 dark:text-white mb-5">Sales by Category</h2>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                      {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-3">
                  {PIE_DATA.map((d) => (
                    <div key={d.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                        <span className="text-gray-600 dark:text-gray-300">{d.name}</span>
                      </div>
                      <span className="font-bold text-gray-800 dark:text-white">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bar chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
              <h2 className="font-black text-gray-800 dark:text-white mb-5">Monthly Orders</h2>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={salesChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
                  <Bar dataKey="orders" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {tab === "Products" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-black text-gray-800 dark:text-white">My Products ({products.length})</h2>
              <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-xl">
                <FiPlus /> Add New
              </motion.button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {["Product", "Category", "Price", "Stock", "Rating", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                  {products.slice(0, 5).map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="px-4 py-3.5 flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xl">{p.image}</div>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white truncate max-w-[160px]">{p.name}</span>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-500">{p.category}</td>
                      <td className="px-4 py-3.5 text-sm font-bold text-gray-800 dark:text-white">ETB {p.price.toLocaleString()}</td>
                      <td className="px-4 py-3.5">
                        <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {p.inStock ? "In Stock" : "Out"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-amber-500 font-bold">⭐ {p.rating}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-2">
                          <button className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"><FiEdit2 size={13} /></button>
                          <button className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition"><FiTrash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "Orders" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-black text-gray-800 dark:text-white">Incoming Orders</h2>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {orders.map((o, i) => (
                <motion.div key={o.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl">📦</div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-800 dark:text-white">{o.product}</p>
                    <p className="text-xs text-gray-400">{o.id} · {o.date}</p>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    o.status === "Delivered" ? "bg-green-100 text-green-700" :
                    o.status === "Shipped" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                  }`}>{o.status}</span>
                  <span className="font-black text-gray-900 dark:text-white text-sm">ETB {o.amount.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {tab === "Analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
              <h2 className="font-black text-gray-800 dark:text-white mb-4">Revenue Trend</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} formatter={(v) => [`ETB ${v.toLocaleString()}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
              <h2 className="font-black text-gray-800 dark:text-white mb-4">Order Volume</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={salesChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
                  <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 4, fill: "#3B82F6" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Conversion Rate", value: "3.8%", icon: "🎯" },
                { label: "Avg. Order Value", value: "ETB 4,200", icon: "💰" },
                { label: "Return Rate", value: "1.2%", icon: "🔄" },
                { label: "Customer Retention", value: "68%", icon: "❤️" },
              ].map((s) => (
                <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 text-center">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <p className="font-black text-xl text-gray-900 dark:text-white">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
