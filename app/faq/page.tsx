'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqData = [
    {
      category: "Réservation",
      questions: [
        {
          q: "Comment réserver un vol en jet privé ?",
          a: "Vous pouvez réserver en utilisant notre formulaire de recherche sur la page d'accueil. Sélectionnez vos aéroports de départ et d'arrivée, choisissez vos dates, et soumettez votre demande. Notre équipe vous contactera dans les plus brefs délais avec un devis personnalisé."
        },
        {
          q: "Quel est le délai minimum pour réserver un vol ?",
          a: "Nous pouvons organiser des vols avec un préavis de quelques heures seulement. Cependant, pour garantir la disponibilité et les meilleurs tarifs, nous recommandons de réserver au moins 24-48 heures à l'avance."
        },
        {
          q: "Puis-je modifier ou annuler ma réservation ?",
          a: "Oui, les modifications et annulations sont possibles selon les conditions de votre contrat. Les frais d'annulation varient en fonction du préavis donné. Contactez notre équipe pour plus de détails sur votre réservation spécifique."
        }
      ]
    },
    {
      category: "Tarifs et Paiement",
      questions: [
        {
          q: "Comment sont calculés les prix ?",
          a: "Les prix dépendent de plusieurs facteurs : la distance du vol, le type d'appareil, la disponibilité, les taxes aéroportuaires, et les services additionnels. Nos 'Offres du Moment' affichent des prix fixes pour des vols à vide à tarifs réduits."
        },
        {
          q: "Quels modes de paiement acceptez-vous ?",
          a: "Nous acceptons les virements bancaires, les cartes de crédit (Visa, Mastercard, American Express), et les paiements par chèque pour les clients réguliers. Un acompte est généralement requis lors de la réservation."
        },
        {
          q: "Y a-t-il des frais cachés ?",
          a: "Non, tous nos devis sont transparents et incluent tous les frais obligatoires. Les seuls coûts supplémentaires possibles sont les services optionnels que vous choisissez (restauration premium, transferts terrestres, etc.)."
        }
      ]
    },
    {
      category: "Appareils et Services",
      questions: [
        {
          q: "Quels types d'appareils proposez-vous ?",
          a: "Notre flotte comprend une gamme complète d'appareils, des jets légers (4-6 passagers) aux jets long-courriers (12-16 passagers). Chaque appareil est sélectionné selon les normes de sécurité les plus strictes et offre un confort optimal."
        },
        {
          q: "Puis-je choisir mon appareil ?",
          a: "Oui, vous pouvez exprimer vos préférences lors de votre demande. Nous vous proposerons les appareils disponibles correspondant à vos besoins en termes de capacité, autonomie et budget."
        },
        {
          q: "Quels services sont inclus à bord ?",
          a: "Tous nos vols incluent un service de base : sièges en cuir, Wi-Fi, rafraîchissements et collations. Des services premium (repas gastronomiques, champagne, équipements spéciaux) peuvent être ajoutés sur demande."
        }
      ]
    },
    {
      category: "Sécurité et Réglementation",
      questions: [
        {
          q: "Vos vols sont-ils sûrs ?",
          a: "Absolument. Tous nos opérateurs sont certifiés et respectent les normes de sécurité aérienne les plus strictes. Les appareils font l'objet de maintenances régulières et les équipages sont hautement qualifiés."
        },
        {
          q: "Quels documents sont nécessaires pour voyager ?",
          a: "Pour les vols domestiques, une pièce d'identité valide suffit. Pour les vols internationaux, un passeport en cours de validité est requis. Selon la destination, un visa peut être nécessaire. Nous vous informerons des exigences spécifiques."
        },
        {
          q: "Que se passe-t-il en cas de conditions météorologiques défavorables ?",
          a: "La sécurité est notre priorité absolue. En cas de conditions météo dangereuses, le vol peut être retardé ou reporté. Nous vous tiendrons informé en temps réel et proposerons des alternatives."
        }
      ]
    },
    {
      category: "Destinations et Itinéraires",
      questions: [
        {
          q: "Où puis-je voler ?",
          a: "Nous couvrons plus de 23 000 aéroports dans 165 pays. Que ce soit pour un vol domestique au Maroc ou un voyage intercontinental, nous pouvons organiser votre vol vers pratiquement n'importe quelle destination."
        },
        {
          q: "Proposez-vous des vols multi-destinations ?",
          a: "Oui, nous pouvons organiser des itinéraires complexes avec plusieurs escales. C'est idéal pour les tournées d'affaires ou les voyages touristiques multi-destinations."
        },
        {
          q: "Puis-je atterrir dans des petits aéroports ?",
          a: "Oui, l'un des avantages du jet privé est l'accès à des milliers d'aéroports régionaux et privés inaccessibles aux vols commerciaux, vous rapprochant ainsi de votre destination finale."
        }
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
            Questions Fréquentes
          </h1>
          <p className="text-xl text-gray-600">
            Trouvez les réponses à vos questions sur nos services de jets privés
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqData.map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                {category.category}
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
                        <span className="font-semibold text-lg pr-4">{item.q}</span>
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
                              {item.a}
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
            Vous ne trouvez pas la réponse à votre question ?
          </h2>
          <p className="text-lg mb-6">
            Notre équipe est disponible 24/7 pour répondre à toutes vos questions
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  )
}
