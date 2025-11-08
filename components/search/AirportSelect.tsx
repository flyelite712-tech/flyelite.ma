'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import airports from '@/data/airports.json'

interface AirportSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function AirportSelect({ value, onChange, placeholder }: AirportSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const selected = airports.find(a => a.code === value)

  // Filter airports based on search
  const filtered = airports.filter(a => 
    search === '' || 
    a.city.toLowerCase().includes(search.toLowerCase()) ||
    a.code.toLowerCase().includes(search.toLowerCase()) ||
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Select Button (card select) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 transition-colors"
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? `${selected.city} (${selected.code})` : placeholder}
        </span>
        {isOpen ? (
          <ChevronUp size={18} className="text-gray-600" />
        ) : (
          <ChevronDown size={18} className="text-gray-600" />
        )}
      </button>

      {/* Dropdown - Opens BELOW the button (structure: search at top, then list) */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden">
          {/* Search field at TOP */}
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un aéroport..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-accent"
                autoFocus
              />
            </div>
          </div>

          {/* List of results BELOW search */}
          <div className="max-h-60 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((airport) => (
                <button
                  key={airport.code}
                  type="button"
                  onClick={() => {
                    onChange(airport.code)
                    setIsOpen(false)
                    setSearch('')
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-0 ${
                    airport.code === value ? 'bg-gray-50 font-semibold' : ''
                  }`}
                >
                  {airport.city} ({airport.code})
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                Aucun aéroport trouvé
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
