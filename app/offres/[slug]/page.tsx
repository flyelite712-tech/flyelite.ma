'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Plane, Users, Clock, ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import offers from '@/data/offers.json'
import airports from '@/data/airports.json'
import { formatPrice, formatDate } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'

export default function OfferDetailPage() {
  const { t, language } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passengers: 1,
    notes: '',
    consent: false,
  })

  // Find the offer by slug
  const offer = offers.find(o => o.slug === params.slug)

  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">{t('offerDetail.notFound')}</h1>
          <Link href="/offres" className="text-accent hover:underline">
            {t('offerDetail.backToOffers')}
          </Link>
        </div>
      </div>
    )
  }

  const getAirport = (code: string) => {
    return airports.find(a => a.code === code)
  }

  const fromAirport = getAirport(offer.from)
  const toAirport = getAirport(offer.to)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % offer.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + offer.gallery.length) % offer.gallery.length)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId: offer.id,
          type: 'one_way',
          from: offer.from,
          to: offer.to,
          depart: {
            date: offer.date,
            time: offer.schedule.depart,
          },
          schedule: offer.schedule,
          aircraft: offer.aircraft,
          price: offer.price,
          seats: offer.seats,
          flightTimeMin: offer.flightTimeMin,
          pax: formData.passengers,
          contact: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
          notes: formData.notes,
          consent: formData.consent,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/offres')
        }, 3000)
      }
    } catch (error) {
      console.error('Error:', error)
      alert(t('common.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/offres"
          className="inline-flex items-center text-primary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          {t('offerDetail.backToOffers')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg mb-4">
              <div className="relative h-96">
                <Image
                  src={offer.gallery[currentImageIndex] || '/assets/images/placeholder-jet.jpg'}
                  alt={`${fromAirport?.city} - ${toAirport?.city}`}
                  fill
                  className="object-cover"
                />
                
                {/* Navigation Arrows */}
                {offer.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                    >
                      <ArrowLeft size={24} className="text-primary" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                    >
                      <ArrowRight size={24} className="text-primary" />
                    </button>
                  </>
                )}

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-accent text-white px-4 py-2 rounded-lg font-bold">
                  {offer.date === "N'importe quand" ? t('offersPage.anytime') : formatDate(offer.date)}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {offer.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {offer.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-20 rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'ring-4 ring-accent' : 'opacity-60 hover:opacity-100'
                    } transition-all`}
                  >
                    <Image
                      src={img}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Route */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{offer.from}</div>
                  {fromAirport && (
                    <>
                      <div className="text-sm text-gray-600">{fromAirport.city}</div>
                      <div className="text-xs text-gray-500">{fromAirport.name}</div>
                    </>
                  )}
                  {!fromAirport && offer.from === 'Worldwide' && (
                    <div className="text-sm text-gray-600">{t('offerDetail.departureFrom')}</div>
                  )}
                </div>
                <div className="flex-1 flex items-center justify-center px-4">
                  <div className="border-t-2 border-dashed border-gray-300 flex-1"></div>
                  <Plane className="text-accent mx-4" size={32} />
                  <div className="border-t-2 border-dashed border-gray-300 flex-1"></div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{offer.to}</div>
                  {toAirport && (
                    <>
                      <div className="text-sm text-gray-600">{toAirport.city}</div>
                      <div className="text-xs text-gray-500">{toAirport.name}</div>
                    </>
                  )}
                  {!toAirport && offer.to === 'Worldwide' && (
                    <div className="text-sm text-gray-600">{t('offerDetail.arrivalTo')}</div>
                  )}
                </div>
              </div>

              {/* Flight Details */}
              <div className="space-y-4 mb-8 pb-8 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-700">
                    <Calendar size={20} className="mr-3 text-accent" />
                    <span className="font-semibold">{t('offerDetail.departureDate')}</span>
                  </div>
                  <span className="text-gray-900 font-bold">
                    {offer.date === "N'importe quand" ? t('offersPage.anytime') : formatDate(offer.date)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-700">
                    <Clock size={20} className="mr-3 text-accent" />
                    <span className="font-semibold">{t('offerDetail.schedule')}</span>
                  </div>
                  <span className="text-gray-900 font-bold">
                    {offer.schedule.depart} - {offer.schedule.arrive}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-700">
                    <Plane size={20} className="mr-3 text-accent" />
                    <span className="font-semibold">{t('offerDetail.aircraft')}</span>
                  </div>
                  <span className="text-gray-900 font-bold">{offer.aircraft}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-700">
                    <Users size={20} className="mr-3 text-accent" />
                    <span className="font-semibold">{t('offerDetail.capacity')}</span>
                  </div>
                  <span className="text-gray-900 font-bold">{t('offerDetail.passengersMax').replace('{count}', offer.seats.toString())}</span>
                </div>

                {offer.flightTimeMin > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-700">
                      <Clock size={20} className="mr-3 text-accent" />
                      <span className="font-semibold">{t('offerDetail.flightDuration')}</span>
                    </div>
                    <span className="text-gray-900 font-bold">
                      {Math.floor(offer.flightTimeMin / 60)}h {offer.flightTimeMin % 60}min
                    </span>
                  </div>
                )}
              </div>

              {/* Medical Flight Details */}
              {offer.isMedical && offer.medicalDetails && (
                <div className="mb-8 pb-8 border-b">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {offer.medicalDetails.type}
                  </h3>
                  <p className="text-gray-700 mb-4">{offer.medicalDetails.description}</p>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-primary mb-2">{t('offerDetail.medicalEquipment')}</h4>
                    <ul className="space-y-1">
                      {offer.medicalDetails.equipment.slice(0, 4).map((item, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <Check size={16} className="text-accent mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-bold text-primary mb-2">{t('offerDetail.includedServices')}</h4>
                    <ul className="space-y-1">
                      {offer.medicalDetails.services.slice(0, 4).map((item, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <Check size={16} className="text-accent mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mb-8">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">{t('offerDetail.totalPrice')}</div>
                  <div className="text-5xl font-bold text-accent mb-2">
                    {offer.price.amount === 0 ? t('offersPage.onRequest') : formatPrice(offer.price.amount, offer.price.currency)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {offer.price.amount === 0 
                      ? t('offerDetail.contactForQuote') 
                      : t('offerDetail.forMaxPassengers').replace('{count}', offer.seats.toString())
                    }
                  </div>
                </div>
              </div>

              {/* Booking Button */}
              {!showBookingForm && !success && (
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full bg-accent hover:bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  {t('offerDetail.bookThisFlight')}
                </button>
              )}

              {/* Booking Form */}
              {showBookingForm && !success && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t pt-8 mt-8"
                >
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    {t('offerDetail.bookingForm')}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('offerDetail.firstName')} {t('offerDetail.required')}
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('offerDetail.lastName')} {t('offerDetail.required')}
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('offerDetail.email')} {t('offerDetail.required')}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('offerDetail.phone')} {t('offerDetail.required')}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('offerDetail.passengers')} {t('offerDetail.required')}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={offer.seats}
                        value={formData.passengers}
                        onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('offerDetail.notes')}
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1 w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
                        required
                      />
                      <label htmlFor="consent" className="text-sm text-gray-700">
                        {t('offerDetail.consent')}
                      </label>
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowBookingForm(false)}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        {t('offerDetail.cancel')}
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? t('offerDetail.sending') : t('offerDetail.confirmBooking')}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                    <Check size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">
                    {t('offerDetail.bookingConfirmed')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('offerDetail.confirmationSent')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('offerDetail.redirecting')}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
