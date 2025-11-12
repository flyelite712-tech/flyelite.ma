'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plane } from 'lucide-react'
import Image from 'next/image'

interface LanguageTransitionProps {
  isAnimating: boolean
  targetLanguage?: 'fr' | 'en'
  isInitialLoad?: boolean
}

export default function LanguageTransition({ isAnimating, targetLanguage = 'en', isInitialLoad = false }: LanguageTransitionProps) {
  const loadingText = isInitialLoad
    ? (targetLanguage === 'fr' ? 'Bienvenue chez Fly Elite...' : 'Welcome to Fly Elite...')
    : (targetLanguage === 'fr' ? 'Changement de langue...' : 'Switching Language...')
  return (
    <AnimatePresence>
      {isAnimating && (
        <>
          {/* Full-screen overlay loader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-gradient-to-br from-primary/95 via-primary/98 to-accent/95 backdrop-blur-sm"
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px',
                }}
              />
            </div>

            {/* Loading text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
                >
                  {loadingText}
                </motion.div>
                
                {/* Loading dots */}
                <div className="flex items-center justify-center space-x-3">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -12, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeInOut',
                      }}
                      className="w-3 h-3 bg-white rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Airplane flying across */}
          <motion.div
            initial={{ x: '-10%', y: '50vh', opacity: 0 }}
            animate={{ 
              x: '110vw', 
              y: '50vh',
              opacity: [0, 1, 1, 1, 0],
              rotate: [0, -5, 0, 5, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: 'easeInOut',
              opacity: {
                times: [0, 0.1, 0.5, 0.9, 1],
                duration: 1.5
              }
            }}
            className="fixed z-[9999] pointer-events-none"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))'
            }}
          >
            {/* Airplane with trail effect */}
            <div className="relative">
              {/* Trail/contrail effect */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: [0, 1, 1, 0.5, 0],
                  opacity: [0, 0.6, 0.6, 0.3, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  times: [0, 0.2, 0.5, 0.8, 1]
                }}
                className="absolute right-full top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-white/60 to-white/80 origin-right"
                style={{ width: '150px' }}
              />
              
              {/* Main airplane */}
              <motion.div
                animate={{ 
                  y: [0, -8, 0, 8, 0],
                }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative"
              >
               <Image
          src="/iconflyelite.svg"
          alt="FlyElite"
          width={56}
          height={56}
          className="h-14 w-14"
        />
                
                {/* Glow effect */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 bg-white/30 rounded-full blur-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
