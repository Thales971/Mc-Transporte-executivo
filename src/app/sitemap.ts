import type { MetadataRoute } from "next";

/**
 * Sitemap dinâmico para SEO.
 * Gera a estrutura de URLs do site para os mecanismos de busca.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mctransporte.com.br";

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
