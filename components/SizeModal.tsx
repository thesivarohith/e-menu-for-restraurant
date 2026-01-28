import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

interface SizeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectSize: (size: string) => void;
    product: Product | null;
}

const sizes = ['S', 'M', 'L', 'XL'];

export default function SizeModal({ isOpen, onClose, onSelectSize, product }: SizeModalProps) {
    const handleSizeClick = (size: string) => {
        onSelectSize(size);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && product && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#111111]/90 z-[80]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[90] flex items-center justify-center p-4"
                    >
                        <div className="bg-white/95 rounded-3xl p-10 max-w-md w-full shadow-2xl border border-white/20">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-outfit)] tracking-tight mb-2">
                                    SELECT SIZE
                                </h3>
                                <p className="text-sm text-gray-600 font-medium">
                                    {product.title}
                                </p>
                            </div>

                            {/* Size Buttons */}
                            <div className="flex justify-center gap-4 mb-8">
                                {sizes.map((size) => (
                                    <motion.button
                                        key={size}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleSizeClick(size)}
                                        className="w-16 h-16 rounded-full bg-gray-100 text-gray-900 font-bold text-lg 
                                                   hover:bg-black hover:text-white 
                                                   transition-colors duration-300 
                                                   flex items-center justify-center
                                                   border-2 border-transparent hover:border-black"
                                    >
                                        {size}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Cancel */}
                            <button
                                onClick={onClose}
                                className="w-full py-3 text-sm text-gray-500 font-medium hover:text-gray-900 transition-colors tracking-widest uppercase"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
