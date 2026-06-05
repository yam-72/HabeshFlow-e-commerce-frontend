import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell,
} from "recharts";
import {
  FiUsers, FiShoppingBag, FiDollarSign, FiAlertTriangle,
  FiCheckCircle, FiXCircle, FiEye, FiSearch, FiFilter,
  FiTrendingUp, FiFlag, FiShield, FiSettings, FiBarChart2,
  FiPackage, FiMessageSquare, FiHome,
} from "react-icons/fi";
import PageWrapper from "../../components/common/PageWrapper";
import { salesChartData, products, stores } from "../../data/mockData";

/* ─── MOCK DATA ─── */
const allUsers = [
  { id: 1, name: "Abebu Tadesse", email: "abebu@email.com", role: "buyer", status: "active", joined: "Jan 2026", orders: 12 },
  { id: 2, name: "Kebede Alemu", email: "kebede@email.com", role: "seller", status: "active", joined: "Feb 2026", orders: 0 },
  { id: 3, name: "Sara Teshome", email: "sara@email.com", role: "buyer", status: "suspended", joined: "Mar 2026", orders: 3 },
  { id: 4, name: "Tewodros Bekele", email: "tewodros@email.com", role: "seller", status: "pending", joined: "Apr 2026", orders: 0 },
  { id: 5, name: "Liya Haile", email: "liya@email.com", role: "buyer", status: "active", joined: "May 2026", orders: 7 },
];

const disputes = [
  { id: "D-1001", buyer: "Abebu T.", seller: "Addis Tech", issue: "Product not delivered", amount: 12500, status: "Open", date: "May 28" },
  { id: "D-1002", buyer: "Sara M.", seller: "Selam Fashion", issue: "Wrong item sent", amount: 2800, status: "Resolved", date: "May 25" },
  { id: "D-1003", buyer: "Dawit A.", seller: "GreenTech ET", issue: "Item damaged on arrival", amount: 1800, status: "Under Review", date: "May 22" },
];

const reports = [
  { id: "R-201", type: "Listing", item: "iPhone 13 Pro", reporter: "Yonas H.", reason: "Counterfeit product", date: "Jun 1" },
  { id: "R-202", type: "User", item: "seller_xyz", reporter: "Meron B.", reason: "Spam messages", date: "May 30" },
  { id: "R-203", type: "Review", item: "5★ review #892", reporter: "System", reason: "Suspicious activity", date: "May 29" },
];

const platformStats = [
  { label: "Total Revenue", value: "ETB 4.8M", change: "+22%", icon: FiDollarSign, color: "bg-green-100 text-green-600" },
  { label: "Active Users", value: "48,241", change: "+15%", icon: FiUsers, color: "bg-blue-100 text-blue-600" },
  { label: "Total Orders", value: "12,890", change: "+18%", icon: FiShoppingBag, color: "bg-purple-100 text-purple-600" },
  { label: "Open Disputes", value: "14", change: "-3", icon: FiAlertTriangle, color: "bg-red-100 text-red-500" },
];

const categoryData = [
  { name: "Electronics", users: 4200, revenue: 1800000 },
  { name: "Fashion", users: 3100, revenue: 980000 },
  { name: "Vehicles", users: 1800, revenue: 2100000 },
  { name: "Home", users: 2400, revenue: 620000 },
  { name: "Agriculture", users: 900, revenue: 340000 },
];

const PIE_COLORS = ["#16a34a", "#3B82F6", "#F59E0B", "#EC4899", "#6366F1"];

const SIDEBAR = [
  { icon: FiHome, label: "Overview" },
  { icon: FiUsers, label: "Users" },
  { icon: FiPackage, label: "Products" },
  { icon: FiShoppingBag, label: "Orders" },
  { icon: FiAlertTriangle, label: "Disputes" },
  { icon: FiFlag, label: "Reports" },
  { icon: FiBarChart2, label: "Analytics" },
  { icon: FiSettings, label: "Settings" },
];

const STATUS_STYLE = {
  active: "bg-green-100 text-green-700",
  suspended: "bg-red-100 text-red-600",
  pending: "bg-amber-100 text-amber-600",
  Open: "bg-red-100 text-red-600",
  "Under Review": "bg-amber-100 text-amber-600",
  Resolved: "bg-green-100 text-green-700",
};

/* ─── STAT CARD ─── */
function StatCard({ icon: Icon, label, value, change, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${change.startsWith("+") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {change}
        </span>
      </div>
      <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [userSearch, setUserSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="flex max-w-screen-2xl mx-auto">
        {/* ── SIDEBAR ── */}
        <motion.aside
          animate={{ width: sidebarOpen ? 220 : 64 }}
          className="shrink-0 bg-gray-900 dark:bg-gray-950 min-h-screen sticky top-16 overflow-hidden"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div className="p-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center h-9 rounded-lg hover:bg-white/10 text-gray-400 transition mb-2"
            >
              <div className="space-y-1">
                <div className="w-4 h-0.5 bg-gray-400" />
                <div className="w-4 h-0.5 bg-gray-400" />
                <div className="w-4 h-0.5 bg-gray-400" />
              </div>
            </motion.button>

            <div className="space-y-1">
              {SIDEBAR.map((item) => (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                    activeTab === item.label
                      ? "bg-green-600 text-white"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon size={17} className="shrink-0" />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="text-sm font-semibold whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 min-w-0 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <p className="text-xs text-red-500 font-bold uppercase tracking-widest">Admin Panel</p>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                {activeTab}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
                <FiSearch size={14} className="text-gray-400" />
                <input
                  placeholder="Quick search…"
                  className="bg-transparent text-sm outline-none text-gray-600 dark:text-gray-300 w-40"
                />
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xs font-black">
                A
              </div>
            </div>
          </div>

          {/* ── OVERVIEW ── */}
          {activeTab === "Overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {platformStats.map((s, i) => (
                  <StatCard key={i} {...s} />
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Revenue line */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-black text-gray-800 dark:text-white">Platform Revenue</h2>
                    <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">+22% this month</span>
                  </div>
                  <ResponsiveContainer width="100%" height={210}>
                    <LineChart data={salesChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}
                        formatter={(v, n) => [n === "revenue" ? `ETB ${v.toLocaleString()}` : v, n === "revenue" ? "Revenue" : "Orders"]}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4, fill: "#16a34a" }} />
                      <Line type="monotone" dataKey="orders" stroke="#6366F1" strokeWidth={2} strokeDasharray="4 2" dot={{ r: 3, fill: "#6366F1" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                  <h2 className="font-black text-gray-800 dark:text-white mb-4">Revenue by Category</h2>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={categoryData} dataKey="revenue" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70}>
                        {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `ETB ${v.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 space-y-1.5">
                    {categoryData.map((d, i) => (
                      <div key={d.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                          <span className="text-gray-600 dark:text-gray-300">{d.name}</span>
                        </div>
                        <span className="font-bold text-gray-800 dark:text-white">ETB {(d.revenue / 1000).toFixed(0)}K</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category bar */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                <h2 className="font-black text-gray-800 dark:text-white mb-4">Active Users by Category</h2>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
                    <Bar dataKey="users" radius={[6, 6, 0, 0]}>
                      {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent disputes + reports */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="font-black text-gray-800 dark:text-white flex items-center gap-2">
                      <FiAlertTriangle className="text-red-500" size={16} /> Open Disputes
                    </h2>
                    <button onClick={() => setActiveTab("Disputes")} className="text-xs text-red-500 font-semibold hover:underline">View All</button>
                  </div>
                  {disputes.filter((d) => d.status !== "Resolved").map((d, i) => (
                    <div key={d.id} className="flex items-center gap-3 px-5 py-3 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                        <FiAlertTriangle size={14} className="text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{d.issue}</p>
                        <p className="text-xs text-gray-400">{d.buyer} → {d.seller}</p>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-1 rounded-full shrink-0 ${STATUS_STYLE[d.status]}`}>{d.status}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="font-black text-gray-800 dark:text-white flex items-center gap-2">
                      <FiFlag className="text-amber-500" size={16} /> Recent Reports
                    </h2>
                    <button onClick={() => setActiveTab("Reports")} className="text-xs text-amber-600 font-semibold hover:underline">View All</button>
                  </div>
                  {reports.map((r) => (
                    <div key={r.id} className="flex items-center gap-3 px-5 py-3 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                        <FiFlag size={14} className="text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{r.item}</p>
                        <p className="text-xs text-gray-400">{r.reason} · {r.date}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full shrink-0">{r.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── USERS ── */}
          {activeTab === "Users" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 flex-1 min-w-[220px]">
                  <FiSearch size={14} className="text-gray-400" />
                  <input
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users…"
                    className="bg-transparent text-sm outline-none text-gray-600 dark:text-gray-300 flex-1"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-600 dark:text-gray-300">
                  <FiFilter size={14} /> Filter
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        {["User", "Email", "Role", "Status", "Joined", "Orders", "Actions"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                      <AnimatePresence>
                        {filteredUsers.map((u, i) => (
                          <motion.tr
                            key={u.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                          >
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                  {u.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <span className="text-sm font-semibold text-gray-800 dark:text-white">{u.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-sm text-gray-500">{u.email}</td>
                            <td className="px-4 py-3.5">
                              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${u.role === "seller" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[u.status]}`}>
                                {u.status}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-sm text-gray-500">{u.joined}</td>
                            <td className="px-4 py-3.5 text-sm font-bold text-gray-800 dark:text-white">{u.orders}</td>
                            <td className="px-4 py-3.5">
                              <div className="flex gap-1.5">
                                <motion.button whileTap={{ scale: 0.9 }} className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition">
                                  <FiEye size={12} />
                                </motion.button>
                                <motion.button whileTap={{ scale: 0.9 }} className={`w-7 h-7 rounded-lg flex items-center justify-center transition ${u.status === "active" ? "bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100" : "bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100"}`}>
                                  {u.status === "active" ? <FiXCircle size={12} /> : <FiCheckCircle size={12} />}
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12 text-gray-400">No users found</div>
                )}
              </div>

              {/* Seller approvals */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="font-black text-gray-800 dark:text-white flex items-center gap-2">
                    <FiShield className="text-amber-500" /> Pending Seller Approvals
                  </h2>
                </div>
                {allUsers.filter((u) => u.status === "pending").map((u) => (
                  <div key={u.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold shrink-0">
                      {u.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-gray-800 dark:text-white">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email} · Applied {u.joined}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button whileTap={{ scale: 0.9 }} className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-xl">
                        <FiCheckCircle size={13} /> Approve
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.9 }} className="flex items-center gap-1.5 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 text-xs font-bold rounded-xl border border-red-200 dark:border-red-800">
                        <FiXCircle size={13} /> Reject
                      </motion.button>
                    </div>
                  </div>
                ))}
                {allUsers.filter((u) => u.status === "pending").length === 0 && (
                  <p className="text-center py-8 text-gray-400 text-sm">No pending approvals</p>
                )}
              </div>
            </motion.div>
          )}

          {/* ── PRODUCTS ── */}
          {activeTab === "Products" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Total Listed", value: "12,450", color: "text-green-600" },
                  { label: "Pending Review", value: "38", color: "text-amber-600" },
                  { label: "Reported", value: "7", color: "text-red-500" },
                ].map((s) => (
                  <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 text-center">
                    <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="font-black text-gray-800 dark:text-white">Product Moderation</h2>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-2">
                    <FiSearch size={13} className="text-gray-400" />
                    <input placeholder="Search…" className="bg-transparent text-sm outline-none text-gray-600 dark:text-gray-300 w-32" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        {["Product", "Store", "Price", "Status", "Rating", "Actions"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                      {products.map((p, i) => (
                        <motion.tr
                          key={p.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                        >
                          <td className="px-4 py-3.5 flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl">{p.image}</div>
                            <span className="text-sm font-semibold text-gray-800 dark:text-white max-w-[140px] truncate">{p.name}</span>
                          </td>
                          <td className="px-4 py-3.5 text-sm text-gray-500">{p.store}</td>
                          <td className="px-4 py-3.5 text-sm font-bold text-gray-800 dark:text-white">ETB {p.price.toLocaleString()}</td>
                          <td className="px-4 py-3.5">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                              {p.inStock ? "Active" : "Out of Stock"}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-sm text-amber-500 font-bold">⭐ {p.rating}</td>
                          <td className="px-4 py-3.5">
                            <div className="flex gap-1.5">
                              <motion.button whileTap={{ scale: 0.9 }} className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition">
                                <FiEye size={12} />
                              </motion.button>
                              <motion.button whileTap={{ scale: 0.9 }} className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center hover:bg-red-100 transition">
                                <FiXCircle size={12} />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── DISPUTES ── */}
          {activeTab === "Disputes" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-2">
                {[
                  { label: "Open", count: disputes.filter((d) => d.status === "Open").length, color: "text-red-500 bg-red-50" },
                  { label: "Under Review", count: disputes.filter((d) => d.status === "Under Review").length, color: "text-amber-600 bg-amber-50" },
                  { label: "Resolved", count: disputes.filter((d) => d.status === "Resolved").length, color: "text-green-600 bg-green-50" },
                ].map((s) => (
                  <div key={s.label} className={`rounded-2xl p-4 text-center ${s.color}`}>
                    <p className="text-3xl font-black">{s.count}</p>
                    <p className="text-sm font-semibold mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {disputes.map((d, i) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5"
                >
                  <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                        <FiAlertTriangle className="text-red-500" size={18} />
                      </div>
                      <div>
                        <p className="font-black text-gray-800 dark:text-white">{d.id}</p>
                        <p className="text-xs text-gray-400">{d.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${STATUS_STYLE[d.status]}`}>{d.status}</span>
                  </div>
                  <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{d.issue}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>Buyer: <strong className="text-gray-700 dark:text-gray-200">{d.buyer}</strong></span>
                    <span>Seller: <strong className="text-gray-700 dark:text-gray-200">{d.seller}</strong></span>
                    <span>Amount: <strong className="text-gray-700 dark:text-gray-200">ETB {d.amount.toLocaleString()}</strong></span>
                  </div>
                  {d.status !== "Resolved" && (
                    <div className="flex gap-2">
                      <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-xl">
                        <FiCheckCircle size={13} /> Resolve in Buyer's Favor
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl">
                        <FiCheckCircle size={13} /> Resolve in Seller's Favor
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-xl">
                        <FiEye size={13} /> Investigate
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── REPORTS ── */}
          {activeTab === "Reports" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <p className="text-sm text-gray-500 mb-2">{reports.length} reports awaiting review</p>
              {reports.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 flex items-center gap-4 flex-wrap"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                    <FiFlag className="text-amber-500" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-gray-800 dark:text-white">{r.id}</span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded-full">{r.type}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{r.item}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Reason: {r.reason} · Reported by: {r.reporter} · {r.date}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <motion.button whileTap={{ scale: 0.9 }} className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 text-xs font-bold rounded-xl border border-red-200 dark:border-red-800">
                      Remove
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.9 }} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-xl">
                      Dismiss
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.9 }} className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-xs font-bold rounded-xl">
                      <FiEye size={13} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── ANALYTICS ── */}
          {activeTab === "Analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "GMV This Month", value: "ETB 4.8M", icon: "💰" },
                  { label: "New Users", value: "+2,841", icon: "👤" },
                  { label: "Conversion Rate", value: "3.8%", icon: "📈" },
                  { label: "Avg. Session", value: "4m 32s", icon: "⏱️" },
                ].map((s) => (
                  <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 text-center">
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <p className="text-xl font-black text-gray-900 dark:text-white">{s.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                  <h2 className="font-black text-gray-800 dark:text-white mb-4">Monthly Revenue</h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={salesChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v) => [`ETB ${v.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: 12, border: "none" }} />
                      <Bar dataKey="revenue" fill="#16a34a" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                  <h2 className="font-black text-gray-800 dark:text-white mb-4">Order Trend</h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={salesChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
                      <Line type="monotone" dataKey="orders" stroke="#6366F1" strokeWidth={2.5} dot={{ r: 4, fill: "#6366F1" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top sellers table */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="font-black text-gray-800 dark:text-white">Top Performing Stores</h2>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      {["#", "Store", "City", "Products", "Rating", "Sales"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                    {stores.map((s, i) => (
                      <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                        <td className="px-4 py-3.5 text-sm font-bold text-gray-500">#{i + 1}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">{s.name[0]}</div>
                            <span className="text-sm font-semibold text-gray-800 dark:text-white">{s.name}</span>
                            {s.verified && <span className="text-blue-500 text-xs">✓</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-gray-500">{s.city}</td>
                        <td className="px-4 py-3.5 text-sm font-bold text-gray-800 dark:text-white">{s.products}</td>
                        <td className="px-4 py-3.5 text-sm text-amber-500 font-bold">⭐ {s.rating}</td>
                        <td className="px-4 py-3.5 text-sm font-black text-green-600">{s.sales.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── SETTINGS ── */}
          {activeTab === "Settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-2xl">
              {[
                {
                  title: "Platform Settings",
                  items: [
                    { label: "Maintenance Mode", desc: "Take platform offline for maintenance", type: "toggle", default: false },
                    { label: "New Registrations", desc: "Allow new user registrations", type: "toggle", default: true },
                    { label: "Seller Auto-Approval", desc: "Automatically approve new sellers", type: "toggle", default: false },
                  ],
                },
                {
                  title: "Notification Settings",
                  items: [
                    { label: "Email Alerts for Disputes", desc: "Receive email when new dispute is opened", type: "toggle", default: true },
                    { label: "Daily Revenue Report", desc: "Send daily revenue summary to admin email", type: "toggle", default: true },
                  ],
                },
              ].map((section) => (
                <div key={section.title} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="font-black text-gray-800 dark:text-white">{section.title}</h2>
                  </div>
                  <div className="divide-y divide-gray-50 dark:divide-gray-700">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-5 py-4">
                        <div>
                          <p className="font-semibold text-sm text-gray-800 dark:text-white">{item.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                        </div>
                        <ToggleSwitch defaultOn={item.default} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                <h2 className="font-black text-gray-800 dark:text-white mb-4">Platform Commission Rate</h2>
                <div className="flex items-center gap-4">
                  <input
                    type="range" min={1} max={20} defaultValue={5}
                    className="flex-1 accent-green-600"
                  />
                  <span className="text-2xl font-black text-green-600 w-16 text-right">5%</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Commission charged on each successful transaction</p>
              </div>
            </motion.div>
          )}

          {/* Orders tab */}
          {activeTab === "Orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Today", value: "124", color: "text-blue-600" },
                  { label: "Processing", value: "38", color: "text-amber-600" },
                  { label: "Shipped", value: "67", color: "text-indigo-600" },
                  { label: "Delivered", value: "19", color: "text-green-600" },
                ].map((s) => (
                  <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 text-center">
                    <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="font-black text-gray-800 dark:text-white">All Platform Orders</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        {["Order ID", "Product", "Buyer", "Store", "Amount", "Status", "Date"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                      {[
                        { id: "#2001", product: "Samsung A54", buyer: "Abebu T.", store: "Addis Tech", amount: 12500, status: "Shipped", date: "Jun 1" },
                        { id: "#2002", product: "Habesha Kemis", buyer: "Sara M.", store: "Selam Fashion", amount: 2800, status: "Delivered", date: "May 31" },
                        { id: "#2003", product: "Coffee Set", buyer: "Dawit A.", store: "Ethiopian Craft", amount: 1200, status: "Processing", date: "May 30" },
                        { id: "#2004", product: "Solar Power Bank", buyer: "Liya H.", store: "GreenTech ET", amount: 1800, status: "Delivered", date: "May 29" },
                        { id: "#2005", product: "Leather Bag", buyer: "Kebede A.", store: "Leather World", amount: 950, status: "Shipped", date: "May 28" },
                      ].map((o, i) => (
                        <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                          <td className="px-4 py-3.5 text-sm font-bold text-gray-800 dark:text-white">{o.id}</td>
                          <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-300">{o.product}</td>
                          <td className="px-4 py-3.5 text-sm text-gray-500">{o.buyer}</td>
                          <td className="px-4 py-3.5 text-sm text-gray-500">{o.store}</td>
                          <td className="px-4 py-3.5 text-sm font-black text-gray-900 dark:text-white">ETB {o.amount.toLocaleString()}</td>
                          <td className="px-4 py-3.5">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                              o.status === "Delivered" ? "bg-green-100 text-green-700" :
                              o.status === "Shipped" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                            }`}>{o.status}</span>
                          </td>
                          <td className="px-4 py-3.5 text-sm text-gray-400">{o.date}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

/* ─── TOGGLE SWITCH ─── */
function ToggleSwitch({ defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <motion.button
      onClick={() => setOn(!on)}
      className={`w-11 h-6 rounded-full relative transition-colors duration-300 shrink-0 ${on ? "bg-green-500" : "bg-gray-200 dark:bg-gray-600"}`}
    >
      <motion.div
        animate={{ x: on ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 bg-white rounded-full shadow absolute top-0.5"
      />
    </motion.button>
  );
}
