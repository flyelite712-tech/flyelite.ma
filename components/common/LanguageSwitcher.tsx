'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LanguageSwitcher() {
  const { language, setLanguage, isAnimating } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <motion.div
        animate={{ rotate: isAnimating ? 360 : 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <Globe size={18} className="text-gray-600" />
      </motion.div>
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setLanguage('fr')}
          disabled={isAnimating}
          className={`px-3 py-1 text-sm font-semibold rounded transition-all ${
            language === 'fr'
              ? 'bg-accent text-white'
              : 'text-gray-600 hover:bg-gray-100'
          } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          FR
        </button>
        <button
          onClick={() => setLanguage('en')}
          disabled={isAnimating}
          className={`px-3 py-1 text-sm font-semibold rounded transition-all ${
            language === 'en'
              ? 'bg-accent text-white'
              : 'text-gray-600 hover:bg-gray-100'
          } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          EN
        </button>
      </div>
    </div>
  )
}
