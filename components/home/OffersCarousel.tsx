'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Calendar, Plane } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import offers from '@/data/offers.json'
import airports from '@/data/airports.json'
import { formatPrice, formatDate } from '@/lib/utils'

export default function OffersCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const allOffers = offers // Show ALL offers, not just featured

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 340 // Width of one card + gap
      const newScrollLeft = direction === 'left' 
        ? containerRef.current.scrollLeft - scrollAmount
        : containerRef.current.scrollLeft + scrollAmount
      
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const getAirportCity = (code: string) => {
    const airport = airports.find(a => a.code === code)
    return airport?.city || code
  }

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
            Offres du moment
          </h2>
          <p className="text-lg text-gray-600">
            Profitez de nos vols à vide à prix réduits
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto overflow-hidden">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white hover:bg-accent text-primary hover:text-white p-3 md:p-4 rounded-full shadow-xl transition-all transform hover:scale-110"
            aria-label="Offre précédente"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white hover:bg-accent text-primary hover:text-white p-3 md:p-4 rounded-full shadow-xl transition-all transform hover:scale-110"
            aria-label="Offre suivante"
          >
            <ChevronRight size={24} />
          </button>

          {/* Offers - Horizontal Scroll */}
          <div 
            ref={containerRef}
            className="overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex gap-6 px-2">
              {allOffers.map((offer) => (
                  <Link
                    key={offer.id}
                    href={`/offres/${offer.slug}`}
                    className="group flex-shrink-0 w-[280px] md:w-[320px]"
                  >
                    <div className="bg-white rounded-xl overflow-hidden transition-all transform hover:-translate-y-2 h-full" style={{
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}>
                      {/* Date Badge */}
                      <div className="relative">
                        <div className="absolute top-4 left-4 bg-accent text-white px-4 py-2 rounded-lg font-bold text-sm z-10">
                          {new Date(offer.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                        </div>
                        
                        {/* Image */}
                        <div className="relative h-48 bg-gray-200">
                          <Image
                            src={offer.gallery[0] || '/assets/images/placeholder-jet.jpg'}
                            alt={`${getAirportCity(offer.from)} - ${getAirportCity(offer.to)}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Route */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{offer.from}</div>
                            <div className="text-xs text-gray-500">{getAirportCity(offer.from)}</div>
                          </div>
                          <div className="flex-1 flex items-center justify-center">
                            <div className="border-t-2 border-dashed border-gray-300 flex-1 mx-2"></div>
                            <Plane className="text-accent" size={20} />
                            <div className="border-t-2 border-dashed border-gray-300 flex-1 mx-2"></div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{offer.to}</div>
                            <div className="text-xs text-gray-500">{getAirportCity(offer.to)}</div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-accent" />
                            <span>{offer.schedule.depart} - {offer.schedule.arrive}</span>
                          </div>
                          <div className="flex items-center">
                            <Plane size={16} className="mr-2 text-accent" />
                            <span>{offer.aircraft}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="border-t pt-4">
                          <div className="text-3xl font-bold text-accent">
                            {formatPrice(offer.price.amount, offer.price.currency)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Pour {offer.seats} passagers max
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/offres"
            className="inline-block bg-accent hover:bg-primary text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Voir les autres vols
          </Link>
        </div>
      </div>
    </section>
  )
}
