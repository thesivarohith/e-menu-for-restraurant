"use client";

import { motion } from "framer-motion";

interface MobileDockProps {
    viewMode: 'WANTS' | 'NEEDS';
    onGridToggle: () => void;
    onCartToggle: () => void;
    cartCount: number;
}

export default function MobileDock({ viewMode, onGridToggle, onCartToggle, cartCount }: MobileDockProps) {
    const isDark = viewMode === 'WANTS';

    return (
        <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
            <motion.div
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl backdrop-blur-xl transition-all duration-300 ${isDark
                    ? 'bg-[#1a1a1a]/90 border border-white/10'
                    : 'bg-white/90 border border-gray-200 shadow-lg'
                    }`}
                animate={{
                    backgroundColor: isDark ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                }}
            >

                {/* Cart Icon */}
                <button
                    onClick={onCartToggle}
                    className={`p-3 rounded-xl transition-colors relative ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                        }`}
                >
                    <svg
                        className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>

                {/* Mail Icon */}
                <button
                    className={`p-3 rounded-xl transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                        }`}
                >
                    <svg
                        className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </button>

                {/* Menu Icon */}
                <button
                    className={`p-3 rounded-xl transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                        }`}
                >
                    <svg
                        className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </motion.div>
        </motion.div>
    );
}
