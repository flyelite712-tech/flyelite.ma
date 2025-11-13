'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Calendar, Plane } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import offers from '@/data/offers.json'
import airports from '@/data/airports.json'
import { formatPrice, formatDate } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { formatAircraftName } from '@/lib/aircraft-formatter'

export default function OffersCarousel() {
  const { t, language } = useLanguage()
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

  const getRouteDisplay = (code: string, isFrom: boolean = true) => {
    if (code === 'Worldwide' || code === 'WW' || code === 'from any where' || code === 'to any where') {
      return isFrom ? t('offersPage.from') : t('offersPage.to')
    }
    return code
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
            {t('home.offersCarousel.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('home.offersCarousel.subtitle')}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto overflow-hidden">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white hover:bg-accent text-primary hover:text-white p-3 md:p-4 rounded-full shadow-xl transition-all transform hover:scale-110"
            aria-label={t('home.offersCarousel.previous')}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white hover:bg-accent text-primary hover:text-white p-3 md:p-4 rounded-full shadow-xl transition-all transform hover:scale-110"
            aria-label={t('home.offersCarousel.next')}
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
                          {offer.date === "N'importe quand" ? t('offersPage.anytime') : new Date(offer.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { day: '2-digit', month: 'short' })}
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
                          <div className="text-center flex-1 min-w-0">
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">{getRouteDisplay(offer.from, true)}</div>
                            <div className="text-xs text-gray-500">{getAirportCity(offer.from)}</div>
                          </div>
                          <div className="flex items-center justify-center px-2">
                            <div className="border-t-2 border-dashed border-gray-300 w-4"></div>
                            <Plane className="text-accent mx-1" size={16} />
                            <div className="border-t-2 border-dashed border-gray-300 w-4"></div>
                          </div>
                          <div className="text-center flex-1 min-w-0">
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">{getRouteDisplay(offer.to, false)}</div>
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
                            <span>{formatAircraftName(offer.aircraft)}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="border-t pt-4">
                          <div className="text-3xl font-bold text-accent">
                            {offer.price.amount === 0 ? t('offersPage.onRequest') : formatPrice(offer.price.amount, offer.price.currency)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {offer.price.amount === 0 ? t('offersPage.customQuote') : t('home.offersCarousel.forMaxPassengers').replace('{count}', offer.seats.toString())}
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
            {t('home.offersCarousel.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
