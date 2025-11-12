import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/common/WhatsAppButton'
import ScrollToTop from '@/components/common/ScrollToTop'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Fly Elite - Réservez votre jet privé',
  description: 'Aviation d\'affaires au Maroc. Réservez votre jet privé en 5 minutes au meilleur prix. Plus de 300 aéroports disponibles.',
  keywords: 'jet privé, aviation affaires, Maroc, réservation vol, charter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.variable}>
        <LanguageProvider>
          <TopBar />
          <Header />
          <main className="min-h-screen pt-[4.5rem] md:pt-28 lg:pt-24">
            {children}
          </main>
          <Footer />
          
          {/* Floating Action Buttons */}
          <WhatsAppButton />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  )
}
