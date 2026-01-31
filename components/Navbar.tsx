import { motion } from "framer-motion";

interface NavbarProps {
    onCartClick?: () => void;
    onMenuClick?: () => void;
    cartCount?: number;
}

export default function Navbar({ onCartClick, onMenuClick, cartCount = 0 }: NavbarProps) {
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

            {/* Right - Icons */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="pointer-events-auto flex items-center gap-8"
            >
                {/* Cart Icon */}
                <button
                    onClick={onCartClick}
                    className="hover:opacity-70 transition-opacity relative"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                            {cartCount}
                        </span>
                    )}
                </button>

                {/* Burger Icon */}
                <button
                    onClick={onMenuClick}
                    className="hover:opacity-70 transition-opacity"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </motion.div>
        </nav>
    );
}
