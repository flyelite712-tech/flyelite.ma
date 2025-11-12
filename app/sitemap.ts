import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blog-posts'
import offers from '@/data/offers.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://flyelite.ma' : 'http://localhost:3000'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/offres`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/notre-concept`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic offer pages
  const offerPages: MetadataRoute.Sitemap = (offers || []).map(offer => {
    const date = offer.date ? new Date(offer.date) : new Date()
    return {
      url: `${baseUrl}/offres/${offer.slug}`,
      lastModified: isNaN(date.getTime()) ? new Date() : date,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = (blogPosts || []).map(post => {
    const date = post.publishedAt ? new Date(post.publishedAt) : new Date()
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: isNaN(date.getTime()) ? new Date() : date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  return [...staticPages, ...offerPages, ...blogPages]
}
