import type { MetadataRoute } from "next";

// Production domain per the live site (diamondhomeservice.com). Confirm with
// the client whether the rebuild replaces it or launches elsewhere.
const BASE_URL = "https://www.diamondhomeservice.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, priority: 1 },
    { url: `${BASE_URL}/roofing`, priority: 0.9 },
    { url: `${BASE_URL}/windows`, priority: 0.7 },
    { url: `${BASE_URL}/siding`, priority: 0.7 },
    { url: `${BASE_URL}/gutters`, priority: 0.7 },
  ];
}
