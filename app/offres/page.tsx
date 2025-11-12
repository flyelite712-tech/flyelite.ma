'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Plane } from 'lucide-react'
import offers from '@/data/offers.json'
import airports from '@/data/airports.json'
import { formatPrice } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'

export default function OffresPage() {
  const { t, language } = useLanguage()
  const getAirportCity = (code: string) => {
    const airport = airports.find(a => a.code === code)
    return airport?.city || code
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
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{offer.from}</div>
                      <div className="text-sm text-gray-500">
                        {offer.from === 'Worldwide' ? t('offersPage.from') : getAirportCity(offer.from)}
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="border-t-2 border-dashed border-gray-300 flex-1 mx-2"></div>
                      <Plane className="text-accent" size={24} />
                      <div className="border-t-2 border-dashed border-gray-300 flex-1 mx-2"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{offer.to}</div>
                      <div className="text-sm text-gray-500">
                        {offer.to === 'Worldwide' ? t('offersPage.to') : getAirportCity(offer.to)}
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
                      <span>{offer.aircraft}</span>
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
