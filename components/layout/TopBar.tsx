'use client'

import settings from '@/data/settings.json'

export default function TopBar() {
  if (!settings.topBar.enabled) return null

  return (
    <div 
      className="w-full py-2 px-4 text-white text-sm text-center"
      style={{ backgroundColor: settings.topBar.bg }}
    >
      <p className="container mx-auto">
        {settings.topBar.text}
      </p>
    </div>
  )
}
