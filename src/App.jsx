import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import MapView from "./components/MapView";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [center, setCenter] = useState(null);

  const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const handleSearch = async ({ query, radius_km }) => {
    try {
      setLoading(true);
      setError(null);
      setResults([]);
      setCenter(null);

      const params = new URLSearchParams({ query, radius_km: String(radius_km) });
      const res = await fetch(`${backend}/api/search?${params.toString()}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Search failed");
      }
      const data = await res.json();
      setCenter(data.center);
      setResults(data.results);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCenter = (place) => {
    setCenter({ lat: place.lat, lon: place.lon, display_name: place.address || place.name });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />

      <header className="relative z-10 px-6 pt-10 pb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Find Laundromats Near You</h1>
        <p className="mt-2 text-blue-200/80">Search any city or address to discover nearby self-service laundry spots.</p>
      </header>

      <main className="relative z-10 px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <SearchBar onSearch={handleSearch} />

            {loading && (
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 text-center">Searching…</div>
            )}

            {error && (
              <div className="bg-red-900/40 border border-red-700 text-red-100 rounded-2xl p-4">{error}</div>
            )}

            {!loading && !error && (
              <ResultsList results={results} onCenter={handleCenter} />
            )}
          </div>

          <div className="md:col-span-1">
            <MapView center={center} />
          </div>
        </div>

        <div className="mt-10 text-center text-slate-400 text-sm">
          Data sources: OpenStreetMap, Overpass API. Results may vary by region.
        </div>
      </main>
    </div>
  );
}

export default App
