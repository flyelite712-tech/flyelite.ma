import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Blog Aviation Privée Morocco | Private Jet Blog - Fly Elite',
  description: 'Découvrez nos articles sur l\'aviation d\'affaires au Maroc. Conseils, actualités et guides pour vos vols en jet privé. Private aviation blog Morocco.',
  keywords: 'blog aviation privée maroc, private jet blog morocco, actualités jet privé, conseils aviation affaires, guide vol privé maroc',
  canonical: 'https://flyelite.ma/blog'
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
