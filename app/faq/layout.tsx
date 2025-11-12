import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'FAQ Jet Privé Morocco | Questions Fréquentes - Fly Elite',
  description: 'Toutes vos questions sur les vols en jet privé au Maroc. Tarifs, réservations, aéroports disponibles. FAQ private jet Morocco.',
  keywords: 'faq jet privé maroc, questions jet privé, private jet faq morocco, tarifs aviation affaires, réservation vol privé',
  canonical: 'https://flyelite.ma/faq'
})

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
