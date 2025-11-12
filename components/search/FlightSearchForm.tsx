'use client'

import { useState } from 'react'
import { Search, ArrowLeft } from 'lucide-react'
import AirportSelect from './AirportSelect'
import { useLanguage } from '@/contexts/LanguageContext'

interface FlightSearchFormProps {
  tripType: 'round_trip' | 'one_way'
}

export default function FlightSearchForm({ tripType }: FlightSearchFormProps) {
  const { t } = useLanguage()
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departDate: '',
    departTime: '08:30',
    returnDate: '',
    returnTime: '18:30',
    pax: 1,
  })

  const [quoteData, setQuoteData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    consent: false,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setShowQuoteForm(true)
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: tripType,
          from: searchData.from,
          to: searchData.to,
          pax: searchData.pax,
          depart: {
            date: searchData.departDate,
            time: searchData.departTime,
          },
          return: tripType === 'round_trip' ? {
            date: searchData.returnDate,
            time: searchData.returnTime,
          } : undefined,
          contact: {
            firstName: quoteData.firstName,
            lastName: quoteData.lastName,
            email: quoteData.email,
            phone: quoteData.phone,
          },
          notes: quoteData.notes,
          consent: quoteData.consent,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          setShowQuoteForm(false)
          setSuccess(false)
          // Reset forms
          setQuoteData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            notes: '',
            consent: false,
          })
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
    <>
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Départ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('search.from')} *
            </label>
            <AirportSelect
              value={searchData.from}
              onChange={(value) => setSearchData({ ...searchData, from: value })}
              placeholder="Aalborg (AAL)"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('search.to')} *
            </label>
            <AirportSelect
              value={searchData.to}
              onChange={(value) => setSearchData({ ...searchData, to: value })}
              placeholder="Aalborg (AAL)"
            />
          </div>

          {/* Passagers */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('search.passengers')} *
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={searchData.pax}
              onChange={(e) => setSearchData({ ...searchData, pax: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>

          {/* Date/Heure Aller */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('search.departure')} *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={searchData.departDate}
                onChange={(e) => setSearchData({ ...searchData, departDate: e.target.value })}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                required
              />
              <input
                type="time"
                value={searchData.departTime}
                onChange={(e) => setSearchData({ ...searchData, departTime: e.target.value })}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                required
              />
            </div>
          </div>

          {/* Date/Heure Retour (si aller-retour) */}
          {tripType === 'round_trip' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('search.return')} *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={searchData.returnDate}
                  onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                  className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  required={tripType === 'round_trip'}
                />
                <input
                  type="time"
                  value={searchData.returnTime}
                  onChange={(e) => setSearchData({ ...searchData, returnTime: e.target.value })}
                  className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                  required={tripType === 'round_trip'}
                />
              </div>
            </div>
          )}
        </div>

        {/* Search Button - Only show if quote form is not displayed */}
        {!showQuoteForm && (
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-accent hover:bg-primary text-white px-12 py-4 rounded-full font-bold text-lg flex items-center space-x-3 transition-all transform hover:scale-105 shadow-lg"
            >
              <Search size={24} />
              <span>{t('search.search')}</span>
            </button>
          </div>
        )}
      </form>

      {/* Quote Form - Inline (not modal) */}
      {showQuoteForm && (
        <div className="mt-8 border-t-2 border-gray-200 pt-6">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t('search.quoteTitle')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('search.quoteDescription')}
            </p>
          </div>

          {success ? (
            <div className="py-12 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                {t('search.successTitle')}
              </h3>
              <p className="text-gray-600">
                {t('search.successMessage')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Prénom */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('search.firstName')} *
                  </label>
                  <input
                    type="text"
                    value={quoteData.firstName}
                    onChange={(e) => setQuoteData({ ...quoteData, firstName: e.target.value })}
                    placeholder={t('search.firstName')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('search.lastName')} *
                  </label>
                  <input
                    type="text"
                    value={quoteData.lastName}
                    onChange={(e) => setQuoteData({ ...quoteData, lastName: e.target.value })}
                    placeholder={t('search.lastName')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('search.email')} *
                  </label>
                  <input
                    type="email"
                    value={quoteData.email}
                    onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                    placeholder={t('search.email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('search.phone')} *
                  </label>
                  <input
                    type="tel"
                    value={quoteData.phone}
                    onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                    placeholder={t('search.phone')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('search.notes')}
                </label>
                <textarea
                  value={quoteData.notes}
                  onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                  placeholder={t('search.notesPlaceholder')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                />
              </div>

              {/* Consent */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={quoteData.consent}
                  onChange={(e) => setQuoteData({ ...quoteData, consent: e.target.checked })}
                  className="mt-1 w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
                  required
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  {t('search.consent')}
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowQuoteForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowLeft size={20} />
                  <span>{t('search.back')}</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t('search.sending') : t('search.send')}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  )
}
