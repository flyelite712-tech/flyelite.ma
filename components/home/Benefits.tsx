'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Diamond, Plane, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Benefits() {
  const { t } = useLanguage()
  
  const benefits = [
    {
      icon: Shield,
      titleKey: 'home.benefits.benefit1Title',
      descriptionKey: 'home.benefits.benefit1Description'
    },
    {
      icon: Clock,
      titleKey: 'home.benefits.benefit2Title',
      descriptionKey: 'home.benefits.benefit2Description'
    },
    {
      icon: Diamond,
      titleKey: 'home.benefits.benefit3Title',
      descriptionKey: 'home.benefits.benefit3Description'
    },
    {
      icon: Plane,
      titleKey: 'home.benefits.benefit4Title',
      descriptionKey: 'home.benefits.benefit4Description'
    },
    {
      icon: Users,
      titleKey: 'home.benefits.benefit5Title',
      descriptionKey: 'home.benefits.benefit5Description'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('home.benefits.title')} <span className="text-accent">{t('home.benefits.titleHighlight')}</span> ?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Icon className="text-accent group-hover:text-white transition-colors" size={32} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t(benefit.descriptionKey)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
