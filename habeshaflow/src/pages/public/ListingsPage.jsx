import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/common/PageWrapper";
import ListingCard from "../../components/listing/ListingCard";
import { listings } from "../../data/mockData";

const LIST_CATS = ["All", "Vehicles", "Real Estate", "Electronics", "Furniture", "Pets", "Food & Drink"];

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = useMemo(() => {
    let arr = [...listings];
    if (search) arr = arr.filter((l) => l.title.toLowerCase().includes(search.toLowerCase()));
    if (cat !== "All") arr = arr.filter((l) => l.category === cat);
    return arr;
  }, [search, cat]);

  return (
    <PageWrapper className="bg-amber-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-700 to-yellow-600 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-amber-200 text-sm font-bold uppercase tracking-widest mb-2">Classifieds</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">Post. Find. Connect.</h1>
          <p className="text-amber-100 mb-6">Ethiopia's fastest-growing peer-to-peer listings platform</p>
          <div className="flex gap-3">
            <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-3 gap-2 shadow-xl">
              <FiSearch className="text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search listings…"
                className="flex-1 bg-transparent text-gray-700 outline-none text-sm"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-xl text-sm shrink-0"
            >
              <FiPlus /> Post Listing
            </motion.button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {LIST_CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold shrink-0 transition ${
                cat === c ? "bg-amber-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-amber-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-sm text-gray-500 mb-6">
          <span className="font-bold text-gray-800 dark:text-white">{filtered.length}</span> listings found
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {filtered.map((l, i) => <ListingCard key={l.id} listing={l} index={i} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <span className="text-6xl mb-4 block">📋</span>
            <p className="text-gray-500">No listings found</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
