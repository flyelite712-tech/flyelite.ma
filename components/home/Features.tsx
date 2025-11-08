'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Features() {
  const features = [
    {
      title: 'Réservez instantanément',
      description: 'Il est 12 heures, vous décidez de partir en voyage, pour des raisons personnelles, familiales, professionnelles. Imaginez décoller dans 5 heures, selon votre destination souhaitée, en réservant un jet privé en moins de 5 minutes.',
      image: '/assets/images/hero.svg',
      imagePosition: 'right' as const
    },
    {
      title: 'Partenaire des meilleurs compagnies',
      description: 'Gagner du temps est le véritable objectif de la réservation d\'un jet privé. C\'est pourquoi, Infinity Jet est partenaire des meilleures compagnies aériennes. Nos algorithmes optimisent votre vol en jet privé en cumulant un maximum de DATA.',
      image: '/assets/images/hero.svg',
      imagePosition: 'left' as const
    },
    {
      title: 'Un jet au prix de la classe business',
      description: 'Infinity Jet rend accessible le voyage en jet privé. Embarquez en quelques minutes, sans perdre de temps, au prix de la classe business, c\'est l\'enjeu de notre société.',
      image: '/assets/images/hero.svg',
      imagePosition: 'right' as const
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                feature.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: feature.imagePosition === 'right' ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative ${feature.imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Text Card */}
              <motion.div
                initial={{ opacity: 0, x: feature.imagePosition === 'right' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`${feature.imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'}`}
              >
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    {feature.title}
                  </h3>
                  <div className="w-16 h-1 bg-accent mb-6"></div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
