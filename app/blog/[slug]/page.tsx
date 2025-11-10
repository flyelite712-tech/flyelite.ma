import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react'
import { blogPosts } from '@/data/blog-posts'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Article non trouvé - FlyElite',
    }
  }

  return {
    title: `${post.title} - Blog FlyElite`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary to-accent py-12">
        <div className="container mx-auto px-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au blog</span>
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} de lecture</span>
              </div>
             
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Author Info */}
           

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-primary prose-headings:font-bold
                prose-h1:text-4xl prose-h1:mb-6
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-primary prose-strong:font-bold
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                prose-li:text-gray-700 prose-li:mb-2
                prose-img:rounded-xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 font-semibold">Partager cet article :</p>
                <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full font-semibold transition-all">
                  <Share2 className="w-5 h-5" />
                  <span>Partager</span>
                </button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-primary mb-8">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-accent text-sm font-semibold">{relatedPost.category}</span>
                      <h3 className="text-xl font-bold text-primary mt-2 mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-primary to-accent rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à Réserver Votre Vol Privé ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Découvrez nos offres exclusives et réservez en moins de 5 minutes
            </p>
            <Link
              href="/offres"
              className="inline-block bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              Voir Nos Offres
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
