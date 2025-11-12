# 🌍 Bilingual Website - Start Here

## ✅ What's Done

Your website now has a **simple bilingual system** (French/English) that works **without changing URLs**.

### Components Already Converted:
1. ✅ **Header** - Navigation menu + Language switcher (🌐 FR | EN)
2. ✅ **Hero Section** - Main homepage banner
3. ✅ **Footer** - Menu links

### What This Means:
- Click **EN** → Everything switches to English
- Click **FR** → Everything switches back to French
- Preference is **saved** (localStorage)
- **No URL changes** - stays on same page

## 🚀 Quick Start

### 1. Test It Now

```bash
npm run dev
```

Then open `http://localhost:3000` and:
1. Look for **🌐 FR | EN** in the header (top right on desktop)
2. Click **EN** to switch to English
3. Click **FR** to switch back to French
4. Refresh page - language stays the same ✅

### 2. See What Changes

**French:**
- Navigation: "Offres Du Moment | Notre Concept | Blog | FAQ | Contact"
- Hero: "Réservez votre **jet privé** en seulement 5 min !"

**English:**
- Navigation: "Offers | Our Concept | Blog | FAQ | Contact"  
- Hero: "Book your **private jet** in just 5 minutes!"

## 📚 Documentation Files

I've created several guides for you:

1. **`BILINGUAL_GUIDE.md`** - Complete documentation
   - How the system works
   - How to use translations
   - How to add new translations
   - Examples and tips

2. **`TESTING_GUIDE.md`** - Testing instructions
   - What to test
   - What you should see
   - Troubleshooting

3. **`CONVERSION_CHECKLIST.md`** - Track your progress
   - List of all components
   - What's done vs. what's left
   - Conversion pattern

4. **`HEADER_EXAMPLE.md`** - Code examples
   - How the Header was converted
   - Full code with translations

## 🎯 Continue Converting Components

You can now convert other components using the same pattern:

### Simple 3-Step Pattern:

```tsx
// 1. Import
import { useLanguage } from '@/contexts/LanguageContext'

// 2. Use hook
const { t } = useLanguage()

// 3. Replace text
<h1>{t('section.key')}</h1>
```

### Priority Order:

**High Priority** (Do these next):
1. Search form (`SearchTabs.tsx`, `FlightSearchForm.tsx`)
2. Contact page (`app/contact/page.tsx`)
3. Offers pages (`app/offres/page.tsx`, `app/offres/[slug]/page.tsx`)

**Medium Priority**:
- Home page sections (WhyChooseUs, FeaturedOffers, FAQPreview)

**Low Priority**:
- Other pages and components

See `CONVERSION_CHECKLIST.md` for the complete list.

## 📁 File Structure

```
translations/
  ├── fr.json          # French translations (default)
  └── en.json          # English translations

contexts/
  └── LanguageContext.tsx   # Language state management

components/common/
  └── LanguageSwitcher.tsx  # FR/EN toggle button

app/
  └── layout.tsx       # Wrapped with LanguageProvider ✅
```

## 🔑 Translation Keys Available

All these are **already translated** in both languages:

- **Navigation**: `nav.home`, `nav.offers`, `nav.concept`, etc.
- **Hero**: `hero.title`, `hero.subtitle`, `hero.tagline`, etc.
- **Search**: `search.from`, `search.to`, `search.passengers`, etc.
- **Contact**: `contact.title`, `contact.email`, `contact.submit`, etc.
- **Offers**: `offers.title`, `offers.bookNow`, `offers.price`, etc.
- **Footer**: `footer.description`, `footer.rights`, etc.
- **Common**: `common.loading`, `common.error`, `common.close`, etc.

See the JSON files for the complete list.

## 💡 Quick Examples

### Example 1: Simple Text
```tsx
// Before:
<h1>Contactez-nous</h1>

// After:
const { t } = useLanguage()
<h1>{t('contact.title')}</h1>
```

### Example 2: With Variables
```tsx
// In JSON: "maxPassengers": "For {count} passengers max"
const { t } = useLanguage()
<p>{t('offers.maxPassengers', { count: 8 })}</p>
```

### Example 3: Check Current Language
```tsx
const { language } = useLanguage()

if (language === 'fr') {
  // French-specific content
} else {
  // English-specific content
}
```

## 🎨 Customization

### Want to change the language switcher style?

Edit `components/common/LanguageSwitcher.tsx`

### Want to add more languages?

1. Create `translations/es.json` (or any language)
2. Update `contexts/LanguageContext.tsx` to include new language
3. Add button in `LanguageSwitcher.tsx`

### Want to change default language?

Edit `contexts/LanguageContext.tsx` - change initial state from `'fr'` to `'en'`

## ✨ Benefits of This System

- ✅ **Simple** - No complex routing or middleware
- ✅ **Fast** - Client-side only, instant switching
- ✅ **Clean URLs** - No /fr or /en prefixes
- ✅ **Persistent** - Saves user preference
- ✅ **No dependencies** - Pure React Context
- ✅ **Easy to maintain** - Just edit JSON files

## 🐛 Troubleshooting

**Language switcher not showing?**
- Make sure dev server is running: `npm run dev`

**Translations not changing?**
- Check if component has `'use client'` directive
- Verify you imported and used `useLanguage()`

**Seeing translation keys instead of text?**
- The key doesn't exist in JSON files
- Add it to both `fr.json` and `en.json`

## 📞 Need Help?

1. Check `BILINGUAL_GUIDE.md` for detailed documentation
2. Check `TESTING_GUIDE.md` for testing instructions
3. Check `CONVERSION_CHECKLIST.md` to track progress

## 🎉 You're All Set!

Your bilingual foundation is ready. Now you can:

1. ✅ Test the current setup
2. ✅ Convert more components (follow the pattern)
3. ✅ Add new translations as needed

**Start with**: Run `npm run dev` and test the language switcher!

---

**Next Step**: Open `TESTING_GUIDE.md` to test everything, then use `CONVERSION_CHECKLIST.md` to continue converting components.
