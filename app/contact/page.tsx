'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import settings from '@/data/settings.json'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600">
            Notre équipe est à votre disposition 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Informations de contact
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Adresse</h3>
                    <p className="text-gray-600">{settings.contact.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Phone className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Téléphone</h3>
                    {settings.contact.phones.map((phone, index) => (
                      <p key={index} className="text-gray-600">
                        <a href={`tel:${phone}`} className="hover:text-accent transition-colors">
                          {phone}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Mail className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href={`mailto:${settings.contact.email}`} className="hover:text-accent transition-colors">
                        {settings.contact.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={settings.contact.mapEmbedUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Envoyez-nous un message
            </h2>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">
                  ✓ Message envoyé avec succès !
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom *
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
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone *
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

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                <span>{loading ? 'Envoi en cours...' : 'Envoyer le message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
