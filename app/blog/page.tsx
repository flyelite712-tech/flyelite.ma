'use client'

import BlogHero from '@/components/blog/BlogHero'
import BlogCard from '@/components/blog/BlogCard'
import { blogPosts } from '@/data/blog-posts'
import { useLanguage } from '@/contexts/LanguageContext'

export default function BlogPage() {
  const { t } = useLanguage()
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
              <p className="text-gray-600 text-lg">{t('blogPage.noArticles')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
