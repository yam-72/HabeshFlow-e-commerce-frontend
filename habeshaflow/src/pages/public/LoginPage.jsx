import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 border border-white/10"
            style={{ width: 200 + i * 120, height: 200 + i * 120 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <div className="relative text-center text-white px-12">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-5xl mx-auto mb-6 border border-white/20">
            🛒
          </div>
          <h1 className="text-4xl font-black mb-3">HabeshaFlow</h1>
          <p className="text-green-200 text-lg">Ethiopia's #1 Online Marketplace</p>
          <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
            {["12,450+ Products", "1,820+ Sellers", "48,000+ Buyers", "56 Cities"].map((s) => (
              <div key={s} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 font-semibold">{s}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 lg:max-w-md flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-black text-lg">H</div>
            <span className="font-black text-xl text-gray-900 dark:text-white">Habesha<span className="text-green-600">Flow</span></span>
          </div>

          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">Email Address</label>
              <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 gap-3 border border-gray-200 dark:border-gray-700 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition">
                <FiMail className="text-gray-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Password</label>
                <Link to="/forgot-password" className="text-xs text-green-600 hover:underline">Forgot password?</Link>
              </div>
              <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 gap-3 border border-gray-200 dark:border-gray-700 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition">
                <FiLock className="text-gray-400" size={16} />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white outline-none"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow-lg shadow-green-200 dark:shadow-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : "Sign In"}
            </motion.button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Google", "Facebook"].map((provider) => (
              <motion.button
                key={provider}
                whileTap={{ scale: 0.97 }}
                className="py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                {provider === "Google" ? "🔵" : "📘"} {provider}
              </motion.button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-600 font-bold hover:underline">Sign Up Free</Link>
          </p>

          {/* Quick access */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <p className="text-xs font-bold text-gray-500 mb-3">Quick Demo Access:</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: "Buyer", path: "/buyer/dashboard", color: "green" },
                { role: "Seller", path: "/seller/dashboard", color: "blue" },
                { role: "Admin", path: "/admin/dashboard", color: "purple" },
              ].map((r) => (
                <Link key={r.role} to={r.path}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition ${
                      r.color === "green" ? "bg-green-100 text-green-700 hover:bg-green-200" :
                      r.color === "blue" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" :
                      "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`}
                  >
                    {r.role}
                  </motion.button>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
