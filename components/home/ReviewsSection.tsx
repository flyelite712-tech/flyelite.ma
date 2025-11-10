'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { reviews } from '@/data/reviews'

export default function ReviewsSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Star className="w-10 h-10 text-yellow-300 fill-yellow-300" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ce Que Disent Nos Clients
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Plus de 500 clients satisfaits nous font confiance pour leurs voyages d'affaires et de loisirs
          </p>
          
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-6"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              ))}
            </div>
            <span className="text-white font-bold text-xl ml-2">5.0</span>
            <span className="text-white/80">sur 500+ avis</span>
          </motion.div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 h-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-10 h-10 text-yellow-300 opacity-50" />
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-white/90 mb-6 leading-relaxed line-clamp-5">
                  "{review.comment}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold">{review.name}</p>
                    <p className="text-white/70 text-sm">
                      {review.role}
                      {review.company && ` • ${review.company}`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-white">
              <p className="text-2xl font-bold mb-1">Rejoignez nos clients satisfaits</p>
              <p className="text-white/80">Réservez votre vol en moins de 5 minutes</p>
            </div>
            <a
              href="/offres"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg whitespace-nowrap"
            >
              Voir Nos Offres
            </a>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Disponible 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Réponse en moins de 2h</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Paiement sécurisé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Sans frais cachés</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
