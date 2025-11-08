import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Plane } from 'lucide-react'
import offers from '@/data/offers.json'
import airports from '@/data/airports.json'
import { formatPrice } from '@/lib/utils'

export const metadata = {
  title: 'Offres du Moment - Fly Elite',
  description: 'Découvrez nos offres de vols en jet privé à prix réduits',
}

export default function OffresPage() {
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
            Offres du moment
          </h1>
          <p className="text-xl text-gray-600">
            Profitez de nos vols à vide à prix exceptionnels
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
                    {new Date(offer.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                  </div>
                  
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
                      <div className="text-sm text-gray-500">{getAirportCity(offer.from)}</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="border-t-2 border-dashed border-gray-300 flex-1 mx-2"></div>
                      <Plane className="text-accent" size={24} />
                      <div className="border-t-2 border-dashed border-gray-300 flex-1 mx-2"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{offer.to}</div>
                      <div className="text-sm text-gray-500">{getAirportCity(offer.to)}</div>
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
                      {formatPrice(offer.price.amount, offer.price.currency)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
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
  )
}
