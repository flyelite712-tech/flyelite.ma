'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQPreview() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      questionKey: 'home.faq.question1',
      answerKey: 'home.faq.answer1'
    },
    {
      questionKey: 'home.faq.question2',
      answerKey: 'home.faq.answer2'
    },
    {
      questionKey: 'home.faq.question3',
      answerKey: 'home.faq.answer3'
    },
    {
      questionKey: 'home.faq.question4',
      answerKey: 'home.faq.answer4'
    },
    {
      questionKey: 'home.faq.question5',
      answerKey: 'home.faq.answer5'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('home.faq.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('home.faq.subtitle')}
          </p>
        </motion.div>

        {/* FAQ List - Full Width */}
        <div className="max-w-4xl mx-auto">
          <div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Question */}
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full bg-primary text-white px-6 py-4 rounded-lg flex items-center justify-between hover:bg-primary/90 transition-colors text-left group"
                  >
                    <span className="font-medium">{t(faq.questionKey)}</span>
                    <ChevronDown
                      size={20}
                      className={`transform transition-transform flex-shrink-0 ml-4 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 ml-8">
                          <div className="bg-[#C9A961] text-white px-6 py-4 rounded-lg relative">
                            <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-[#C9A961] border-b-8 border-b-transparent"></div>
                            <p className="text-sm leading-relaxed">{t(faq.answerKey)}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
