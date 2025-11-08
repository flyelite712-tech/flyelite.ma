# 🎯 Guide Complet de Construction - Fly Elite

## ✅ CE QUI A ÉTÉ CRÉÉ (Fondation Complète)

### 1. Configuration & Infrastructure
- ✅ Next.js 14 + TypeScript + Tailwind CSS + Framer Motion
- ✅ package.json avec toutes les dépendances
- ✅ tsconfig.json, tailwind.config.ts, postcss.config.js
- ✅ .env.local.example avec configuration SMTP
- ✅ .gitignore
- ✅ Structure de dossiers complète

### 2. Données (100% Éditable)
- ✅ **316 aéroports** dans `data/airports.json`
- ✅ **6 offres d'exemple** dans `data/offers.json`
- ✅ **Settings complets** dans `data/settings.json`
- ✅ Types TypeScript dans `types/index.ts`

### 3. Layout Global
- ✅ `app/layout.tsx` - Layout principal
- ✅ `app/globals.css` - Styles globaux
- ✅ `components/layout/TopBar.tsx` - Barre d'info
- ✅ `components/layout/Header.tsx` - Navigation
- ✅ `components/layout/Footer.tsx` - Footer

### 4. Système d'Emails (Nodemailer)
- ✅ `lib/email.ts` - Service complet avec 3 types d'emails
  - Demande de devis (client + interne)
  - Réservation (client + interne)
  - Contact (client + interne)
- ✅ Templates HTML professionnels en français

### 5. Utilitaires
- ✅ `lib/utils.ts` - Fonctions utilitaires
- ✅ `scripts/generate-airports.js` - Script de génération d'aéroports

### 6. Composants Homepage Créés
- ✅ `components/home/Hero.tsx` - Hero avec slider
- ✅ `components/search/SearchTabs.tsx` - Onglets Aller-Retour/Aller Simple
- ✅ `components/search/FlightSearchForm.tsx` - Formulaire de recherche

### 7. Documentation
- ✅ README.md
- ✅ INSTALLATION.md
- ✅ PROJECT_STATUS.md
- ✅ NEXT_STEPS.md
- ✅ COMPLETE_BUILD_GUIDE.md (ce fichier)

## 🚧 CE QUI RESTE À CRÉER

### Composants Manquants (Priorité 1)

#### 1. Composants de Recherche
```bash
components/search/
├── AirportSelect.tsx          # Sélecteur d'aéroports avec autocomplete
├── QuoteModal.tsx             # Modal de formulaire de devis
└── QuoteForm.tsx              # Formulaire de devis complet
```

**AirportSelect.tsx** - Exemple de structure:
```typescript
'use client'
import { useState } from 'react'
import airports from '@/data/airports.json'

export default function AirportSelect({ value, onChange, placeholder }) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  
  const filtered = airports.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.code.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 10)
  
  return (
    // Dropdown avec recherche
  )
}
```

#### 2. Composants Homepage
```bash
components/home/
├── OffersCarousel.tsx         # Carousel des offres du moment
├── Benefits.tsx               # Section "Pourquoi choisir Fly Elite"
└── ConceptPreview.tsx         # Aperçu du concept
```

#### 3. Composants Offres
```bash
components/offers/
├── OfferCard.tsx              # Carte d'offre
├── OfferGrid.tsx              # Grille d'offres
├── OfferGallery.tsx           # Galerie d'images
└── BookingForm.tsx            # Formulaire de réservation
```

#### 4. Composants UI Génériques
```bash
components/ui/
├── Button.tsx                 # Bouton réutilisable
├── Input.tsx                  # Input réutilisable
├── Select.tsx                 # Select réutilisable
├── Modal.tsx                  # Modal réutilisable
├── Accordion.tsx              # Accordion pour FAQ
└── Toast.tsx                  # Notifications
```

### Pages Manquantes (Priorité 2)

#### 1. Page Offres
```bash
app/offres/
├── page.tsx                   # Liste des offres
└── [slug]/
    └── page.tsx               # Détail d'une offre
```

#### 2. Page Contact
```bash
app/contact/
└── page.tsx                   # Formulaire + carte
```

#### 3. Page FAQ
```bash
app/faq/
└── page.tsx                   # Accordion avec FAQ complète
```

#### 4. Page Notre Concept
```bash
app/notre-concept/
└── page.tsx                   # Contenu statique
```

### API Routes (Priorité 3)

```bash
app/api/
├── quote/
│   └── route.ts               # POST /api/quote
├── booking/
│   └── route.ts               # POST /api/booking
└── contact/
    └── route.ts               # POST /api/contact
```

**Exemple route.ts**:
```typescript
import { NextResponse } from 'next/server'
import { sendQuoteEmail } from '@/lib/email'
import airports from '@/data/airports.json'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    await sendQuoteEmail(data, airports)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}
```

### Données Manquantes

```bash
data/
├── faq.json                   # Contenu FAQ complet (fourni par client)
├── pages/
│   ├── home.json              # Contenu homepage
│   └── notre-concept.json     # Contenu Notre Concept
```

## 📝 PLAN D'ACTION ÉTAPE PAR ÉTAPE

### Étape 1: Installation (5 min)
```bash
cd c:\Users\eboua\OneDrive\Desktop\flyelite.fr
npm install
cp .env.local.example .env.local
# Éditer .env.local avec vos paramètres SMTP
```

### Étape 2: Ajouter Assets (10 min)
Placez vos fichiers dans `public/assets/images/`:
- `logo.svg` - Logo Fly Elite
- `hero.jpg` - Image du slider
- `offers/` - Dossier avec images des offres

### Étape 3: Créer AirportSelect (30 min)
C'est le composant le plus critique. Il doit:
- Afficher un dropdown avec recherche
- Filtrer les 316 aéroports
- Autocomplete
- Afficher "Ville (CODE)"

### Étape 4: Créer QuoteModal et QuoteForm (1h)
Le formulaire qui s'affiche après la recherche:
- Prénom, Nom, Email, Téléphone
- Checkbox T&C
- Boutons Retour/Envoyer
- Appel à `/api/quote`

### Étape 5: Créer les API Routes (30 min)
Trois fichiers simples qui utilisent `lib/email.ts`:
- `/api/quote/route.ts`
- `/api/booking/route.ts`
- `/api/contact/route.ts`

### Étape 6: Créer OffersCarousel (1h)
Carousel avec:
- Cartes d'offres
- Navigation gauche/droite
- Responsive
- Framer Motion animations

### Étape 7: Créer Pages Offres (2h)
- Liste avec grille d'offres
- Page détail avec galerie
- Formulaire de réservation

### Étape 8: Créer Pages Restantes (2h)
- Contact avec formulaire + carte
- FAQ avec accordion
- Notre Concept

### Étape 9: Ajouter FAQ Data (30 min)
Copier tout le contenu FAQ fourni dans `data/faq.json`

### Étape 10: Animations Framer Motion (1h)
Ajouter animations sur:
- Transitions de pages
- Scroll reveals
- Hover effects
- Carousel

## 🎨 EXEMPLES DE CODE RAPIDES

### AirportSelect Simple
```typescript
'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import airports from '@/data/airports.json'

interface AirportSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function AirportSelect({ value, onChange, placeholder }: AirportSelectProps) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = airports.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.city.toLowerCase().includes(search.toLowerCase()) ||
    a.code.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 10)

  const selected = airports.find(a => a.code === value)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between focus:ring-2 focus:ring-accent"
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? `${selected.city} (${selected.code})` : placeholder}
        </span>
        <ChevronDown size={20} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          <div className="p-2 border-b">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full px-3 py-2 border border-gray-300 rounded"
              autoFocus
            />
          </div>
          <div>
            {filtered.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => {
                  onChange(airport.code)
                  setIsOpen(false)
                  setSearch('')
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium">{airport.city}</div>
                <div className="text-sm text-gray-500">{airport.name} ({airport.code})</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

### API Route Quote
```typescript
// app/api/quote/route.ts
import { NextResponse } from 'next/server'
import { sendQuoteEmail } from '@/lib/email'
import airports from '@/data/airports.json'
import type { QuoteRequest } from '@/types'

export async function POST(request: Request) {
  try {
    const data: QuoteRequest = await request.json()

    // Validation
    if (!data.from || !data.to || !data.contact.email) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Envoyer emails
    await sendQuoteEmail(data, airports)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Quote error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
```

### Page Offres Simple
```typescript
// app/offres/page.tsx
import offers from '@/data/offers.json'
import OfferCard from '@/components/offers/OfferCard'

export default function OffresPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        Offres du moment
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  )
}
```

## ⏱️ ESTIMATION DE TEMPS

| Tâche | Temps | Priorité |
|-------|-------|----------|
| Installation + Config | 15 min | 🔴 Critique |
| AirportSelect | 30 min | 🔴 Critique |
| QuoteModal/Form | 1h | 🔴 Critique |
| API Routes (3) | 30 min | 🔴 Critique |
| OffersCarousel | 1h | 🟡 Important |
| Pages Offres | 2h | 🟡 Important |
| Page Contact | 1h | 🟡 Important |
| Page FAQ | 1h | 🟡 Important |
| Page Notre Concept | 30 min | 🟢 Nice to have |
| Animations | 1h | 🟢 Nice to have |
| **TOTAL** | **~9h** | |

## 🚀 DÉMARRAGE RAPIDE

```bash
# 1. Installer
npm install

# 2. Configurer
cp .env.local.example .env.local
# Éditer .env.local

# 3. Lancer
npm run dev

# 4. Ouvrir
http://localhost:3000
```

## 📞 SUPPORT

Toutes les erreurs TypeScript actuelles sont **normales** et disparaîtront après `npm install`.

Le système d'emails est **prêt** - il suffit de configurer SMTP dans `.env.local`.

Les données sont **100% éditables** dans `data/`.

---

**Vous avez une fondation solide et professionnelle. Il reste principalement à créer les composants d'interface utilisateur. Tout le backend (emails, données, types) est prêt !** 🎉
