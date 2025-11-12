import { Metadata } from 'next'
import { blogPosts } from '@/data/blog-posts'
import { generateMetadata as createMetadata, generateArticleStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo'

interface Props {
  params: { slug: string }
  children: React.ReactNode
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    return createMetadata({
      title: 'Article Non Trouvé - Blog Fly Elite',
      description: 'Cet article de blog n\'existe pas ou a été supprimé.',
      noIndex: true
    })
  }

  return createMetadata({
    title: `${post.title.fr} | Blog Fly Elite - Private Jet Morocco`,
    description: post.excerpt.fr,
    keywords: `${post.tags.fr.join(', ')}, blog aviation privée maroc, private jet morocco blog`,
    canonical: `https://flyelite.ma/blog/${post.slug}`,
    ogImage: post.image
  })
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostLayout({ children, params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  const breadcrumbItems = [
    { name: 'Accueil', url: 'https://flyelite.ma' },
    { name: 'Blog', url: 'https://flyelite.ma/blog' },
    { name: post?.title.fr || 'Article', url: `https://flyelite.ma/blog/${params.slug}` }
  ]
  
  return (
    <>
      {post && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateArticleStructuredData(post)),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateBreadcrumbStructuredData(breadcrumbItems)),
            }}
          />
        </>
      )}
      {children}
    </>
  )
}
