"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

interface MobileGridProps {
    isOpen: boolean;
    onClose: () => void;
    products: Product[];
    onProductSelect: (product: Product, index: number) => void;
}

export default function MobileGrid({ isOpen, onClose, products, onProductSelect }: MobileGridProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-3xl z-50 max-h-[80vh] overflow-hidden"
                    >
                        {/* Handle */}
                        <div className="flex justify-center py-3">
                            <div className="w-12 h-1 bg-gray-600 rounded-full" />
                        </div>

                        {/* Header */}
                        <div className="px-6 pb-4">
                            <h2 className="text-white text-center text-lg font-bold tracking-[0.3em] font-[family-name:var(--font-outfit)]">
                                WANTS AND NEEDS
                            </h2>
                        </div>

                        {/* Grid */}
                        <div className="px-4 pb-8 overflow-y-auto max-h-[60vh]">
                            <div className="grid grid-cols-2 gap-3">
                                {products.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => onProductSelect(product, index)}
                                        className="bg-[#2a2a2a] rounded-xl overflow-hidden cursor-pointer hover:bg-[#333] transition-colors"
                                    >
                                        {/* Product Image */}
                                        <div className="aspect-square bg-[#222] flex items-center justify-center p-4">
                                            <img
                                                src={product.gridThumbnail}
                                                alt={product.title}
                                                className="w-full h-full object-contain opacity-80"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-3">
                                            <h3 className="text-white text-xs font-bold tracking-wide uppercase mb-1 font-[family-name:var(--font-outfit)]">
                                                {product.title}
                                            </h3>
                                            <p className="text-gray-400 text-xs">
                                                {product.price}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
