"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import MenuGrid from "@/components/MenuGrid";
import DishPopup from "@/components/DishPopup";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import { menuItems, MenuItem } from "@/data/menuItems";

export default function Home() {
  const RESTAURANT_NAME = "SUVAI";
  const RESTAURANT_TAGLINE = "CRAFTED WITH FIRE. SERVED WITH SOUL.";
  const WHATSAPP_NUMBER = "91XXXXXXXXXX";

  // Mutton Biryani hero video from urls.txt
  const HERO_VIDEO = "https://res.cloudinary.com/darbjeyc2/video/upload/v1777700104/Mutton_biryani_lifted_with_spoon_202605020952_k9cyrw.mp4";

  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  return (
    <main className="relative bg-[#0a0a0a] min-h-screen">
      <Hero
        restaurantName={RESTAURANT_NAME}
        specialDish="MUTTON BIRYANI"
        specialDescription="SLOW COOKED WITH WHOLE SPICES"
        specialOriginalPrice="₹399"
        specialDiscountPrice="₹349"
        heroVideoUrl={HERO_VIDEO}
      />

      <MenuGrid
        items={menuItems}
        onItemClick={(item) => setSelectedDish(item)}
      />

      <DishPopup
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
      />

      <Cart whatsappNumber={WHATSAPP_NUMBER} />

      <Footer restaurantName={RESTAURANT_NAME} tagline={RESTAURANT_TAGLINE} />
    </main>
  );
}
