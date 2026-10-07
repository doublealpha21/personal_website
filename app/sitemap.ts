import type { MetadataRoute } from 'next'
import { getAllPosts, getAllWork } from '@/lib/content'
import { siteUrl } from '@/lib/site'

export const revalidate = 600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/about', '/experience', '/work', '/writing', '/contact', '/portfolio'].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }))
  const entries = [...(await getAllWork()), ...(await getAllPosts())].map((entry) => ({
    url: `${siteUrl}/${entry.type}/${entry.slug}`,
    lastModified: entry.updatedAt,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))
  return [...pages, ...entries]
}
