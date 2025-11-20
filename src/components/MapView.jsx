import { useEffect, useRef } from "react";

// Simple Leaflet-free map using an embedded OSM static tile grid via leaflet CDN would require deps.
// To keep dependencies minimal, we render a lightweight map with MapTiler Static API alternative disabled.
// Instead, we show a placeholder card with coordinates and link to OSM map.

export default function MapView({ center }) {
  if (!center) {
    return (
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 text-slate-300">
        Search to see the area here. We keep it simple with a link to OpenStreetMap.
      </div>
    );
  }

  const mapUrl = `https://www.openstreetmap.org/?mlat=${center.lat}&mlon=${center.lon}#map=14/${center.lat}/${center.lon}`;

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-300">Center</div>
          <div className="text-white font-semibold">{center.display_name}</div>
        </div>
        <a href={mapUrl} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-white text-sm">Open Map</a>
      </div>
      <div className="aspect-video bg-[url('https://tile.openstreetmap.org/10/511/340.png')] bg-cover bg-center flex items-center justify-center text-slate-400">
        <div className="backdrop-blur-sm bg-slate-900/40 rounded-md px-3 py-1 text-xs">
          Map preview. Use the link above for interactive view.
        </div>
      </div>
    </div>
  );
}
