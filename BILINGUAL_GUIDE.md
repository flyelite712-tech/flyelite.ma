# Simple Bilingual Setup Guide (FR/EN)

## ✨ Overview

Your website now supports **French** (default) and **English** with a simple, client-side approach. No URL changes, no complex routing - just a language switcher that saves the user's preference.

## 🎯 How It Works

- Language preference is saved in **localStorage**
- **No URL changes** - stays on the same page
- **Instant switching** - no page reload needed
- French is the default language

## 📁 File Structure

```
translations/
  ├── fr.json          # French translations
  └── en.json          # English translations

contexts/
  └── LanguageContext.tsx   # Language state management

components/common/
  └── LanguageSwitcher.tsx  # Language toggle button
```

## 🚀 Quick Start

### 1. Add Language Switcher to Header

Open `components/layout/Header.tsx` and add:

```tsx
import LanguageSwitcher from '@/components/common/LanguageSwitcher'

// Add this component in your header navigation:
<LanguageSwitcher />
```

### 2. Use Translations in Components

```tsx
'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export default function MyComponent() {
  const { t } = useLanguage()
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  )
}
```

## 📝 Translation Structure

Translations use dot notation to access nested keys:

```json
// translations/fr.json
{
  "nav": {
    "home": "Accueil",
    "contact": "Contact"
  },
  "hero": {
    "title": "Réservez votre jet privé"
  }
}
```

Usage in component:
```tsx
const { t } = useLanguage()

t('nav.home')        // "Accueil" or "Home"
t('hero.title')      // "Réservez votre jet privé" or "Book your private jet"
```

## 🎨 Language Switcher

The switcher appears as: **🌐 FR | EN**

- **Active language** = Accent color background
- **Inactive language** = Gray text, hover effect
- **Click** to switch instantly

## 📋 Available Translation Keys

All these sections are already translated:

### Navigation (`nav.*`)
- `home`, `offers`, `concept`, `faq`, `blog`, `contact`

### Hero Section (`hero.*`)
- `title`, `titleHighlight`, `titleEnd`, `subtitle`, `subtitleHighlight`, `location`, `tagline`

### Search Form (`search.*`)
- `roundTrip`, `oneWay`, `from`, `to`, `passengers`, `departure`, `return`
- `search`, `quoteTitle`, `quoteDescription`
- `firstName`, `lastName`, `email`, `phone`, `notes`, `consent`
- `back`, `send`, `sending`, `successTitle`, `successMessage`

### Contact Page (`contact.*`)
- `title`, `subtitle`, `infoTitle`, `address`, `phone`, `email`
- `formTitle`, `subject`, `message`, `submit`, `sending`
- `successTitle`, `successMessage`, `required`

### Offers Page (`offers.*`)
- `title`, `subtitle`, `maxPassengers`, `details`
- `departureDate`, `schedule`, `aircraft`, `capacity`, `flightDuration`
- `totalPrice`, `bookNow`, `bookingForm`, `passengers`
- `cancel`, `confirm`, `confirming`, `bookingConfirmed`
- `confirmationMessage`, `redirecting`

### Footer (`footer.*`)
- `description`, `quickLinks`, `followUs`, `rights`, `terms`, `privacy`

### Common (`common.*`)
- `loading`, `error`, `required`, `close`, `readMore`, `backToHome`

## ➕ Adding New Translations

1. Open both `translations/fr.json` and `translations/en.json`

2. Add the same key structure to both files:

```json
// translations/fr.json
{
  "pricing": {
    "title": "Nos Tarifs",
    "description": "Prix transparents"
  }
}

// translations/en.json
{
  "pricing": {
    "title": "Our Pricing",
    "description": "Transparent prices"
  }
}
```

3. Use in your component:

```tsx
const { t } = useLanguage()

<h1>{t('pricing.title')}</h1>
<p>{t('pricing.description')}</p>
```

## 🔍 Checking Current Language

```tsx
const { language } = useLanguage()

// language is either 'fr' or 'en'
if (language === 'fr') {
  // Do something specific for French
}
```

## 🎯 Example: Complete Component

```tsx
'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const { t, language } = useLanguage()
  
  return (
    <div>
      <h1>{t('contact.title')}</h1>
      <p>{t('contact.subtitle')}</p>
      
      {/* Conditional content based on language */}
      {language === 'fr' ? (
        <p>Contenu spécifique français</p>
      ) : (
        <p>English specific content</p>
      )}
      
      <button>{t('contact.submit')}</button>
    </div>
  )
}
```

## 💡 Tips

### 1. Always Use Both Files
When adding translations, **always update both** `fr.json` and `en.json` with the same key structure.

### 2. Nested Keys
Use nested objects for organization:
```json
{
  "page": {
    "section": {
      "item": "Value"
    }
  }
}
```
Access with: `t('page.section.item')`

### 3. Fallback
If a key doesn't exist, the function returns the key itself as fallback.

### 4. Client Components Only
The `useLanguage()` hook only works in client components (with `'use client'` directive).

## 🔧 Customization

### Change Language Switcher Style

Edit `components/common/LanguageSwitcher.tsx`:

```tsx
// Add flags
<button>
  {language === 'fr' ? '🇫🇷' : '🇬🇧'} {language.toUpperCase()}
</button>

// Change colors
className="bg-primary text-white"  // Instead of bg-accent

// Add dropdown style
// ... implement dropdown UI
```

### Add More Languages

1. Create `translations/es.json` (for Spanish, etc.)
2. Update `LanguageContext.tsx`:
```tsx
type Language = 'fr' | 'en' | 'es'
```
3. Add button in `LanguageSwitcher.tsx`

## ✅ Benefits of This Approach

- ✅ **Simple** - No complex routing
- ✅ **Fast** - Client-side only, no server requests
- ✅ **Persistent** - Saves user preference
- ✅ **SEO-friendly** - Same URL for all languages
- ✅ **No dependencies** - Pure React context
- ✅ **Easy to maintain** - Just JSON files

## 🚀 Next Steps

1. Add `<LanguageSwitcher />` to your header
2. Replace hardcoded text with `t('key')` calls
3. Test switching between languages
4. Add more translations as needed

Your bilingual website is ready to go! 🎉
