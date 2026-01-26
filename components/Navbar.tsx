import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
    const [activeTab, setActiveTab] = useState<'wants' | 'needs'>('wants');

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-12 py-8 flex items-start justify-between pointer-events-none mix-blend-difference text-white">
            {/* Brand Logo - Top Left */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="pointer-events-auto"
            >
                <h1 className="text-xl font-semibold tracking-[0.1em] font-[family-name:var(--font-outfit)]">
                    WANTS & NEEDS
                </h1>
            </motion.div>

            {/* Center Toggle - Pills */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
            >
                <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
                    <button
                        onClick={() => setActiveTab('wants')}
                        className={`px-8 py-2.5 rounded-full text-[10px] font-medium tracking-[0.2em] transition-all duration-500 ${activeTab === 'wants'
                            ? 'bg-white text-black shadow-lg'
                            : 'text-white/70 hover:text-white'
                            }`}
                    >
                        WANTS
                    </button>
                    <button
                        onClick={() => setActiveTab('needs')}
                        className={`px-8 py-2.5 rounded-full text-[10px] font-medium tracking-[0.2em] transition-all duration-500 ${activeTab === 'needs'
                            ? 'bg-white text-black shadow-lg'
                            : 'text-white/70 hover:text-white'
                            }`}
                    >
                        NEEDS
                    </button>
                </div>
            </motion.div>

            {/* Right - Cart */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="pointer-events-auto font-[family-name:var(--font-outfit)] text-sm font-medium tracking-wide"
            >
                CART (0)
            </motion.div>
        </nav>
    );
}
