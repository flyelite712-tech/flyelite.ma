import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://flyelite.ma' : 'http://localhost:3000'
  
  try {
    // Import data with error handling
    let offers: any[] = []
    let blogPosts: any[] = []
    
    try {
      offers = require('@/data/offers.json') || []
    } catch (e) {
      console.warn('Could not load offers:', e)
    }
    
    try {
      const blogData = require('@/data/blog-posts')
      blogPosts = blogData.blogPosts || []
    } catch (e) {
      console.warn('Could not load blog posts:', e)
    }

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
    const offerPages: MetadataRoute.Sitemap = offers.map(offer => {
      let lastModified = new Date()
      try {
        if (offer.date) {
          const date = new Date(offer.date)
          if (!isNaN(date.getTime())) {
            lastModified = date
          }
        }
      } catch (e) {
        // Use current date as fallback
      }
      
      return {
        url: `${baseUrl}/offres/${offer.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })

    // Dynamic blog pages
    const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => {
      let lastModified = new Date()
      try {
        if (post.publishedAt) {
          const date = new Date(post.publishedAt)
          if (!isNaN(date.getTime())) {
            lastModified = date
          }
        }
      } catch (e) {
        // Use current date as fallback
      }
      
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    })

    console.log(`Sitemap generated with ${staticPages.length + offerPages.length + blogPages.length} pages`)
    console.log(`- Static: ${staticPages.length}, Offers: ${offerPages.length}, Blog: ${blogPages.length}`)

    return [...staticPages, ...offerPages, ...blogPages]
  } catch (error) {
    console.error('Sitemap generation error:', error)
    
    // Return minimal sitemap on error
    return [
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
    ]
  }
}
