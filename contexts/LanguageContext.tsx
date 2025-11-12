'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import LanguageTransition from '@/components/common/LanguageTransition'

type Language = 'fr' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isAnimating: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')
  const [translations, setTranslations] = useState<any>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [targetLanguage, setTargetLanguage] = useState<Language>('fr')
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const data = await import(`@/translations/${language}.json`)
        setTranslations(data.default)
      } catch (error) {
        console.error('Failed to load translations:', error)
      }
    }
    loadTranslations()
  }, [language])

  // Load saved language preference and show initial animation
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLanguageState(saved)
      setTargetLanguage(saved)
    }
    
    // Show initial loading animation
    setIsAnimating(true)
    
    // Stop animation after duration
    const timer = setTimeout(() => {
      setIsAnimating(false)
      setIsInitialLoad(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  const setLanguage = (lang: Language) => {
    if (lang === language) return // Don't animate if same language
    
    // Set target language for loading text
    setTargetLanguage(lang)
    
    // Start animation
    setIsAnimating(true)
    
    // Change language after a short delay (when plane is mid-screen)
    setTimeout(() => {
      setLanguageState(lang)
      localStorage.setItem('language', lang)
    }, 750) // Half of animation duration
    
    // Stop animation
    setTimeout(() => {
      setIsAnimating(false)
    }, 1500) // Full animation duration
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isAnimating }}>
      <LanguageTransition 
        isAnimating={isAnimating} 
        targetLanguage={targetLanguage} 
        isInitialLoad={isInitialLoad}
      />
      {/* Only show content after initial animation completes */}
      {!isInitialLoad && children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
