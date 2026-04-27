# Nile Business Solutions — Website

Professional bilingual (English/Arabic) corporate website built with HTML, CSS, and vanilla JavaScript.

## Features

- 4 pages: Home, Services, About, Contact
- Bilingual: English & Arabic with full RTL support
- Animated customer logos carousel (infinite scroll)
- Responsive design (mobile, tablet, desktop)
- Smooth scroll animations and stat counters
- Working contact form (frontend validation)
- SEO-friendly with proper meta tags
- Premium consulting aesthetic with Nile BS brand colors

## File Structure

```
nilebs-website/
├── index.html              # Home page
├── services.html           # Services page
├── about.html              # About page
├── contact.html            # Contact page
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── main.js             # Language switcher, animations, form handler
├── locales/
│   └── translations.js     # English & Arabic translations
└── images/
    ├── favicon.svg         # Site favicon
    └── (add your logos)    # Customer logos go here
```

## How to Use

### 1. Open the Website
Simply open `index.html` in any modern web browser, or upload all files to your web hosting service.

### 2. Add Your Customer Logos
Place customer logo images in the `images/` folder, then update the customer carousel in `index.html`.
Find the `<div class="logos-track">` section and replace each `<div class="logo-item">CLIENT X</div>` with:

```html
<div class="logo-item"><img src="images/client-name.png" alt="Client Name"></div>
```

Important: Duplicate every logo (the carousel uses 2x logos for seamless infinite scrolling).

### 3. Update Contact Information
Edit these placeholders in all 4 HTML files:
- Email: `info@nilebs.com`
- Phone: `+966 XX XXX XXXX`
- Address: see `contact.address.value` in `locales/translations.js`

### 4. Update Translations
All text content lives in `locales/translations.js`. Edit the English (`en`) or Arabic (`ar`) values to update content site-wide.

### 5. Customize Brand Colors
Brand colors are defined as CSS variables in `css/style.css` at the top:
```css
--primary: #2E2A78;          /* Deep purple */
--secondary: #C73E9C;        /* Magenta */
```

## Deployment

This is a static website. Upload all files to any web hosting service:
- Shared hosting (cPanel, Bluehost, GoDaddy, Hostinger)
- GitHub Pages (free)
- Netlify (free, drag-and-drop deploy)
- Vercel (free)
- AWS S3 + CloudFront
- Your own server

No build step or server-side processing required.

## Browser Support

Works on all modern browsers:
- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Contact Form

The contact form currently shows an alert on submission (frontend only). To make it actually send emails, you have these options:
1. Use a form service like Formspree, Web3Forms, or Netlify Forms (no backend code needed)
2. Add a backend endpoint (PHP, Node.js, etc.)
3. Connect to your CRM via API

## Credits

Built for Nile Business Solutions
© 2026 — All rights reserved
