"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { serviceAreaTowns } from "@/content/site";

// Marker coordinates for a readable subset of service-area towns. Towns from
// content/site.ts without an entry here simply render no marker (the accordion
// still lists them), so the client's list can grow without breaking the map.
const TOWN_COORDS: Record<string, [number, number]> = {
  Waukegan: [42.3636, -87.8448],
  Evanston: [42.0451, -87.6877],
  Schaumburg: [42.0334, -88.0834],
  Naperville: [41.7508, -88.1535],
  "Orland Park": [41.6303, -87.8539],
  "Oak Lawn": [41.7109, -87.7581],
  "Tinley Park": [41.5731, -87.7932],
  "Downers Grove": [41.8089, -88.0112],
  Plainfield: [41.627, -88.204],
  Bolingbrook: [41.6986, -88.0684],
};

// Chicago is the core service area — always marked even though the client's
// region list is suburbs-only.
const CHICAGO: [number, number] = [41.8781, -87.6298];

// Round 3 coverage shape: hugs the Lake Michigan shore on the east, reaches
// Waukegan/Gurnee north, Barrington/West Chicago west, and New Lenox/Chicago
// Heights south. Northwest Indiana is intentionally excluded.
const COVERAGE: L.LatLngExpression[] = [
  [42.4, -87.87], // Waukegan/Gurnee north
  [42.36, -87.8], // shore at Waukegan
  [42.05, -87.66], // Evanston shore
  [41.88, -87.6], // Chicago loop shore
  [41.73, -87.52], // south lakefront
  [41.62, -87.53], // Calumet edge (Illinois side only)
  [41.48, -87.62], // Chicago Heights south
  [41.47, -87.85], // Frankfort/Mokena south
  [41.5, -88.0], // New Lenox south
  [41.58, -88.12], // Lockport southwest
  [41.7, -88.22], // Plainfield west
  [41.88, -88.26], // West Chicago west
  [42.08, -88.2], // toward Barrington
  [42.18, -88.13], // Barrington northwest
  [42.32, -88.0], // Grayslake
  [42.4, -87.95], // back to the north edge
];

export default function LeafletMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      attributionControl: true,
    });

    // Initial view: Waukegan (N) to New Lenox/Chicago Heights (S) to the
    // western suburbs — Illinois only.
    map.fitBounds([
      [42.45, -88.32],
      [41.44, -87.45],
    ]);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.polygon(COVERAGE, {
      color: "#c72127",
      weight: 1.5,
      opacity: 0.5,
      fillColor: "#c72127",
      fillOpacity: 0.15,
      interactive: false,
    }).addTo(map);

    function addMarker(coords: [number, number], label: string) {
      L.circleMarker(coords, {
        radius: 6,
        color: "#ffffff",
        weight: 2,
        fillColor: "#c72127",
        fillOpacity: 1,
      })
        .bindTooltip(label, {
          permanent: true,
          direction: "bottom",
          offset: [0, 6],
          className: "service-area-town-label",
        })
        .addTo(map);
    }

    addMarker(CHICAGO, "Chicago");
    for (const { towns } of serviceAreaTowns) {
      for (const town of towns) {
        const coords = TOWN_COORDS[town];
        if (coords) addMarker(coords, town);
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
