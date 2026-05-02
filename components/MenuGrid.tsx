"use client";

import { useState } from "react";
import { MenuItem } from "@/data/menuItems";
import { motion, AnimatePresence } from "framer-motion";

interface MenuGridProps {
    items: MenuItem[];
    onItemClick: (item: MenuItem) => void;
}

const CATEGORIES = ["All", "Starters", "Rice & Biryani", "Mains", "Breads", "Sides", "Drinks", "Desserts"];

export default function MenuGrid({ items, onItemClick }: MenuGridProps) {
    const [activeTab, setActiveTab] = useState("All");

    const filteredItems = activeTab === "All"
        ? items
        : items.filter(item => item.category === activeTab);

    return (
        <section className="bg-[#0a0a0a] pt-4 pb-16 px-4 md:px-12 min-h-screen relative z-20">
            {/* Category Tabs */}
            <div className="max-w-[90rem] mx-auto mb-10">
                <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar scroll-smooth">
                    {CATEGORIES.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 border shrink-0 ${
                                activeTab === tab
                                    ? "bg-white text-black border-white"
                                    : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white/80"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dish Grid */}
            <div className="max-w-[90rem] mx-auto">
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.35 }}
                                onClick={() => onItemClick(item)}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#161616]"
                            >
                                {/* Image — top 65% */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={item.gridThumbnail}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient on image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />

                                    {/* Veg/Non-Veg Indicator */}
                                    <div className="absolute top-3 right-3 z-10">
                                        <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${item.type === 'veg' ? 'border-green-500' : 'border-red-500'}`}>
                                            <div className={`w-2.5 h-2.5 rounded-full ${item.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                                        </div>
                                    </div>
                                </div>

                                {/* Info — bottom 35% */}
                                <div className="p-3 md:p-4">
                                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-wide text-white mb-1.5 leading-tight font-[family-name:var(--font-outfit)]">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] md:text-xs text-white/35 line-through">{item.originalPrice}</span>
                                        <span className="text-xs md:text-sm font-bold text-white tracking-wide">{item.price}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
