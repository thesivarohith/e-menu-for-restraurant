"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { menuItems } from "@/data/menuItems";

interface HeroProps {
    restaurantName: string;
    specialDish: string;
    specialDescription: string;
    specialOriginalPrice: string;
    specialDiscountPrice: string;
    heroVideoUrl: string;
}

export default function Hero({
    restaurantName,
    specialDish,
    specialDescription,
    specialOriginalPrice,
    specialDiscountPrice,
    heroVideoUrl,
}: HeroProps) {
    const { addToCart } = useCart();
    const savings = parseInt(specialOriginalPrice.replace(/[^\d]/g, '')) - parseInt(specialDiscountPrice.replace(/[^\d]/g, ''));

    const handleAddToTable = () => {
        const item = menuItems.find(i => i.title.toUpperCase() === specialDish.toUpperCase());
        if (item) addToCart(item);
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
            {/* Fullscreen Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    className="h-full w-full object-cover opacity-50"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={heroVideoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
            </div>

            {/* Seamless bottom gradient bleed into grid */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />

            {/* Content Overlay */}
            <div className="relative z-10 h-full w-full flex flex-col justify-between items-center text-white px-5 md:px-12 pt-8 pb-0">

                {/* Top Center: Restaurant Name */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-lg md:text-2xl font-bold tracking-[0.4em] uppercase text-center font-[family-name:var(--font-outfit)]">
                        {restaurantName}
                    </h1>
                </motion.div>

                {/* Bottom Left: Special Dish Info */}
                <div className="w-full flex justify-start items-end mb-28 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="max-w-lg"
                    >
                        <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/50 uppercase mb-3 block font-[family-name:var(--font-inter)]">
                            Today&apos;s Special
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95] mb-3 font-[family-name:var(--font-outfit)]">
                            {specialDish}
                        </h2>
                        <p className="text-[10px] md:text-xs tracking-[0.25em] text-white/60 uppercase mb-5 font-[family-name:var(--font-inter)]">
                            {specialDescription}
                        </p>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-sm text-white/40 line-through font-medium">{specialOriginalPrice}</span>
                            <span className="text-xl md:text-2xl font-bold text-white tracking-wider">{specialDiscountPrice}</span>
                            <span className="bg-green-500/90 text-black text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                                Save ₹{savings}
                            </span>
                        </div>
                        <button
                            onClick={handleAddToTable}
                            className="bg-white text-black px-8 py-3.5 rounded-2xl font-black uppercase tracking-[0.25em] text-xs hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Add to Table
                        </button>
                    </motion.div>
                </div>

                {/* Bottom Center: Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-10"
                >
                    <span className="text-[9px] tracking-[0.35em] uppercase font-medium">Scroll</span>
                    <motion.svg
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </motion.svg>
                </motion.div>
            </div>
        </div>
    );
}
