"use client";

import { motion } from "framer-motion";

export default function BottomNav() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="fixed bottom-0 left-0 w-full z-50 px-12 pb-8 flex items-end justify-between pointer-events-none mix-blend-difference text-white"
        >
            {/* Left */}
            <div className="pointer-events-auto cursor-pointer hover:opacity-100 opacity-50 transition-opacity duration-300">
                <span className="text-xs tracking-[0.2em] font-medium uppercase font-sans">
                    Join the Club
                </span>
            </div>

            {/* Center - Scroll Indicator */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
                <div className="h-8 w-[1px] bg-white/50" />
            </div>

            {/* Right */}
            <div className="pointer-events-auto cursor-pointer hover:opacity-100 opacity-50 transition-opacity duration-300 flex items-center gap-3">
                <span className="text-xs tracking-[0.2em] font-medium uppercase font-sans">
                    View Grid
                </span>
                <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                    <div className="bg-current w-full h-full" />
                    <div className="bg-current w-full h-full" />
                    <div className="bg-current w-full h-full" />
                    <div className="bg-current w-full h-full" />
                </div>
            </div>
        </motion.nav>
    );
}
