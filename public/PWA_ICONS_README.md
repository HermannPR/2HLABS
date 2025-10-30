# PWA Icons Required

The PWA (Progressive Web App) is configured and ready, but requires icon files to be added.

## Required Icons:

Place these icon files in the `/public` folder:

1. **pwa-64x64.png** (64x64 pixels)
   - Small app icon for notifications

2. **pwa-192x192.png** (192x192 pixels)
   - Standard app icon for Android

3. **pwa-512x512.png** (512x512 pixels)
   - High-resolution icon for splash screens and app stores

## Icon Design Guidelines:

- **Theme**: Should represent the 2H Labs brand
- **Colors**: Use primary colors (#00e5ff cyan) and (#0a0f1a dark background)
- **Style**: Modern, fitness/training themed
- **Content**: Could feature:
  - 2H Labs logo
  - Abstract representation of "training soul" concept
  - Minimalist fitness/supplement imagery

## Maskable Icon:

The 512x512 icon should work as a "maskable" icon, meaning:
- Important content should be in the center 80% of the image
- The outer 20% may be cropped on some devices
- Use a solid background color

## Tools to Create Icons:

- **Figma/Adobe Illustrator**: Design the icon
- **PWA Asset Generator**: https://github.com/onderceylan/pwa-asset-generator
- **RealFaviconGenerator**: https://realfavicongenerator.net/

## Temporary Solution:

Until custom icons are created, the PWA will use the default favicon.ico.
For production, proper branded icons should be added.

## Testing the PWA:

Once icons are added:
1. Build the app: `npm run build`
2. Serve locally: `npm run preview`
3. Open Chrome DevTools > Application > Manifest
4. Check that all icons load correctly
5. Test "Install App" functionality
