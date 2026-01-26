"use client";

import { motion } from "framer-motion";

interface BottomNavProps {
    showScroll?: boolean;
}

export default function BottomNav({ showScroll = true }: BottomNavProps) {
    return (
        <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="fixed bottom-0 left-0 w-full z-50 px-12 pb-8 flex items-end justify-between pointer-events-none mix-blend-difference text-white"
        >
            {/* Left */}
            <div className="pointer-events-auto cursor-pointer hover:opacity-100 opacity-50 transition-opacity duration-300 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                    <span className="text-[10px] font-bold">N</span>
                </div>
                <span className="text-xs tracking-[0.2em] font-medium uppercase font-sans">
                    Join the Club
                </span>
            </div>

            {/* Center - Scroll Indicator */}
            <div className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300 ${showScroll ? 'opacity-50' : 'opacity-0'}`}>
                <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
                <div className="h-8 w-[1px] bg-white/50" />
            </div>

            {/* Right - Empty for balance or could be removed if no items needed */}
            <div className="pointer-events-none opacity-0">
                {/* Spacer to keep center alignment correct if needed */}
                <span className="text-xs tracking-[0.2em] font-medium uppercase font-sans">
                    Space
                </span>
            </div>
        </motion.nav>
    );
}
