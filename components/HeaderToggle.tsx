import { motion } from "framer-motion";

interface HeaderToggleProps {
    viewMode: 'WANTS' | 'NEEDS';
    onToggle: (mode: 'WANTS' | 'NEEDS') => void;
}

export default function HeaderToggle({ viewMode, onToggle }: HeaderToggleProps) {
    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 mix-blend-difference pointer-events-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <div className="flex bg-[#111111]/95 rounded-full p-1 border border-white/10">
                    <button
                        onClick={() => onToggle('WANTS')}
                        className={`px-8 py-2.5 rounded-full text-[10px] font-medium tracking-[0.2em] transition-all duration-500 ${viewMode === 'WANTS'
                            ? 'bg-white text-black shadow-lg'
                            : 'text-white/70 hover:text-white'
                            }`}
                    >
                        WANTS
                    </button>
                    <button
                        onClick={() => onToggle('NEEDS')}
                        className={`px-8 py-2.5 rounded-full text-[10px] font-medium tracking-[0.2em] transition-all duration-500 ${viewMode === 'NEEDS'
                            ? 'bg-white text-black shadow-lg'
                            : 'text-white/70 hover:text-white'
                            }`}
                    >
                        NEEDS
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
