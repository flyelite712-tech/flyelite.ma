import Hero from '@/components/home/Hero'
import OffersCarousel from '@/components/home/OffersCarousel'
import Features from '@/components/home/Features'
import Benefits from '@/components/home/Benefits'
import FAQPreview from '@/components/home/FAQPreview'
import ConceptPreview from '@/components/home/ConceptPreview'
import BlogPreview from '@/components/home/BlogPreview'
import ReviewsSection from '@/components/home/ReviewsSection'

export default function HomePage() {
  return (
    <div>
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
