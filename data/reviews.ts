export interface Review {
  id: string
  name: string
  role: string
  company?: string
  rating: number
  comment: string
  date: string
  image?: string
}

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Ahmed Benkirane',
    role: 'PDG',
    company: 'TechVision Maroc',
    rating: 5,
    comment: 'Service exceptionnel ! FlyElite a transformé nos déplacements professionnels. La réservation est simple, l\'équipe est réactive et les appareils sont impeccables. Nous avons gagné un temps précieux pour nos réunions internationales.',
    date: '2024-10-15'
  },
  {
    id: '2',
    name: 'Sophie Dubois',
    role: 'Directrice Marketing',
    company: 'Luxury Brands International',
    rating: 5,
    comment: 'Une expérience de voyage incomparable ! Du premier contact jusqu\'à l\'atterrissage, tout était parfait. Le personnel est attentionné et professionnel. Je recommande vivement FlyElite pour tous vos déplacements en jet privé.',
    date: '2024-10-20'
  },
  {
    id: '3',
    name: 'Karim El Fassi',
    role: 'Entrepreneur',
    rating: 5,
    comment: 'J\'ai réservé un vol pour Dubaï en moins de 3 heures. L\'équipe FlyElite a géré tous les détails avec une efficacité remarquable. Le confort à bord et la flexibilité horaire sont exactement ce dont j\'avais besoin.',
    date: '2024-10-25'
  },
  {
    id: '4',
    name: 'Nadia Alami',
    role: 'Architecte',
    company: 'Alami Design Studio',
    rating: 5,
    comment: 'Pour mes déplacements professionnels fréquents, FlyElite est devenu mon choix privilégié. La qualité du service, la ponctualité et l\'attention aux détails sont exemplaires. Un vrai gain de temps et de confort.',
    date: '2024-10-28'
  },
  {
    id: '5',
    name: 'Jean-Pierre Martin',
    role: 'Investisseur',
    rating: 5,
    comment: 'Excellent service du début à la fin. L\'équipe comprend parfaitement les besoins des voyageurs d\'affaires. Les tarifs sont transparents et compétitifs. Je suis devenu un client régulier sans hésitation.',
    date: '2024-11-02'
  },
  {
    id: '6',
    name: 'Yasmine Tazi',
    role: 'Avocate',
    company: 'Cabinet Tazi & Associés',
    rating: 5,
    comment: 'FlyElite a organisé un vol pour toute notre équipe vers Paris. Organisation impeccable, appareil spacieux et confortable. Le service personnalisé fait vraiment la différence. Merci pour cette expérience mémorable !',
    date: '2024-11-05'
  }
]
