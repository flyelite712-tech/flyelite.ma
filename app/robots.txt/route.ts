import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Allow important pages
Allow: /offres
Allow: /blog
Allow: /contact
Allow: /faq
Allow: /notre-concept

# Sitemap
Sitemap: https://flyelite.ma/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  })
}
