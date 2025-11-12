# Component Conversion Checklist

Use this checklist to track which components have been converted to use translations.

## ✅ Completed

- [x] **Header** (`components/layout/Header.tsx`)
  - Navigation menu
  - Language switcher added
  
- [x] **Hero** (`components/home/Hero.tsx`)
  - Main title
  - Subtitle
  - Location
  - Tagline

- [x] **Footer** (`components/layout/Footer.tsx`)
  - Menu links

- [x] **Layout** (`app/layout.tsx`)
  - LanguageProvider wrapper added

## 🔄 To Convert

### High Priority (User-facing forms and pages)

- [ ] **SearchTabs** (`components/search/SearchTabs.tsx`)
  - Tab labels: "ALLER - RETOUR" / "ALLER SIMPLE"

- [ ] **FlightSearchForm** (`components/search/FlightSearchForm.tsx`)
  - Form labels
  - Placeholders
  - Button text
  - Success messages

- [ ] **Contact Page** (`app/contact/page.tsx`)
  - Page title and subtitle
  - Form labels
  - Success messages

- [ ] **Offers Page** (`app/offres/page.tsx`)
  - Page title and subtitle
  - Offer cards

- [ ] **Offer Detail Page** (`app/offres/[slug]/page.tsx`)
  - Booking form
  - Details section

### Medium Priority (Content sections)

- [ ] **WhyChooseUs** (`components/home/WhyChooseUs.tsx`)
  - Section title
  - Feature descriptions

- [ ] **FeaturedOffers** (`components/home/FeaturedOffers.tsx`)
  - Section title
  - Offer cards

- [ ] **FAQPreview** (`components/home/FAQPreview.tsx`)
  - Section title
  - FAQ items

- [ ] **ReviewsSection** (`components/home/ReviewsSection.tsx`)
  - Section title
  - Review content (if needed)

- [ ] **TopBar** (`components/layout/TopBar.tsx`)
  - Contact info labels

### Low Priority (Nice to have)

- [ ] **WhatsAppButton** (`components/common/WhatsAppButton.tsx`)
  - Tooltip text

- [ ] **ScrollToTop** (`components/common/ScrollToTop.tsx`)
  - Tooltip text (if any)

- [ ] **Blog Page** (`app/blog/page.tsx`)
  - Page title
  - Navigation

- [ ] **FAQ Page** (`app/faq/page.tsx`)
  - Page title
  - Questions and answers

- [ ] **Notre Concept Page** (`app/notre-concept/page.tsx`)
  - All content

## 📝 Conversion Pattern

For each component, follow these steps:

### 1. Add Import
```tsx
import { useLanguage } from '@/contexts/LanguageContext'
```

### 2. Use Hook
```tsx
const { t } = useLanguage()
```

### 3. Replace Text
```tsx
// Before:
<h1>Titre en français</h1>

// After:
<h1>{t('section.key')}</h1>
```

### 4. Add Translations
Add the same key to both files:
- `translations/fr.json`
- `translations/en.json`

## 🎯 Translation Keys Already Available

You don't need to add these - they're already in the JSON files:

### Navigation (`nav.*`)
- `home`, `offers`, `concept`, `faq`, `blog`, `contact`

### Hero (`hero.*`)
- `title`, `titleHighlight`, `titleEnd`
- `subtitle`, `subtitleHighlight`
- `location`, `tagline`

### Search (`search.*`)
- `roundTrip`, `oneWay`
- `from`, `to`, `passengers`
- `departure`, `return`, `search`
- `quoteTitle`, `quoteDescription`
- `firstName`, `lastName`, `email`, `phone`
- `notes`, `notesPlaceholder`, `consent`
- `back`, `send`, `sending`
- `successTitle`, `successMessage`

### Contact (`contact.*`)
- `title`, `subtitle`, `infoTitle`
- `address`, `phone`, `email`
- `formTitle`, `subject`, `message`
- `submit`, `sending`
- `successTitle`, `successMessage`
- `required`

### Offers (`offers.*`)
- `title`, `subtitle`, `maxPassengers`
- `details`, `departureDate`, `schedule`
- `aircraft`, `capacity`, `flightDuration`
- `totalPrice`, `bookNow`
- `bookingForm`, `passengers`
- `cancel`, `confirm`, `confirming`
- `bookingConfirmed`, `confirmationMessage`
- `redirecting`

### Footer (`footer.*`)
- `description`, `quickLinks`, `followUs`
- `rights`, `terms`, `privacy`

### Common (`common.*`)
- `loading`, `error`, `required`
- `close`, `readMore`, `backToHome`

## 📊 Progress Tracker

**Completed**: 3 components  
**Remaining**: ~15 components  
**Estimated Time**: 2-3 hours for all high priority items

---

**Tip**: Start with the high-priority items (forms and user-facing pages) first, as these have the most impact on user experience.
