# Images - Fly Elite

## 📁 Structure des images

Placez vos images dans ce dossier selon la structure suivante :

```
public/assets/images/
├── logo.svg                          # Logo Fly Elite (blanc pour le header)
├── hero.jpg                          # Image du slider homepage
├── concept-preview.jpg               # Image section "Réservez instantanément"
├── concept-hero.jpg                  # Image hero page Notre Concept
├── placeholder-jet.jpg               # Image par défaut pour les offres
└── offers/                           # Dossier des images d'offres
    ├── porto-manchester/
    │   ├── 1.jpg
    │   ├── 2.jpg
    │   └── 3.jpg
    ├── nice-fes/
    │   ├── 1.jpg
    │   └── 2.jpg
    ├── bruxelles-catania/
    │   └── 1.jpg
    ├── amsterdam-cracovie/
    │   └── 1.jpg
    ├── paris-dubai/
    │   └── 1.jpg
    └── gibraltar-dubai/
        └── 1.jpg
```

## 🎨 Spécifications recommandées

### Logo
- **Format** : SVG (vectoriel)
- **Couleur** : Blanc (pour contraste sur fond sombre)
- **Dimensions** : Flexible (SVG)

### Images Hero
- **Format** : JPG ou WebP
- **Dimensions** : 1920x1080px minimum
- **Poids** : < 500KB (optimisé)

### Images d'offres
- **Format** : JPG ou WebP
- **Dimensions** : 1200x800px minimum
- **Poids** : < 300KB par image
- **Ratio** : 3:2

### Image placeholder
- **Format** : JPG
- **Dimensions** : 1200x800px
- **Usage** : Affichée quand une offre n'a pas d'image

## 💡 Conseils

1. **Optimisez vos images** avant de les ajouter (compression)
2. **Utilisez WebP** pour de meilleures performances
3. **Nommez les fichiers** de manière cohérente
4. **Respectez les ratios** pour éviter les déformations

## 🔧 Outils recommandés

- **Compression** : TinyPNG, Squoosh
- **Conversion WebP** : Squoosh, Cloudinary
- **Redimensionnement** : Photoshop, GIMP, Canva

---

**Note** : Les images ne sont pas incluses dans le dépôt Git pour des raisons de taille. Ajoutez-les manuellement après le clonage du projet.
