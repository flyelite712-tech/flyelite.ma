import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Offres Jet Privé Morocco | Private Jet Deals Morocco - Fly Elite',
  description: 'Découvrez nos meilleures offres de jets privés au Maroc. Vols charter disponibles immédiatement aux meilleurs prix. Private jet offers Morocco.',
  keywords: 'offres jet privé maroc, private jet offers morocco, vol charter maroc, deals jet privé, promotion aviation affaires maroc',
  canonical: 'https://flyelite.ma/offres'
})

export default function OffresLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
