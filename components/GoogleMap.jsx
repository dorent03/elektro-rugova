"use client";
import { useEffect, useRef } from "react";

export default function GoogleMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Prüfen ob Leaflet bereits geladen ist
    if (window.L && mapInstanceRef.current) {
      return;
    }

    // Leaflet CSS laden
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);
    }

    // Leaflet JS laden
    if (!window.L) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      script.crossOrigin = "";
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current || !window.L || mapInstanceRef.current) return;

      // Koordinaten für Zinkenstraße 19, 72336 Balingen
      // Ungefähre Koordinaten für Balingen (kann später präzisiert werden)
      const location = [48.2736, 8.8536];

      // Karte initialisieren
      mapInstanceRef.current = window.L.map(mapRef.current, {
        center: location,
        zoom: 15,
        scrollWheelZoom: true,
        zoomControl: true,
      });

      // OpenStreetMap Tile Layer hinzufügen
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      // Custom Icon erstellen
      const customIcon = window.L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          ">⚡</div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      // Marker hinzufügen
      const marker = window.L.marker(location, { icon: customIcon }).addTo(
        mapInstanceRef.current
      );

      // Popup hinzufügen
      marker.bindPopup(`
        <div style="padding: 8px; font-family: system-ui, -apple-system, sans-serif;">
          <h3 style="margin: 0 0 5px 0; font-weight: bold; color: #667eea; font-size: 16px;">
            Elektro Rugova
          </h3>
          <p style="margin: 0; color: #666; font-size: 14px;">
            Zinkenstraße 19<br>72336 Balingen
          </p>
          <a 
            href="https://www.openstreetmap.org/directions?to=${location[0]},${location[1]}" 
            target="_blank" 
            rel="noopener noreferrer"
            style="
              display: inline-block;
              margin-top: 8px;
              padding: 4px 12px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-size: 12px;
            "
          >
            Route anzeigen
          </a>
        </div>
      `);

      // Karte anpassen, damit Marker sichtbar ist
      mapInstanceRef.current.setView(location, 15);
    }

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-3xl z-0"
      style={{ minHeight: "256px" }}
    />
  );
}

