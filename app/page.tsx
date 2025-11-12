import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import OffersCarousel from '@/components/home/OffersCarousel'
import Features from '@/components/home/Features'
import Benefits from '@/components/home/Benefits'
import FAQPreview from '@/components/home/FAQPreview'
import ConceptPreview from '@/components/home/ConceptPreview'
import BlogPreview from '@/components/home/BlogPreview'
import ReviewsSection from '@/components/home/ReviewsSection'
import { generateMetadata, localBusinessStructuredData } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Fly Elite - Private Jet Morocco | Jet Privé Maroc #1',
  description: 'Aviation d\'affaires au Maroc. Réservez votre jet privé en 5 minutes au meilleur prix. Plus de 300 aéroports disponibles. Private jet Morocco leader.',
  keywords: 'jet privé maroc, private jet morocco, aviation affaires maroc, charter flight morocco, vol privé maroc, business aviation morocco, jet charter maroc',
  canonical: 'https://flyelite.ma'
})

export default function HomePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessStructuredData),
        }}
      />
      <Hero />
      <OffersCarousel />
      <Features />
      <Benefits />
      <BlogPreview />
      <FAQPreview />
      <ConceptPreview />
      <ReviewsSection />
    </div>
  )
}
