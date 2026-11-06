import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

const BASE_URL = siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, priority: 1 },
    { url: `${BASE_URL}/roofing`, priority: 0.9 },
    { url: `${BASE_URL}/windows`, priority: 0.7 },
    { url: `${BASE_URL}/siding`, priority: 0.7 },
    { url: `${BASE_URL}/gutters`, priority: 0.7 },
  ];
}
