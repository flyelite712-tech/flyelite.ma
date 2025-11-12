'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User } from 'lucide-react'
import { BlogPost } from '@/types/blog'
import { useLanguage } from '@/contexts/LanguageContext'

interface BlogCardProps {
  post: BlogPost
  index: number
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const { t, language } = useLanguage()
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title[language]}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
              {post.category[language]}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime[language]}</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
            {post.title[language]}
          </h2>
          
          <p className="text-gray-700 mb-4 line-clamp-3">
            {post.excerpt[language]}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">         
            <span className="text-accent font-semibold group-hover:translate-x-2 transition-transform inline-block">
              {t('blogPage.readMore')} →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
