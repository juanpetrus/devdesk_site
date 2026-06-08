import type { MetadataRoute } from "next";

const BASE = "https://devdesktech.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Página de conversão e API não devem ser indexadas.
      disallow: ["/obrigado", "/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
