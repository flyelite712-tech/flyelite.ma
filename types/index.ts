export interface Airport {
  id: string
  name: string
  city: string
  country: string
  code: string
  slug: string
}

export interface Offer {
  id: string
  slug: string
  date: string
  from: string
  to: string
  aircraft: string
  seats: number
  flightTimeMin: number
  schedule: {
    depart: string
    arrive: string
  }
  price: {
    currency: string
    amount: number
  }
  gallery: string[]
  featured: boolean
  isMedical?: boolean
  medicalDetails?: {
    type: string
    description: string
    equipment: string[]
    crew: string[]
    services: string[]
    suitableFor: string[]
  }
}

export interface QuoteRequest {
  type: 'one_way' | 'round_trip'
  from: string
  to: string
  pax: number
  depart: {
    date: string
    time: string
  }
  return?: {
    date: string
    time: string
  }
  contact: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  consent: boolean
  notes?: string
}

export interface BookingRequest {
  offerId: string
  type?: 'one_way' | 'round_trip'
  from: string
  to: string
  pax: number
  depart: {
    date: string
    time?: string
  }
  return?: {
    date: string
    time: string
  }
  price: {
    currency: string
    amount: number
  }
  aircraft: string
  seats: number
  flightTimeMin: number
  schedule: {
    depart: string
    arrive: string
  }
  contact: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  consent: boolean
  notes?: string
}

export interface ContactRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface FAQSection {
  id: string
  section: string
  title: string
  items: FAQItem[]
}

export interface Settings {
  brand: {
    name: string
    logo: string
  }
  colors: {
    primary: string
    accent: string
    light: string
    dark: string
    white: string
  }
  topBar: {
    enabled: boolean
    bg: string
    text: string
  }
  contact: {
    phones: string[]
    email: string
    address: string
    social: {
      instagram?: string
      facebook?: string
      twitter?: string
      linkedin?: string
    }
    mapEmbedUrl: string
  }
}
