# SUVAI — Restaurant Digital Menu

A premium dark-themed restaurant digital menu built with Next.js, React, and Framer Motion. Customers can browse the menu, view dish videos, add items to their table, and place orders via WhatsApp.

## Features

- **Fullscreen Hero** — Looping video with Today's Special, strikethrough pricing, and "Add to Table" CTA
- **Category Tabs** — Filter dishes by Starters, Rice & Biryani, Mains, Breads, Sides, Drinks, Desserts
- **Dish Cards** — Real food photography from Cloudinary, veg/non-veg indicators, discount pricing
- **Dish Popup** — Tap any card to see a looping video with full details and "Add to Table" button
- **Cart & WhatsApp Ordering** — Floating cart icon, order summary, and one-tap WhatsApp order
- **Mobile First** — Fully responsive, optimized for phones

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19, Framer Motion
- **Styling**: Tailwind CSS 4
- **Media**: Cloudinary (images & videos)
- **Fonts**: Google Fonts (Outfit + Inter)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── page.tsx          # Main page (Hero + Grid + Popup + Cart + Footer)
├── layout.tsx        # Root layout with fonts and CartProvider
└── globals.css       # Dark theme + utilities
components/
├── Hero.tsx          # Fullscreen video hero with Today's Special
├── MenuGrid.tsx      # Category tabs + dish card grid
├── DishPopup.tsx     # Full-screen dish detail popup with video
├── Cart.tsx          # Floating cart button + order summary + WhatsApp
└── Footer.tsx        # Restaurant branding footer
context/
└── CartContext.tsx    # Cart state management
data/
└── menuItems.ts      # All 20 dishes with Cloudinary URLs
```

## Configuration

Update these constants in `app/page.tsx`:

| Variable | Description |
|----------|-------------|
| `RESTAURANT_NAME` | Restaurant name shown in hero and footer |
| `RESTAURANT_TAGLINE` | Footer tagline |
| `HERO_VIDEO` | Cloudinary video URL for hero background |
| `WHATSAPP_NUMBER` | WhatsApp number for orders (currently demo) |

## License

MIT
