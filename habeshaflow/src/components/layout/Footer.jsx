import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-black text-lg">H</div>
              <span className="font-black text-xl text-white">Habesha<span className="text-green-500">Flow</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">Ethiopia's premier hybrid e-commerce & classified marketplace. Buy, sell, and connect — all in one place.</p>
            <div className="flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram, FiYoutube].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ y: -2, color: "#22c55e" }} className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-green-900/40 transition-colors">
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Marketplace</h4>
            <ul className="space-y-2">
              {["Products", "Listings", "Categories", "Top Sellers", "Flash Deals", "New Arrivals"].map((l) => (
                <li key={l}><Link to="/products" className="text-sm text-gray-400 hover:text-green-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Account</h4>
            <ul className="space-y-2">
              {[
                { label: "Buyer Dashboard", path: "/buyer/dashboard" },
                { label: "Seller Dashboard", path: "/seller/dashboard" },
                { label: "My Orders", path: "/buyer/orders" },
                { label: "Wishlist", path: "/buyer/wishlist" },
                { label: "Messages", path: "/buyer/messages" },
                { label: "Settings", path: "/buyer/dashboard" },
              ].map((l) => (
                <li key={l.label}><Link to={l.path} className="text-sm text-gray-400 hover:text-green-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-green-500 mt-0.5 shrink-0" size={16} />
                <span className="text-sm text-gray-400">Bole Sub-City, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-green-500 shrink-0" size={16} />
                <span className="text-sm text-gray-400">+251 911 234 567</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-green-500 shrink-0" size={16} />
                <span className="text-sm text-gray-400">hello@habeshaflow.com</span>
              </div>
            </div>
            {/* Newsletter */}
            <div className="mt-5">
              <p className="text-xs text-gray-500 mb-2">Subscribe for deals</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-gray-800 text-sm text-gray-200 rounded-lg px-3 py-2 outline-none border border-gray-700 focus:border-green-500 transition"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition font-semibold"
                >
                  Go
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="py-6 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-gray-500">Accepted payments:</span>
          <div className="flex gap-3">
            {["Telebirr", "CBE Birr", "Awash Bank", "Bank Transfer", "Cash on Delivery"].map((p) => (
              <span key={p} className="px-3 py-1 bg-gray-800 rounded-md text-xs text-gray-400 border border-gray-700">{p}</span>
            ))}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 HabeshaFlow. All rights reserved. Made with ❤️ in Ethiopia.</p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => (
              <Link key={l} to="#" className="text-xs text-gray-500 hover:text-gray-300 transition">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
