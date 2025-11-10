'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SearchTabs from '../search/SearchTabs'

export default function Hero() {
  return (
    <section className="relative min-h-[50vh] md:min-h-[70vh] lg:min-h-[90vh] flex items-center bg-gradient-to-br from-primary via-primary to-[#1a5a8a]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero.svg"
          alt="Fly Elite - Aviation d'Affaires"
          fill
          className="object-cover object-right opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Left Side - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 leading-tight">
                Réservez votre  <span className="text-accent">jet privé</span> en seulement 5 min !
              </h1>
              <p className="text-lg md:text-2xl lg:text-3xl mb-3 md:mb-6 font-semibold">
               Profitez du meilleur prix et<span className="text-accent"> d’un service d’exception.</span>
              </p>
              <p className="text-sm md:text-lg lg:text-xl mb-2 md:mb-4 font-medium">
                Aviation d'Affaires Maroc
              </p>
              <p className="text-xs md:text-base lg:text-lg italic text-gray-200">
                " Le ciel à portée de vos doigts "
              </p>
            </motion.div>

            {/* Right Side - Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-end"
            >
              {/* <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-sm transform hover:scale-105 transition-transform">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                      JM
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg mb-1">
                      Jean-Marie CARDIN
                    </p>
                    <p className="text-sm text-gray-700 italic mb-2">
                      Voyage avec un <span className="font-semibold">Embraer Phenom 100</span>
                    </p>
                    <p className="text-sm text-accent font-semibold">
                      Efficacité et rapidité !
                    </p>
                  </div>
                </div>
              </div> */}
            </motion.div>
          </div>

          {/* Search Form - Positioned at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 md:mt-12 lg:mt-16"
          >
            <SearchTabs />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
