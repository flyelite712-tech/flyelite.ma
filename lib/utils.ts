import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency: string = 'MAD'): string {
  if (amount === 0) {
    return 'Prix sur demande'
  }
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount) + ' ' + currency
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatTime(time: string): string {
  return time
}

export function getAirportLabel(code: string, airports: any[]): string {
  const airport = airports.find(a => a.code === code)
  return airport ? `${airport.city} (${airport.code})` : code
}
