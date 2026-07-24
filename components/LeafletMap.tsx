"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { serviceAreaTowns } from "@/content/site";

// Coordinates for named service-area towns. Towns from content/site.ts without
// an entry here simply render no marker (the chip list still shows them), so
// the client's future full town list drops in without breaking the map.
const TOWN_COORDS: Record<string, [number, number]> = {
  Chicago: [41.8781, -87.6298],
  Naperville: [41.7508, -88.1535],
  "Orland Park": [41.6303, -87.8539],
  "Oak Lawn": [41.7109, -87.7581],
  "Tinley Park": [41.5731, -87.7932],
  "Downers Grove": [41.8089, -88.0112],
  Plainfield: [41.627, -88.204],
  Bolingbrook: [41.6986, -88.0684],
};

// Translucent red coverage ellipse spanning the eight service regions:
// Chicago, North Shore, NW suburbs, west suburbs, SW suburbs, south suburbs,
// the Waukegan area (north), and Northwest Indiana (southeast).
function coverageEllipse(): L.LatLngExpression[] {
  const cy = 41.9;
  const cx = -87.85;
  const ry = 0.5;
  const rx = 0.55;
  const points: L.LatLngExpression[] = [];
  for (let i = 0; i < 64; i++) {
    const t = (i / 64) * 2 * Math.PI;
    points.push([cy + ry * Math.sin(t), cx + rx * Math.cos(t)]);
  }
  return points;
}

export default function LeafletMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      attributionControl: true,
    });

    // Initial view: Waukegan (N) to Northwest Indiana (SE) to the west suburbs.
    map.fitBounds([
      [42.4, -88.35],
      [41.42, -87.25],
    ]);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.polygon(coverageEllipse(), {
      color: "#c72127",
      weight: 1.5,
      opacity: 0.5,
      fillColor: "#c72127",
      fillOpacity: 0.15,
      interactive: false,
    }).addTo(map);

    for (const { towns } of serviceAreaTowns) {
      for (const town of towns) {
        const coords = TOWN_COORDS[town];
        if (!coords) continue;
        L.circleMarker(coords, {
          radius: 6,
          color: "#ffffff",
          weight: 2,
          fillColor: "#c72127",
          fillOpacity: 1,
        })
          .bindTooltip(town, {
            permanent: true,
            direction: "bottom",
            offset: [0, 6],
            className: "service-area-town-label",
          })
          .addTo(map);
      }
    }

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      role="region"
      aria-label="Interactive map of the Diamond Home Service coverage area"
    />
  );
}
