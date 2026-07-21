import type { MetadataRoute } from "next"
import { blockCatalog, componentCatalog, skillCatalog } from "@/lib/catalog"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ui.qentrah.com"

  const mainPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/docs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/components`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/blocks`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/skills`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ]

  const componentPages: MetadataRoute.Sitemap = componentCatalog.map((item) => ({
    url: `${siteUrl}/components/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const blockPages: MetadataRoute.Sitemap = blockCatalog.map((item) => ({
    url: `${siteUrl}/blocks/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const skillPages: MetadataRoute.Sitemap = skillCatalog.map((item) => ({
    url: `${siteUrl}/skills/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...mainPages, ...componentPages, ...blockPages, ...skillPages]
}
