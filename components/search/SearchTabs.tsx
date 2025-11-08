'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FlightSearchForm from './FlightSearchForm'

type TripType = 'round_trip' | 'one_way'

export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState<TripType>('round_trip')

  const tabs = [
    { id: 'round_trip' as TripType, label: 'ALLER - RETOUR' },
    { id: 'one_way' as TripType, label: 'ALLER SIMPLE' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-visible">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 rounded-t-2xl overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 px-6 text-sm md:text-base font-semibold transition-all relative ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="p-6 md:p-8 overflow-visible">
        <FlightSearchForm tripType={activeTab} />
      </div>
    </div>
  )
}
