# ✈️ Airplane Language Transition Animation

## 🎨 What It Does

When users switch between French and English, a beautiful animated airplane flies across the screen before the language changes. This creates a smooth, professional transition that reinforces your aviation brand.

## ✨ Animation Features

### Visual Effects:
1. **Airplane flies across screen** - Left to right, smooth easing
2. **Contrail/trail effect** - White vapor trail behind the plane
3. **Gentle bobbing motion** - Airplane moves up and down slightly (realistic flight)
4. **Glow effect** - Subtle pulsing glow around the airplane
5. **Fade in/out** - Smooth opacity transitions
6. **Slight rotation** - Subtle tilt for dynamic feel

### UI Feedback:
1. **Globe icon rotates** - 360° spin during transition
2. **Buttons disabled** - Can't switch again during animation
3. **Opacity change** - Buttons appear dimmed during transition
4. **Smooth timing** - Language changes mid-flight (when plane is center screen)

## ⏱️ Timing

- **Total animation**: 1.5 seconds
- **Language switches at**: 0.75 seconds (mid-flight)
- **Airplane visible**: Full duration
- **Trail effect**: Fades in/out dynamically

## 🎯 How It Works

### 1. User clicks language button (FR or EN)

### 2. Animation sequence starts:
```
0.0s  → Airplane appears (left side, faded)
0.1s  → Fully visible with trail
0.75s → Language content switches (mid-screen)
1.4s  → Airplane fades out (right side)
1.5s  → Animation complete, buttons re-enabled
```

### 3. During animation:
- Globe icon rotates 360°
- Language buttons are disabled
- Airplane flies with bobbing motion
- Trail effect follows behind

## 🔧 Technical Details

### Components:

**`LanguageTransition.tsx`**
- Main animation component
- Uses Framer Motion for smooth animations
- Airplane icon from Lucide React
- Fixed positioning (z-index: 9999)
- Pointer events disabled (doesn't block clicks)

**`LanguageContext.tsx`**
- Manages animation state (`isAnimating`)
- Triggers animation on language change
- Delays language switch for smooth transition
- Prevents multiple animations at once

**`LanguageSwitcher.tsx`**
- Disables buttons during animation
- Rotates globe icon
- Shows visual feedback (opacity)

## 🎨 Customization Options

### Change Animation Speed

Edit `contexts/LanguageContext.tsx`:

```tsx
// Faster (1 second total)
setTimeout(() => {
  setLanguageState(lang)
  localStorage.setItem('language', lang)
}, 500) // Half duration

setTimeout(() => {
  setIsAnimating(false)
}, 1000) // Full duration
```

Also update `LanguageTransition.tsx`:
```tsx
transition={{ 
  duration: 1.0,  // Match new duration
  ease: 'easeInOut'
}}
```

### Change Airplane Size

Edit `components/common/LanguageTransition.tsx`:

```tsx
<Plane 
  size={64}  // Larger (default: 48)
  className="text-accent"
  strokeWidth={2}
/>
```

### Change Airplane Color

```tsx
<Plane 
  size={48}
  className="text-primary"  // Blue instead of accent
  strokeWidth={2}
/>
```

### Change Flight Path

```tsx
// Diagonal flight
animate={{ 
  x: '110vw', 
  y: '20vh',  // Higher on screen
  opacity: [0, 1, 1, 1, 0]
}}

// Lower flight
animate={{ 
  x: '110vw', 
  y: '80vh',  // Lower on screen
  opacity: [0, 1, 1, 1, 0]
}}
```

### Remove Trail Effect

In `LanguageTransition.tsx`, comment out or remove:

```tsx
{/* Trail/contrail effect */}
<motion.div
  // ... trail code
/>
```

### Change Trail Color

```tsx
className="absolute right-full top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-blue-400/80 origin-right"
```

### Add Sound Effect (Optional)

Install a sound library:
```bash
npm install use-sound
```

Then in `LanguageContext.tsx`:
```tsx
import useSound from 'use-sound'

const [play] = useSound('/sounds/airplane.mp3')

const setLanguage = (lang: Language) => {
  if (lang === language) return
  
  play() // Play sound
  setIsAnimating(true)
  // ... rest of code
}
```

## 🎭 Animation States

### Idle State
- No animation
- Buttons enabled
- Globe icon static

### Animating State
- Airplane visible and moving
- Buttons disabled (opacity: 50%)
- Globe icon rotating
- Language switches mid-flight

### Complete State
- Airplane disappeared
- Buttons re-enabled
- New language active
- Globe icon back to normal

## 🐛 Troubleshooting

### Animation not showing

**Check**: Is Framer Motion installed?
```bash
npm install framer-motion
```

### Animation is choppy

**Solution**: The animation uses GPU acceleration. If still choppy:
1. Reduce airplane size
2. Remove glow effect
3. Simplify trail animation

### Multiple airplanes appearing

**Solution**: This shouldn't happen - the code prevents multiple animations. If it does, check that `isAnimating` state is working correctly.

### Language switches too early/late

**Adjust timing** in `LanguageContext.tsx`:
```tsx
// Switch earlier (0.5s instead of 0.75s)
setTimeout(() => {
  setLanguageState(lang)
  localStorage.setItem('language', lang)
}, 500)
```

## 💡 Design Rationale

### Why an airplane?
- Reinforces your aviation/jet charter brand
- Creates memorable user experience
- Professional and elegant
- Fits the luxury travel theme

### Why 1.5 seconds?
- Long enough to be noticed and appreciated
- Short enough not to annoy users
- Matches typical UI transition standards
- Gives time for smooth language content swap

### Why disable buttons?
- Prevents animation conflicts
- Clear feedback that action is processing
- Professional UX pattern
- Prevents accidental double-clicks

## 🎉 User Experience

Users will see:
1. Click language button
2. Globe spins
3. Airplane flies across screen with trail
4. Content smoothly changes to new language
5. Airplane disappears
6. Ready to use in new language

**Result**: Delightful, branded transition that makes language switching feel premium and intentional.

## 📊 Performance

- **Lightweight**: Uses CSS transforms (GPU accelerated)
- **Smooth**: 60fps animation
- **No layout shift**: Fixed positioning
- **Non-blocking**: Doesn't interfere with page interaction
- **Memory efficient**: Component unmounts after animation

## ✅ Browser Support

Works on all modern browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS/Android)

Uses Framer Motion which handles browser compatibility automatically.

---

**Enjoy your professional airplane transition! ✈️**
