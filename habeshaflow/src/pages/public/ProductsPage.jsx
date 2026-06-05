import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiGrid, FiList, FiChevronDown } from "react-icons/fi";
import PageWrapper from "../../components/common/PageWrapper";
import ProductCard from "../../components/product/ProductCard";
import { products, categories } from "../../data/mockData";

const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low", "Best Rated", "Most Popular"];
const CITIES = ["All Cities", "Addis Ababa", "Dire Dawa", "Jimma", "Bahir Dar", "Hawassa", "Gondar"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [city, setCity] = useState("All Cities");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let arr = [...products];
    if (search) arr = arr.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (selectedCat !== "All") arr = arr.filter((p) => p.category === selectedCat);
    if (city !== "All Cities") arr = arr.filter((p) => p.location.includes(city));
    arr = arr.filter((p) => p.price <= maxPrice);
    if (sort === "Price: Low to High") arr.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") arr.sort((a, b) => b.price - a.price);
    if (sort === "Best Rated") arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [search, selectedCat, sort, city, maxPrice]);

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2.5 gap-2 border border-gray-200 dark:border-gray-700 focus-within:border-green-400 transition">
            <FiSearch className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="bg-transparent text-sm text-gray-700 dark:text-gray-200 outline-none flex-1"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-200 outline-none"
          >
            {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-200 outline-none"
          >
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition"
          >
            <FiFilter size={15} /> Filters
          </button>

          <div className="flex gap-1">
            {[FiGrid, FiList].map((Icon, i) => (
              <button
                key={i}
                onClick={() => setView(i === 0 ? "grid" : "list")}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                  view === (i === 0 ? "grid" : "list")
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                    : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: "auto" }}
            className="border-t border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <p className="text-xs text-gray-500 mb-2 font-semibold">Max Price: ETB {maxPrice.toLocaleString()}</p>
                  <input
                    type="range" min={500} max={20000} step={500}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-48 accent-green-600"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["All", ...categories.map((c) => c.name)].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCat(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                        selectedCat === cat
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-green-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-bold text-gray-800 dark:text-white">{filtered.length}</span> products found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-gray-500 font-semibold">No products found</p>
            <button onClick={() => { setSearch(""); setSelectedCat("All"); }} className="mt-4 text-green-600 text-sm hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-4 ${view === "grid" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}>
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
