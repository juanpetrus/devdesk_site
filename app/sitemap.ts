import type { MetadataRoute } from "next";

const BASE = "https://devdesk.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  // Páginas públicas indexáveis (a /obrigado fica de fora de propósito).
  const rotas = [
    { url: "", priority: 1 },
    { url: "/sua-empresa-com-um-site-profissional-7-dias", priority: 0.9 },
    { url: "/sua-loja-virtual-vendendo-em-10-dias", priority: 0.9 },
    { url: "/privacidade", priority: 0.3 },
  ];

  return rotas.map((r) => ({
    url: `${BASE}${r.url}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
