import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Contact Fly Elite | Private Jet Morocco - Réservation Jet Privé',
  description: 'Contactez Fly Elite pour réserver votre jet privé au Maroc. Devis gratuit en 5 minutes. Service client 24/7 pour vos vols d\'affaires.',
  keywords: 'contact fly elite, réservation jet privé maroc, devis vol privé, contact private jet morocco, service client aviation affaires',
  canonical: 'https://flyelite.ma/contact'
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
