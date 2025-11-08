'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Diamond, Plane, Users } from 'lucide-react'

export default function Benefits() {
  const benefits = [
    {
      icon: Shield,
      title: "Normes de sécurité",
      description: "Respect des plus hauts standards de sécurité aérienne"
    },
    {
      icon: Clock,
      title: "Réservez en moins de 5 minutes",
      description: "Processus de réservation simple et rapide"
    },
    {
      icon: Diamond,
      title: "Inspiration de voyage de luxe",
      description: "Voyagez dans le confort et l'élégance"
    },
    {
      icon: Plane,
      title: "Transferts en hélicoptère disponibles",
      description: "Service de transfert premium en Europe"
    },
    {
      icon: Users,
      title: "Événements exclusifs en Europe",
      description: "Accès à des événements VIP"
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
            Pourquoi choisir <span className="text-accent">Fly Elite</span> ?
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
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
