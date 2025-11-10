import { Metadata } from 'next'
import BlogHero from '@/components/blog/BlogHero'
import BlogCard from '@/components/blog/BlogCard'
import { blogPosts } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Blog - FlyElite | Conseils et Guides Aviation Privée',
  description: 'Découvrez nos articles sur l\'aviation privée, nos guides de réservation, FAQ et conseils pour voyager en jet privé au Maroc.',
  keywords: 'blog aviation, jet privé conseils, guide réservation, FAQ aviation privée',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <BlogHero />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
          
          {blogPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Aucun article disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
