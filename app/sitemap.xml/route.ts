import { NextResponse } from 'next/server'
import { blogPosts } from '@/data/blog-posts'
import offers from '@/data/offers.json'

export async function GET() {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://flyelite.ma' : 'http://localhost:3000'
    
    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0
      },
      {
        url: `${baseUrl}/offres`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.9
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7
      },
      {
        url: `${baseUrl}/faq`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.6
      },
      {
        url: `${baseUrl}/notre-concept`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7
      }
    ]

    // Dynamic offer pages
    const offerPages = offers.map(offer => ({
      url: `${baseUrl}/offres/${offer.slug}`,
      lastModified: new Date(offer.date).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8
    }))

    // Dynamic blog pages
    const blogPages = blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt).toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7
    }))

    const allPages = [...staticPages, ...offerPages, ...blogPages]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${page.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${page.url}" />
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    
    // Return a minimal sitemap with just the homepage if there's an error
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://flyelite.ma' : 'http://localhost:3000'
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`

    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300'
      }
    })
  }
}
