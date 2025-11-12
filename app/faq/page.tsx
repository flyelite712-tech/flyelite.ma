'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQPage() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqData = [
  {
    categoryKey: 'faqPage.categories.booking',
    questions: [
      { qKey: 'faqPage.booking.q1', aKey: 'faqPage.booking.a1' },
      { qKey: 'faqPage.booking.q2', aKey: 'faqPage.booking.a2' },
      { qKey: 'faqPage.booking.q3', aKey: 'faqPage.booking.a3' }
    ]
  },
  {
    categoryKey: 'faqPage.categories.pricing',
    questions: [
      { qKey: 'faqPage.pricing.q1', aKey: 'faqPage.pricing.a1' },
      { qKey: 'faqPage.pricing.q2', aKey: 'faqPage.pricing.a2' },
      { qKey: 'faqPage.pricing.q3', aKey: 'faqPage.pricing.a3' }
    ]
  },
  {
    categoryKey: 'faqPage.categories.aircraft',
    questions: [
      { qKey: 'faqPage.aircraft.q1', aKey: 'faqPage.aircraft.a1' },
      { qKey: 'faqPage.aircraft.q2', aKey: 'faqPage.aircraft.a2' },
      { qKey: 'faqPage.aircraft.q3', aKey: 'faqPage.aircraft.a3' }
    ]
  },
  {
    categoryKey: 'faqPage.categories.safety',
    questions: [
      { qKey: 'faqPage.safety.q1', aKey: 'faqPage.safety.a1' },
      { qKey: 'faqPage.safety.q2', aKey: 'faqPage.safety.a2' },
      { qKey: 'faqPage.safety.q3', aKey: 'faqPage.safety.a3' }
    ]
  },
  {
    categoryKey: 'faqPage.categories.destinations',
    questions: [
      { qKey: 'faqPage.destinations.q1', aKey: 'faqPage.destinations.a1' },
      { qKey: 'faqPage.destinations.q2', aKey: 'faqPage.destinations.a2' },
      { qKey: 'faqPage.destinations.q3', aKey: 'faqPage.destinations.a3' }
    ]
  }
]


  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const index = categoryIndex * 1000 + questionIndex
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            {t('faqPage.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('faqPage.subtitle')}
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqData.map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                {t(category.categoryKey)}
              </h2>

              <div className="space-y-4">
                {category.questions.map((item, qIndex) => {
                  const index = catIndex * 1000 + qIndex
                  const isOpen = openIndex === index

                  return (
                    <div key={qIndex} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <button
                        onClick={() => toggleQuestion(catIndex, qIndex)}
                        className="w-full flex items-center justify-between text-left py-4 hover:text-accent transition-colors"
                      >
                        <span className="font-semibold text-lg pr-4">{t(item.qKey)}</span>
                        <ChevronDown
                          className={`flex-shrink-0 text-accent transition-transform ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                          size={24}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 pb-4 leading-relaxed">
                              {t(item.aKey)}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {t('faqPage.cta.title')}
          </h2>
          <p className="text-lg mb-6">
            {t('faqPage.cta.description')}
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            {t('faqPage.cta.button')}
          </a>
        </div>
      </div>
    </div>
  )
}
