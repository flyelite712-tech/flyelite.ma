'use client'

import { useState, useEffect } from 'react'
import settings from '@/data/settings.json'

export default function TopBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide TopBar when scrolling down, show when scrolling up or at top
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  if (!settings.topBar.enabled) return null

  return (
    <div 
      className={`w-full py-1.5 md:py-2 px-2 md:px-4 text-white text-xs md:text-sm text-center fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ backgroundColor: settings.topBar.bg }}
    >
      <p className="container mx-auto leading-tight">
        {settings.topBar.text}
      </p>
    </div>
  )
}
