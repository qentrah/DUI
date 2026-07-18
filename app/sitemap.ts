import type { MetadataRoute } from "next"
import { blockCatalog, componentCatalog } from "@/lib/catalog"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ui.qentrah.com"
  const routes = ["", "/docs", "/components", "/blocks", "/skills"]
  return [
    ...routes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.8 })),
    ...componentCatalog.map((item) => ({ url: `${siteUrl}/components/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...blockCatalog.map((item) => ({ url: `${siteUrl}/blocks/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ]
}
