import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", role: "buyer" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 2) { setStep(2); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-black text-lg">H</div>
          <span className="font-black text-xl text-gray-900 dark:text-white">Habesha<span className="text-green-600">Flow</span></span>
        </div>

        <div className="flex gap-2 mb-6">
          {[1, 2].map((s) => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? "bg-green-500" : "bg-gray-100 dark:bg-gray-700"}`} />
          ))}
        </div>

        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-1">
          {step === 1 ? "Create your account" : "Choose your role"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {step === 1 ? "Join thousands of buyers and sellers" : "How will you use HabeshaFlow?"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "firstName", label: "First Name", icon: FiUser, placeholder: "Abebe" },
                  { key: "lastName", label: "Last Name", icon: FiUser, placeholder: "Bikila" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">{f.label}</label>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-2.5 gap-2 border border-gray-200 dark:border-gray-600 focus-within:border-green-400 transition">
                      <f.icon size={14} className="text-gray-400" />
                      <input
                        value={form[f.key]}
                        onChange={(e) => update(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white outline-none"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
              {[
                { key: "email", label: "Email", icon: FiMail, type: "email", placeholder: "you@example.com" },
                { key: "phone", label: "Phone Number", icon: FiPhone, type: "tel", placeholder: "+251 9XX XXX XXX" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">{f.label}</label>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-2.5 gap-2 border border-gray-200 dark:border-gray-600 focus-within:border-green-400 transition">
                    <f.icon size={14} className="text-gray-400" />
                    <input type={f.type} value={form[f.key]} onChange={(e) => update(f.key, e.target.value)} placeholder={f.placeholder} className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white outline-none" required />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">Password</label>
                <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-2.5 gap-2 border border-gray-200 dark:border-gray-600 focus-within:border-green-400 transition">
                  <FiLock size={14} className="text-gray-400" />
                  <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Min 8 characters" className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white outline-none" required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400"><FiEye size={14} /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: "buyer", emoji: "🛍️", title: "I'm a Buyer", desc: "Shop products and listings from verified sellers" },
                { value: "seller", emoji: "🏪", title: "I'm a Seller", desc: "Open a store and sell your products" },
                { value: "both", emoji: "🔄", title: "Buy & Sell", desc: "Do both — switch anytime" },
              ].map((r) => (
                <motion.div
                  key={r.value}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => update("role", r.value)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                    form.role === r.value ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-gray-100 dark:border-gray-700 hover:border-gray-200"
                  }`}
                >
                  <span className="text-3xl">{r.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white text-sm">{r.title}</p>
                    <p className="text-xs text-gray-500">{r.desc}</p>
                  </div>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.role === r.value ? "border-green-500 bg-green-500" : "border-gray-200"}`}>
                    {form.role === r.value && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow-lg shadow-green-200 dark:shadow-none flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : step === 1 ? "Continue →" : "Create Account"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-bold hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
