# 🏥 Medical Flight / Vol Sanitaire Feature

## ✅ What's Been Added

A complete **Medical Flight (Vol Sanitaire)** offer has been added to your website as the **second offer** in the list, featuring comprehensive medical aviation services.

## 📋 Offer Details

### Route Information:
- **From**: Casablanca (CMN)
- **To**: Paris Le Bourget (LBG)
- **Date**: November 20, 2025
- **Aircraft**: Avion Sanitaire - Citation CJ3 Médicalisé
- **Capacity**: 2 passengers (patient + 1 companion)
- **Flight Time**: 210 minutes (3h 30min)
- **Price**: €18,500
- **Availability**: 24h/24, 7j/7

### Medical Details Included:

#### Equipment on Board:
- Unité de soins intensifs Lifeport avec matelas coquille
- Réservoir d'oxygène centralisé (6000+ litres)
- Moniteur de transport médical multiparamètres
- Respirateur artificiel pour modes de respiration complexes
- Électrocardiographe multifonction 12 canaux
- Défibrillateur/système de surveillance compact
- Téléphone satellite pour communications mondiales

#### Medical Crew:
- Médecin spécialisé en soins d'urgence et intensifs
- Assistant paramédical qualifié
- Pilotes expérimentés certifiés vols médicaux

#### Services:
- Disponibilité 24h/24, 7j/7
- Départ de l'aéroport le plus proche de l'hôpital
- Transfert 'de lit à lit' avec ambulance terrestre
- Ajustement de la pression cabine (vol sea level si nécessaire)
- Surveillance médicale constante durant le vol
- Coordination avec établissements de santé
- Service traduction et gestion documents médicaux

#### Suitable For:
- Rapatriements sanitaires internationaux
- Évacuations médicales urgentes
- Transferts inter-hospitaliers pour soins spécialisés
- Patients en soins intensifs
- Patients sous assistance respiratoire
- Transport de patients avec monitoring constant
- Voyages médicaux planifiés pour traitements à l'étranger

## 🎨 Visual Features

### On Offers List Page (`/offres`):
- **Red "VOL SANITAIRE" badge** - Top right corner of card
- Medical cross icon in badge
- Same card layout as regular flights
- Positioned as 2nd offer in the list

### On Offer Detail Page (`/offres/vol-sanitaire-casablanca-paris-20-nov`):
- **Medical Flight Details Section** with:
  - Heart icon and medical flight type heading
  - Description of the service
  - **Blue box**: Medical equipment list (first 4 items)
  - **Green box**: Included services (first 4 items)
- Standard flight information
- Booking form (same as regular flights)

## 📁 Files Modified

### 1. `data/offers.json`
- Added complete medical flight offer as 2nd item
- Includes `isMedical: true` flag
- Comprehensive `medicalDetails` object with all information

### 2. `types/index.ts`
- Updated `Offer` interface to support:
  - `isMedical?: boolean`
  - `medicalDetails?: { ... }` with full medical information structure

### 3. `app/offres/page.tsx`
- Added "VOL SANITAIRE" badge for medical flights
- Red badge with medical icon
- Positioned top-right on offer cards

### 4. `app/offres/[slug]/page.tsx`
- Added medical details section
- Displays equipment and services
- Color-coded information boxes (blue for equipment, green for services)
- Conditional rendering (only shows for medical flights)

## 🎯 User Experience

### Browsing Offers:
1. User visits `/offres`
2. Sees medical flight card with **red "VOL SANITAIRE" badge**
3. Immediately recognizes it as a medical service
4. Card shows route, price, and aircraft like regular flights

### Viewing Medical Flight Details:
1. User clicks on medical flight offer
2. Sees standard flight information (route, schedule, aircraft)
3. **Additional section** appears with:
   - Medical flight type and description
   - Medical equipment available
   - Services included
4. Can book using the same form as regular flights

## 💡 Key Differentiators

### Visual Indicators:
- ✅ Red badge (vs. regular flights with no special badge)
- ✅ Medical cross icon
- ✅ "VOL SANITAIRE" label
- ✅ Special medical details section

### Content:
- ✅ Comprehensive medical equipment list
- ✅ Qualified medical crew information
- ✅ 24/7 availability
- ✅ Bed-to-bed transfer service
- ✅ Hospital coordination

## 🔧 Technical Implementation

### Data Structure:
```json
{
  "isMedical": true,
  "medicalDetails": {
    "type": "Vol Sanitaire / Avion Ambulance",
    "description": "...",
    "equipment": [...],
    "crew": [...],
    "services": [...],
    "suitableFor": [...]
  }
}
```

### Type Safety:
```typescript
interface Offer {
  // ... standard fields
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
```

### Conditional Rendering:
```tsx
{offer.isMedical && (
  <div className="medical-badge">VOL SANITAIRE</div>
)}

{offer.isMedical && offer.medicalDetails && (
  <div className="medical-details">
    {/* Medical information */}
  </div>
)}
```

## 📊 Content Source

All medical flight information was extracted from the article you provided about:
- Avion sanitaire / avion ambulance services
- Medical equipment standards
- Crew qualifications
- Services offered
- Suitable use cases

## ✨ Benefits

### For Users:
- Clear identification of medical flights
- Comprehensive information about medical services
- Transparency about equipment and crew
- Easy booking process

### For Business:
- Showcases specialized medical aviation services
- Professional presentation of capabilities
- Differentiates from standard charter flights
- Attracts medical transport clients

## 🎨 Customization Options

### Change Badge Color:
Edit `app/offres/page.tsx`:
```tsx
// Current: Red
className="bg-red-600 text-white ..."

// Blue:
className="bg-blue-600 text-white ..."

// Green:
className="bg-green-600 text-white ..."
```

### Add More Equipment/Services:
Edit `data/offers.json` - add items to arrays:
```json
"equipment": [
  "Existing item",
  "New equipment item"
]
```

### Change Display Limit:
Edit `app/offres/[slug]/page.tsx`:
```tsx
// Show more items (currently 4)
{offer.medicalDetails.equipment.slice(0, 6).map(...)}
```

### Add More Medical Flights:
Copy the medical flight object in `offers.json` and modify:
- Change route (from/to)
- Update date
- Adjust price
- Modify medical details as needed

## 🚀 Next Steps

### Optional Enhancements:
1. **Add images**: Create medical aircraft images for the gallery
2. **Translate**: Add English translations for medical terms
3. **Expand details**: Add full equipment list on a separate tab
4. **Add FAQ**: Create medical flight-specific FAQ section
5. **Contact form**: Add specialized medical inquiry form

### Image Placeholders:
Currently using placeholder paths:
```
/assets/images/offers/Medical Flight/1.png
/assets/images/offers/Medical Flight/2.png
/assets/images/offers/Medical Flight/3.png
```

You'll need to add actual images to these paths.

## ✅ Testing Checklist

- [ ] Visit `/offres` - see medical flight card with red badge
- [ ] Click medical flight - see detailed page
- [ ] Verify medical details section appears
- [ ] Check equipment list displays correctly
- [ ] Check services list displays correctly
- [ ] Test booking form works
- [ ] Verify responsive design on mobile
- [ ] Check all text is readable and properly formatted

## 📝 Notes

- Medical flight is marked as `featured: true` (appears in featured offers)
- Price is set to €18,500 (adjust based on actual pricing)
- Schedule shows "Disponible 24h/24" and "Sur demande" (on-demand service)
- Capacity is 2 passengers (patient + companion) - adjust if needed

---

**Your medical flight service is now live and professionally presented! 🏥✈️**
