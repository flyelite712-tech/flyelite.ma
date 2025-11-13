import React from 'react'

/**
 * Formats aircraft names with special styling for specific aircraft
 * @param aircraftName - The aircraft name to format
 * @returns JSX element with appropriate styling
 */
export function formatAircraftName(aircraftName: string): React.ReactNode {
  // Check if the aircraft name contains "CJ3 Médicalisé" (case insensitive)
  if (aircraftName.toLowerCase().includes('cj3') && aircraftName.toLowerCase().includes('médicalisé')) {
    // Find the exact match for "Citation CJ3 Médicalisé" in the original text
    const regex = /(Citation\s+CJ3\s+Médicalisé)/i
    const match = aircraftName.match(regex)
    
    if (match) {
      const beforeMatch = aircraftName.substring(0, match.index)
      const matchedText = match[0]
      const afterMatch = aircraftName.substring(match.index! + matchedText.length)
      
      return (
        <>
          {beforeMatch}
          <span style={{ fontWeight: 'bold', color: '#dc2626' }}>{matchedText}</span>
          {afterMatch}
        </>
      )
    }
  }
  
  // Return the original aircraft name if no special formatting is needed
  return aircraftName
}
