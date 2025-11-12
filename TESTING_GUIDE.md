# Testing Your Bilingual Website

## ✅ What's Already Set Up

I've converted these components to use translations:

1. **Header** - Navigation menu + Language switcher
2. **Hero Section** - Main homepage banner
3. **Footer** - Menu links

## 🚀 How to Test

### 1. Start the Dev Server

```bash
npm run dev
```

### 2. Open Your Browser

Go to: `http://localhost:3000`

### 3. Look for the Language Switcher

You should see **🌐 FR | EN** in the header:
- **Desktop**: Next to "Demander un devis" button (top right)
- **Mobile**: Inside the mobile menu

### 4. Test Language Switching

Click on **EN** button and watch:
- ✅ Navigation menu changes to English
- ✅ Hero title changes to "Book your **private jet** in just 5 minutes!"
- ✅ Hero subtitle changes to English
- ✅ Footer menu changes to English

Click on **FR** button and everything switches back to French.

### 5. Check Persistence

1. Switch to English
2. Refresh the page
3. Language should **stay in English** (saved in localStorage)

## 📋 What You'll See

### French (Default)
```
Navigation: Offres Du Moment | Notre Concept | Blog | FAQ | Contact
Hero: Réservez votre jet privé en seulement 5 min !
```

### English
```
Navigation: Offers | Our Concept | Blog | FAQ | Contact
Hero: Book your private jet in just 5 minutes!
```

## 🎯 Next Steps - Continue Converting

Now you can continue adding translations to other components. Here's the pattern:

### For Any Component:

1. **Add the import**:
```tsx
import { useLanguage } from '@/contexts/LanguageContext'
```

2. **Use the hook**:
```tsx
const { t } = useLanguage()
```

3. **Replace text**:
```tsx
// Before:
<h1>Contactez-nous</h1>

// After:
<h1>{t('contact.title')}</h1>
```

4. **Make sure translation exists** in both:
   - `translations/fr.json`
   - `translations/en.json`

## 📝 Components to Convert Next

Here's a suggested order:

### Priority 1 (User-facing):
- [ ] `components/search/SearchTabs.tsx` - Search form tabs
- [ ] `components/search/FlightSearchForm.tsx` - Flight search form
- [ ] `app/contact/page.tsx` - Contact page
- [ ] `app/offres/page.tsx` - Offers listing page

### Priority 2 (Content):
- [ ] `components/home/WhyChooseUs.tsx` - Why choose us section
- [ ] `components/home/FeaturedOffers.tsx` - Featured offers
- [ ] `components/home/FAQPreview.tsx` - FAQ preview

### Priority 3 (Other):
- [ ] `components/common/WhatsAppButton.tsx` - WhatsApp button tooltip
- [ ] Other sections as needed

## 🔍 How to Add New Translations

### Example: Converting Contact Page

1. **Open both translation files**:
   - `translations/fr.json`
   - `translations/en.json`

2. **Add keys** (if not already there):

```json
// translations/fr.json
{
  "contact": {
    "title": "Contactez-nous",
    "subtitle": "Notre équipe est à votre disposition 24/7",
    "formTitle": "Envoyez-nous un message"
  }
}

// translations/en.json
{
  "contact": {
    "title": "Contact Us",
    "subtitle": "Our team is available 24/7",
    "formTitle": "Send us a message"
  }
}
```

3. **Update the component**:

```tsx
'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()
  
  return (
    <div>
      <h1>{t('contact.title')}</h1>
      <p>{t('contact.subtitle')}</p>
      <h2>{t('contact.formTitle')}</h2>
    </div>
  )
}
```

## 🐛 Troubleshooting

### Issue: Language switcher not showing

**Check**: Is the dev server running?
```bash
npm run dev
```

### Issue: Translations not changing

**Check**: 
1. Is the component using `'use client'` directive?
2. Did you import and use `useLanguage()`?
3. Do the keys exist in both JSON files?

### Issue: Getting translation key instead of text

**Example**: Seeing `hero.title` instead of "Réservez votre"

**Solution**: The key doesn't exist in the translation file. Add it to both `fr.json` and `en.json`.

### Issue: Console errors about localStorage

**Solution**: This is normal on first load. The language preference will be saved after first interaction.

## ✨ Tips

1. **Always update both files** - Keep `fr.json` and `en.json` in sync
2. **Use nested keys** - Organize by section: `hero.title`, `contact.email`, etc.
3. **Test both languages** - Switch back and forth to verify
4. **Check mobile view** - Language switcher appears in mobile menu too

## 🎉 You're Ready!

Your bilingual system is working! Now you can:
1. Test the current setup
2. Continue converting other components
3. Add more translations as needed

The foundation is solid and simple. Just follow the pattern and you'll have a fully bilingual website in no time! 🚀
