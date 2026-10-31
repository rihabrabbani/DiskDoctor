import { MetadataRoute } from 'next'
import { allServices } from '@/data/allServices'
import { staticBlogPosts } from '@/data/staticBlogPosts'
import { locations } from '@/data/locations'
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb'

export const revalidate = 3600 // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.diskdoctorsamerica.com'
  const generatedAt = new Date()

  const normalizeUrl = (url: string) => {
    if (url === baseUrl || url === `${baseUrl}/`) return `${baseUrl}/`
    return url.endsWith('/') ? url.slice(0, -1) : url
  }

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: generatedAt,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: generatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: generatedAt,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: generatedAt,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: generatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: generatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: generatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: generatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Service pages
  const servicePages = allServices.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: generatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Location pages
  const locationPages = locations.map((location) => ({
    url: `${baseUrl}/${location.slug}`,
    lastModified: generatedAt,
    changeFrequency: 'monthly' as const,
    priority: location.isHeadOffice ? 0.9 : 0.8,
  }))

  // Blog pages (only published, using slugs)
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const blogsCollection = db.collection(COLLECTION_NAME)

    const blogs = await blogsCollection
      .find({ status: 'published' })
      .sort({ createdAt: -1 })
      .toArray()

    const staticSlugs = new Set(staticBlogPosts.map((b) => b.slug))
    blogPages = blogs
      .filter((blog: any) => Boolean(blog?.slug || blog?.id))
      .filter((blog: any) => !staticSlugs.has(blog.slug || blog.id))
      .map((blog: any) => {
        const parsedDate = new Date(blog.updatedAt || blog.createdAt || generatedAt)
        const safeDate = Number.isNaN(parsedDate.getTime()) ? generatedAt : parsedDate

        return {
          url: `${baseUrl}/blog/${blog.slug || blog.id}`,
          lastModified: safeDate,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }
      })
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error)
  }

  const staticBlogPages = staticBlogPosts.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const merged = [...staticPages, ...servicePages, ...locationPages, ...staticBlogPages, ...blogPages]
  const deduped = new Map<string, MetadataRoute.Sitemap[number]>()

  for (const entry of merged) {
    const normalized = normalizeUrl(entry.url)
    const existing = deduped.get(normalized)

    if (!existing) {
      deduped.set(normalized, { ...entry, url: normalized })
      continue
    }

    // Keep the latest lastModified if duplicates occur
    const existingTime = new Date(existing.lastModified || generatedAt).getTime()
    const currentTime = new Date(entry.lastModified || generatedAt).getTime()
    if (currentTime >= existingTime) {
      deduped.set(normalized, { ...entry, url: normalized })
    }
  }

  return Array.from(deduped.values())
}
