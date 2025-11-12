import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Notre Concept | Aviation Privée Morocco - Fly Elite',
  description: 'Découvrez le concept unique de Fly Elite : aviation d\'affaires premium au Maroc. Service personnalisé, flotte moderne, excellence garantie.',
  keywords: 'concept fly elite, aviation privée maroc, service premium jet privé, philosophie aviation affaires, excellence vol privé',
  canonical: 'https://flyelite.ma/notre-concept'
})

export default function ConceptLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
