import { motion } from "framer-motion";

export default function Navbar() {
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
