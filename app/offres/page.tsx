'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Plane } from 'lucide-react'
import offers from '@/data/offers.json'
import airports from '@/data/airports.json'
import { formatPrice } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { formatAircraftName } from '@/lib/aircraft-formatter'

export default function OffresPage() {
  const { t, language } = useLanguage()
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            {t('offersPage.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('offersPage.subtitle')}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              href={`/offres/${offer.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                {/* Date Badge */}
                <div className="relative">
                  <div className="absolute top-4 left-4 bg-accent text-white px-4 py-2 rounded-lg font-bold text-sm z-10">
                    {offer.date === "N'importe quand" ? t('offersPage.anytime') : new Date(offer.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { day: '2-digit', month: 'short' })}
                  </div>
                  
                  {/* Medical Badge */}
                  {offer.isMedical && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-xs z-10 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {t('offersPage.medicalBadge')}
                    </div>
                  )}
                  
                  {/* Image */}
                  <div className="relative h-56 bg-gray-200">
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
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">{getRouteDisplay(offer.from, true)}</div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {offer.from === 'Worldwide' || offer.from === 'WW' || offer.from === 'from any where' ? t('offersPage.from') : getAirportCity(offer.from)}
                      </div>
                    </div>
                    <div className="flex items-center justify-center px-2 sm:px-4">
                      <div className="border-t-2 border-dashed border-gray-300 w-4 sm:w-8"></div>
                      <Plane className="text-accent mx-1 sm:mx-2" size={20} />
                      <div className="border-t-2 border-dashed border-gray-300 w-4 sm:w-8"></div>
                    </div>
                    <div className="text-center flex-1 min-w-0">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">{getRouteDisplay(offer.to, false)}</div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {offer.to === 'Worldwide' || offer.to === 'WW' || offer.to === 'to any where' ? t('offersPage.to') : getAirportCity(offer.to)}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2 text-accent" />
                      <span>{offer.schedule.depart} - {offer.schedule.arrive}</span>
                    </div>
                    <div className="flex items-center">
                      <Plane size={18} className="mr-2 text-accent" />
                      <span>{formatAircraftName(offer.aircraft)}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="border-t pt-4">
                    <div className="text-3xl font-bold text-accent">
                      {offer.price.amount === 0 ? t('offersPage.onRequest') : formatPrice(offer.price.amount, offer.price.currency)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {offer.price.amount === 0 ? t('offersPage.customQuote') : t('offersPage.forMaxPassengers').replace('{count}', offer.seats.toString())}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
