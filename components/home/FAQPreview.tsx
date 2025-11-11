'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Puis-je partir à la dernière minute ?',
      answer: 'Oui, vous pouvez partir à la dernière minute. L\'équipe de Fly Elite vous certifie que votre avion décollera après 72 H de votre demande (après l\'approbation de toutes les autorités compétentes).'
    },
    {
      question: 'Puis-je réserver mon vol par téléphone ?',
      answer: 'Non, il est impossible de réserver son vol par téléphone. Toutes les réservations se font en ligne via notre plateforme sécurisée.'
    },
    {
      question: 'Quels sont les avantages d\'un jet privé ?',
      answer: 'Le jet privé vous offre flexibilité, gain de temps, confort optimal et confidentialité. Vous évitez les files d\'attente et voyagez selon votre propre emploi du temps.'
    },
    {
      question: 'Combien de passagers peuvent voyager ?',
      answer: 'La capacité varie selon le type d\'avion. Nos jets peuvent accueillir de 4 à 14 passagers selon le modèle choisi.'
    },
    {
      question: 'Puis-je modifier ma réservation ?',
      answer: 'Oui, vous pouvez modifier votre réservation sous certaines conditions. Contactez notre équipe pour connaître les modalités de modification.'
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
            Questions Fréquentes
          </h2>
          <p className="text-gray-600 text-lg">
            Dites-nous vos exigences et un de nos experts vous enverra un devis
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
                    <span className="font-medium">{faq.question}</span>
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
                            <p className="text-sm leading-relaxed">{faq.answer}</p>
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
