import Image from 'next/image'
import Link from 'next/link'
import { Plane, Shield, Clock, Users, Globe, Star } from 'lucide-react'

export const metadata = {
  title: 'Notre Concept - Fly Elite',
  description: 'Découvrez notre vision de l\'aviation d\'affaires',
}

export default function NotreConceptPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-primary">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/concept-hero.jpg"
            alt="Notre Concept"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Notre Concept
            </h1>
            <p className="text-xl text-white/90">
              L'excellence au service de votre voyage
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
              Réservez instantanément votre jet privé
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Il est 12 heures, vous décidez de partir en voyage, pour des raisons personnelles,
              familiales, professionnelles. Imaginez décoller dans quelques heures, vers la
              destination souhaitée, en réservant un jet privé en moins de 5 minutes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Chez <strong className="text-accent">Fly Elite</strong>, nous rendons l'aviation d'affaires
              accessible, simple et transparente. Notre plateforme vous permet de comparer, réserver
              et voler en toute sérénité.
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
              Couverture Mondiale
            </h3>
            <p className="text-gray-600">
              Plus de <strong>23 000 aéroports</strong> dans <strong>165 pays</strong>.
              Où que vous alliez, nous vous y emmenons.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Plane className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              Flotte Complète
            </h3>
            <p className="text-gray-600">
              Du jet léger au long-courrier, nous avons l'appareil parfait
              pour chaque mission.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Clock className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              Réservation Rapide
            </h3>
            <p className="text-gray-600">
              Réservez en moins de 5 minutes. Décollage possible quelques heures
              après votre demande.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Shield className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              Sécurité Maximale
            </h3>
            <p className="text-gray-600">
              Tous nos opérateurs sont certifiés et respectent les normes
              de sécurité les plus strictes.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Users className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              Service Personnalisé
            </h3>
            <p className="text-gray-600">
              Une équipe dédiée disponible 24/7 pour répondre à tous vos besoins
              et exigences.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Star className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              Excellence & Confort
            </h3>
            <p className="text-gray-600">
              Voyagez dans le luxe et le confort avec nos appareils haut de gamme
              et services premium.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">
            Comment ça marche ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white rounded-full text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">
                Recherchez
              </h3>
              <p className="text-gray-600">
                Utilisez notre formulaire pour indiquer votre itinéraire,
                vos dates et le nombre de passagers.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white rounded-full text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">
                Recevez votre devis
              </h3>
              <p className="text-gray-600">
                Notre équipe vous contacte rapidement avec un devis personnalisé
                et transparent.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white rounded-full text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">
                Envolez-vous
              </h3>
              <p className="text-gray-600">
                Confirmez votre réservation et préparez-vous à vivre une
                expérience de vol exceptionnelle.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Prêt à décoller ?
            </h2>
            <p className="text-xl mb-8">
              Découvrez nos offres du moment ou demandez un devis personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/offres"
                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Voir les offres
              </Link>
              <Link
                href="/"
                className="inline-block bg-accent/20 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all transform hover:scale-105"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
