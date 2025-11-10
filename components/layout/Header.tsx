'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import settings from '@/data/settings.json'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isTopBarVisible, setIsTopBarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Sync with TopBar visibility
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsTopBarVisible(false)
      } else {
        setIsTopBarVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navigation = [
    { name: 'Offres Du Moment', href: '/offres' },
    { name: 'Notre Concept', href: '/notre-concept' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className={`bg-white shadow-md fixed left-0 right-0 z-40 transition-all duration-300 ${
      isTopBarVisible ? 'top-7 md:top-10' : 'top-0'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src={settings.brand.logo}
              alt={settings.brand.name}
              width={140}
              height={45}
              className="h-12 md:h-14 lg:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-primary hover:text-accent transition-colors font-semibold text-sm uppercase tracking-wide relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/"
              className="bg-accent hover:bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-md"
            >
              Demander un devis
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-primary hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-primary hover:text-accent hover:bg-gray-50 transition-colors font-semibold py-3 px-4 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/"
                className="block bg-accent hover:bg-primary text-white text-center px-4 py-3 rounded-lg font-bold transition-colors mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demander un devis
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
