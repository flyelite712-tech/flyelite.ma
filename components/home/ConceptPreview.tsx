'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ConceptPreview() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/assets/images/offers/Embraer Phenom 300/3.png"
              alt={t('home.concept.title')}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {t('home.concept.title')}
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t('home.concept.description')}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">
                  <strong>{t('home.concept.stat1')}</strong> {t('home.concept.stat1Description')} <strong>{t('home.concept.stat1Highlight')}</strong>
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">
                  <strong>{t('home.concept.stat2')}</strong> <strong>{t('home.concept.stat2Highlight')}</strong>
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">
                  <strong>{t('home.concept.stat3')}</strong> <strong>{t('home.concept.stat3Highlight')}</strong>
                </p>
              </div>
            </div>
            <Link
              href="/notre-concept"
              className="inline-block bg-primary hover:bg-accent text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              {t('home.concept.learnMore')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
