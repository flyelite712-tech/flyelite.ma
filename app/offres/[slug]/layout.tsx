import { Metadata } from 'next'
import offers from '@/data/offers.json'
import airports from '@/data/airports.json'
import { generateMetadata as createMetadata, generateProductStructuredData } from '@/lib/seo'

interface Props {
  params: { slug: string }
  children: React.ReactNode
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const offer = offers.find(o => o.slug === params.slug)
  
  if (!offer) {
    return createMetadata({
      title: 'Offre Non Trouvée - Fly Elite',
      description: 'Cette offre de jet privé n\'est plus disponible.',
      noIndex: true
    })
  }

  const fromAirport = airports.find(a => a.code === offer.from)
  const toAirport = airports.find(a => a.code === offer.to)
  const fromCity = fromAirport?.city || offer.from
  const toCity = toAirport?.city || offer.to

  return createMetadata({
    title: `Jet Privé ${fromCity} - ${toCity} | ${offer.aircraft} - Fly Elite`,
    description: `Vol privé ${fromCity} vers ${toCity} avec ${offer.aircraft}. ${offer.seats} places disponibles. Réservez votre jet privé au Maroc dès ${offer.price.amount}€.`,
    keywords: `jet privé ${fromCity} ${toCity}, private jet ${fromCity} ${toCity}, vol charter ${fromCity}, ${offer.aircraft} charter, aviation affaires maroc`,
    canonical: `https://flyelite.ma/offres/${offer.slug}`,
    ogImage: offer.gallery?.[0] || '/og-image.png'
  })
}

export async function generateStaticParams() {
  return offers.map((offer) => ({
    slug: offer.slug,
  }))
}

export default function OfferLayout({ children, params }: Props) {
  const offer = offers.find(o => o.slug === params.slug)
  
  return (
    <>
      {offer && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateProductStructuredData(offer)),
          }}
        />
      )}
      {children}
    </>
  )
}
