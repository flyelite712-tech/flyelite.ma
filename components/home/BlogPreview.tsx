'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BlogCard from '@/components/blog/BlogCard'
import { blogPosts } from '@/data/blog-posts'

export default function BlogPreview() {
  const latestPosts = blogPosts.slice(0, 2)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Derniers Articles
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Découvrez nos conseils et guides pour profiter au mieux de votre expérience en aviation privée
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {latestPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary hover:bg-accent text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            <span>Voir tous les articles</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
