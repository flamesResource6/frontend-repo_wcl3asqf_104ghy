import { useState } from "react";

export default function SearchBar({ onSearch, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [radius, setRadius] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch({ query: query.trim(), radius_km: radius });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-slate-800/60 border border-slate-700 rounded-2xl p-4 md:p-5 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a city, address, or place (e.g. Brooklyn, NY)"
          className="flex-1 rounded-xl bg-slate-900/60 border border-slate-700 px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-5 py-3 font-medium transition-colors">
          Search
        </button>
      </div>
      <div className="mt-4 flex flex-col md:flex-row md:items-center gap-3 text-slate-300">
        <label className="text-sm whitespace-nowrap">Radius: {radius} km</label>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>
    </form>
  );
}
