import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/common/WhatsAppButton'
import ScrollToTop from '@/components/common/ScrollToTop'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { generateMetadata, defaultSEO, organizationStructuredData } from '@/lib/seo'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import GoogleTagManager from '@/components/analytics/GoogleTagManager'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  ...generateMetadata(defaultSEO),
  metadataBase: new URL('https://flyelite.ma'),
  alternates: {
    canonical: 'https://flyelite.ma',
    languages: {
      'fr': 'https://flyelite.ma',
      'en': 'https://flyelite.ma',
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/iconflyelite.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon-192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body className={inter.variable}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager GTM_ID={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        
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
