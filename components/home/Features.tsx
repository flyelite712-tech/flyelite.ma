'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Features() {
  const { t } = useLanguage()
  
  const features = [
    {
      titleKey: 'home.features.feature1Title',
      descriptionKey: 'home.features.feature1Description',
      image: '/assets/images/offers/Embraer Phenom 300/1.png',
      imagePosition: 'right' as const
    },
    {
      titleKey: 'home.features.feature2Title',
      descriptionKey: 'home.features.feature2Description',
      image: '/assets/images/offers/Embraer Phenom 300/2.png',
      imagePosition: 'left' as const
    },
    {
      titleKey: 'home.features.feature3Title',
      descriptionKey: 'home.features.feature3Description',
      image: '/assets/images/offers/Hawker 900XP/1.png',
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
                    alt={t(feature.titleKey)}
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
                    {t(feature.titleKey)}
                  </h3>
                  <div className="w-16 h-1 bg-accent mb-6"></div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {t(feature.descriptionKey)}
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
