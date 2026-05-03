#  ZUVAI — Premium Restaurant E-Menu

A cinematic, mobile-first digital menu web app built for modern restaurants. Customers scan a QR code at their table, browse dishes through a stunning dark-themed UI with video previews, and place orders directly from their phone.

**Live Demo:** [zuvai.web.app](https://zuvai.web.app)

---

##  Features

-  **Hero video section** — fullscreen looping video of today's special with discount pricing
-  **Tab-based filtering** — filter by Starters, Biryani, Mains, Breads, Sides, Drinks, Desserts
-  **Video popup per dish** — tap any dish to see a cinematic video preview with full details
-  **Veg / Non-veg indicators** — instantly visible on every card
-  **Add to Table cart** — add multiple dishes, view order summary
-  **In-app order confirmation** — premium order flow with table number input
-  **Cloudinary media** — all images and videos served via Cloudinary CDN
-  **Mobile first** — designed for phone screens, QR scan use case

---

##  Preview

| Hero Section | Menu Grid | Dish Popup |
|---|---|---|
| Fullscreen video, today's special | 2-col dark grid with veg/non-veg dots | 85% screen video popup with Add to Table |

---

##  Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

---

##  Getting Started

```bash
git clone https://github.com/thesivarohith/e-menu-for-restraurant.git
cd e-menu-for-restraurant
npm install
npm run dev
```

---

##  Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Fullscreen video hero section
│   ├── TabFilter.tsx     # Category tab bar
│   ├── MenuGrid.tsx      # 2-column dish grid
│   ├── DishPopup.tsx     # Video popup with add to table
│   ├── Cart.tsx          # Cart summary overlay
│   └── OrderConfirm.tsx  # Order confirmation screen
├── data/
│   └── dishes.ts         # All 20 dishes with Cloudinary URLs
└── App.tsx
```

---

##  Menu Categories

20 dishes across 7 categories:

| Category | Dishes |
|----------|--------|
| Starters | Crispy Chicken Popcorn, Paneer Tikka, Masala Fries, Chicken 65 |
| Rice & Biryani | Chicken Biryani, Egg Fried Rice, Veg Biryani, Mutton Biryani |
| Mains | Butter Chicken, Paneer Butter Masala, Chicken Chettinad Curry |
| Breads | Garlic Naan, Parotta |
| Sides | Raita, Onion Salad |
| Drinks | Mango Lassi, Masala Chai, Fresh Lime Soda |
| Desserts | Gulab Jamun, Kulfi |

---

##  Customizing for a Real Restaurant

1. Replace `ZUVAI` with the restaurant name in `App.tsx`
2. Update today's special dish and video in `Hero.tsx`
3. Update all dish data in `dishes.ts`
4. Upload media to Cloudinary and update URLs
5. Replace order confirmation with WhatsApp redirect using restaurant's number:
```js
window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`)
```
6. Deploy to Firebase or Vercel

---

##  Author

**Siva Rohith** — [GitHub](https://github.com/thesivarohith) • [LinkedIn](https://linkedin.com/in/sivarohith)
