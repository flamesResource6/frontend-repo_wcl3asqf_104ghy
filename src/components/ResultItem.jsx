import { MapPin, Phone, Globe } from "lucide-react";

export default function ResultItem({ place, onCenter }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 md:p-5 hover:border-blue-500/40 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white leading-tight">{place.name}</h3>
          {place.address && (
            <p className="mt-1 text-slate-300 text-sm flex items-start gap-1">
              <MapPin className="w-4 h-4 mt-0.5 text-blue-400" />
              <span>{place.address}</span>
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            {place.phone && (
              <a href={`tel:${place.phone}`} className="inline-flex items-center gap-1 text-slate-300 hover:text-white">
                <Phone className="w-4 h-4" /> {place.phone}
              </a>
            )}
            {place.website && (
              <a href={place.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-300 hover:text-white">
                <Globe className="w-4 h-4" /> Website
              </a>
            )}
            <a href={place.osm_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white text-sm">View on OSM</a>
          </div>
        </div>
        <button onClick={() => onCenter?.(place)} className="text-blue-300 hover:text-white text-sm">Center</button>
      </div>
    </div>
  );
}
