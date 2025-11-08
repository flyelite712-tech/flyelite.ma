import Hero from '@/components/home/Hero'
import OffersCarousel from '@/components/home/OffersCarousel'
import Features from '@/components/home/Features'
import Benefits from '@/components/home/Benefits'
import FAQPreview from '@/components/home/FAQPreview'
import ConceptPreview from '@/components/home/ConceptPreview'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <OffersCarousel />
      <Features />
      <Benefits />
      <FAQPreview />
      <ConceptPreview />
    </div>
  )
}
