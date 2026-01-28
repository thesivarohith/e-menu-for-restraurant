import React, { useState } from "react";
import { Product } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

interface NeedsViewProps {
    product: Product;
    isVisible: boolean;
    onAddToCart: (product: Product, size: string) => void;
}

const sizes = ['S', 'M', 'L', 'XL'];

export default function NeedsView({ product, isVisible, onAddToCart }: NeedsViewProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isShaking, setIsShaking] = useState(false);

    const handleAddToCart = () => {
        if (!selectedSize) {
            // Trigger shake animation
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            return;
        }
        onAddToCart(product, selectedSize);
        setSelectedSize(null); // Reset for next product
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="needs-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-20 bg-white flex flex-col md:flex-row h-screen w-full overflow-hidden"
                >
                    {/* Left Side - Specs & Details */}
                    <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center px-8 lg:px-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="w-full max-w-md"
                        >
                            <h1 className="text-5xl lg:text-7xl font-bold text-black mb-2 tracking-tighter font-[family-name:var(--font-outfit)]">
                                {product.title}
                            </h1>
                            <p className="text-xl text-gray-500 mb-12 font-light tracking-wide font-[family-name:var(--font-inter)]">
                                TECHNICAL SPECIFICATIONS
                            </p>

                            {/* Specs Table */}
                            <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-12">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">GSM</p>
                                    <p className="text-lg text-black font-medium">{product.specs?.gsm || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Fabric</p>
                                    <p className="text-lg text-black font-medium">{product.specs?.fabric || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Fit</p>
                                    <p className="text-lg text-black font-medium">{product.specs?.fit || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Origin</p>
                                    <p className="text-lg text-black font-medium">{product.specs?.origin || "N/A"}</p>
                                </div>
                            </div>

                            {/* Size Selector */}
                            <div className="mb-10">
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">Select Size</p>
                                <motion.div
                                    className="flex gap-4"
                                    animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                                    transition={{ duration: 0.4 }}
                                >
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center font-medium
                                                ${selectedSize === size
                                                    ? 'bg-black text-white border-black'
                                                    : isShaking
                                                        ? 'border-red-500 text-red-500'
                                                        : 'border-gray-200 text-black hover:border-black hover:bg-black hover:text-white'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </motion.div>
                                {isShaking && (
                                    <p className="text-red-500 text-sm mt-2 font-medium">Please select a size</p>
                                )}
                            </div>

                            {/* Action */}
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-black text-white px-10 py-4 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors duration-300"
                                >
                                    ADD TO CART - {product.price}
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side - Static Image */}
                    <div className="w-full md:w-1/2 h-full bg-gray-50 flex items-center justify-center p-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="relative w-full h-full max-h-[80vh] flex items-center justify-center"
                        >
                            <img
                                src={product.gridThumbnail}
                                alt={product.title}
                                className="w-full h-full object-contain mix-blend-multiply"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
