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

    async function initMap() {
      if (!mapRef.current || !window.L || mapInstanceRef.current) return;

      // Adresse für Geocoding
      const address = "Zinkenstraße 19, 72336 Balingen, Deutschland";
      
      // Fallback-Koordinaten (ungefähr Balingen Zentrum)
      let location = [48.2745, 8.8542];

      // Geocoding mit OpenStreetMap Nominatim API (kostenlos)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
          {
            headers: {
              'User-Agent': 'Elektro-Rugova-Website' // Nominatim erfordert User-Agent
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            location = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          }
        }
      } catch (error) {
        console.log("Geocoding Fehler, verwende Fallback-Koordinaten:", error);
      }

      // Karte initialisieren
      mapInstanceRef.current = window.L.map(mapRef.current, {
        center: location,
        zoom: 17, // Höherer Zoom für genauere Position
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
            background: linear-gradient(135deg, #1e40af 0%, #0ea5e9 50%, #f97316 100%);
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

      // Popup hinzufügen mit größerer Breite und Google Maps Link
      const popupContent = `
        <div style="
          padding: 12px; 
          font-family: system-ui, -apple-system, sans-serif;
          min-width: 200px;
          max-width: 250px;
        ">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1e40af; font-size: 16px;">
            Elektro Rugova
          </h3>
          <p style="margin: 0 0 10px 0; color: #666; font-size: 14px; line-height: 1.4;">
            Zinkenstraße 19<br>72336 Balingen
          </p>
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=${location[0]},${location[1]}" 
            target="_blank" 
            rel="noopener noreferrer"
            style="
              display: block;
              text-align: center;
              margin-top: 8px;
              padding: 8px 16px;
              background: linear-gradient(135deg, #1e40af 0%, #0ea5e9 50%, #f97316 100%);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-size: 13px;
              font-weight: 600;
              white-space: nowrap;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              transition: transform 0.2s;
            "
            onmouseover="this.style.transform='scale(1.05)'"
            onmouseout="this.style.transform='scale(1)'"
          >
            Route anzeigen
          </a>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: 'custom-popup'
      }).openPopup(); // Popup automatisch öffnen

      // Karte anpassen, damit Marker sichtbar ist
      mapInstanceRef.current.setView(location, 17);
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

