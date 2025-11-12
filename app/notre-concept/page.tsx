'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plane, Shield, Clock, Users, Globe, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NotreConceptPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-primary">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/concept-hero.jpg"
            alt={t('concept.title')}
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {t('concept.title')}
            </h1>
            <p className="text-xl text-white/90">
              {t('concept.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-primary mb-6">
              {t('concept.intro.title')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('concept.intro.paragraph1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('concept.intro.paragraph2')}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Globe className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              {t('concept.features.feature1Title')}
            </h3>
            <p className="text-gray-600">
              {t('concept.features.feature1Description')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Plane className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              {t('concept.features.feature2Title')}
            </h3>
            <p className="text-gray-600">
              {t('concept.features.feature2Description')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Clock className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              {t('concept.features.feature3Title')}
            </h3>
            <p className="text-gray-600">
              {t('concept.features.feature3Description')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Shield className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              {t('concept.features.feature4Title')}
            </h3>
            <p className="text-gray-600">
              {t('concept.features.feature4Description')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Users className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              {t('concept.features.feature5Title')}
            </h3>
            <p className="text-gray-600">
              {t('concept.features.feature5Description')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Star className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              {t('concept.features.feature6Title')}
            </h3>
            <p className="text-gray-600">
              {t('concept.features.feature6Description')}
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">
            {t('concept.howItWorks.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white rounded-full text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">
                {t('concept.howItWorks.step1Title')}
              </h3>
              <p className="text-gray-600">
                {t('concept.howItWorks.step1Description')}
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white rounded-full text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">
                {t('concept.howItWorks.step2Title')}
              </h3>
              <p className="text-gray-600">
                {t('concept.howItWorks.step2Description')}
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white rounded-full text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">
                {t('concept.howItWorks.step3Title')}
              </h3>
              <p className="text-gray-600">
                {t('concept.howItWorks.step3Description')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              {t('concept.cta.title')}
            </h2>
            <p className="text-xl mb-8">
              {t('concept.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/offres"
                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                {t('offers.title')}
              </Link>
              <Link
                href="/"
                className="inline-block bg-accent/20 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all transform hover:scale-105"
              >
                {t('concept.cta.button')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
