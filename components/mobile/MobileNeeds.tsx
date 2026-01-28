"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Product, products } from "@/data/products";
import MobileProductGrid from "./MobileProductGrid";

interface MobileNeedsProps {
    product: Product;
    viewMode: 'WANTS' | 'NEEDS';
    onToggleMode: (mode: 'WANTS' | 'NEEDS') => void;
    onAddToCart: (product: Product, size: string) => void;
    onProductSelect?: (product: Product, index: number) => void;
}

const sizes = ['S', 'M', 'L', 'XL'];

export default function MobileNeeds({ product, viewMode, onToggleMode, onAddToCart, onProductSelect }: MobileNeedsProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isShaking, setIsShaking] = useState(false);
    const [showStickyBtn, setShowStickyBtn] = useState(true);
    const gridRef = useRef<HTMLDivElement>(null);

    // IntersectionObserver to hide button when grid is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowStickyBtn(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (gridRef.current) {
            observer.observe(gridRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleAddToCart = () => {
        if (!selectedSize) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            return;
        }
        onAddToCart(product, selectedSize);
        setSelectedSize(null);
    };

    const handleProductSelect = (selectedProduct: Product, index: number) => {
        if (onProductSelect) {
            onProductSelect(selectedProduct, index);
        }
    };

    return (
        <div className="h-full w-full max-w-screen bg-white text-black overflow-x-hidden overflow-y-auto">
            {/* Top Toggle */}
            <div className="fixed top-6 left-0 right-0 flex justify-center z-30">
                <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
                    <button
                        onClick={() => onToggleMode('WANTS')}
                        className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${viewMode === 'WANTS'
                                ? 'bg-black text-white'
                                : 'text-gray-500 hover:text-black'
                            }`}
                    >
                        WANTS
                    </button>
                    <button
                        onClick={() => onToggleMode('NEEDS')}
                        className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${viewMode === 'NEEDS'
                                ? 'bg-black text-white'
                                : 'text-gray-500 hover:text-black'
                            }`}
                    >
                        NEEDS
                    </button>
                </div>
            </div>

            {/* Top Right N Logo */}
            <div className="fixed top-6 right-4 z-30">
                <span className="text-black text-2xl font-bold font-[family-name:var(--font-outfit)]">N</span>
            </div>

            {/* Main Content Container */}
            <div className="px-6 pt-20 pb-48">

                {/* Main Product Section - Takes up initial screen */}
                <div className="min-h-[90vh] flex flex-col">

                    {/* 1. Product Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-black tracking-tight text-center uppercase font-[family-name:var(--font-outfit)]"
                    >
                        {product.title}
                    </motion.h1>

                    {/* 2. Hero Product Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex justify-center my-6 flex-1 items-center"
                    >
                        <img
                            src={product.gridThumbnail}
                            alt={product.title}
                            className="w-full max-w-[280px] aspect-square object-contain mx-auto drop-shadow-xl"
                        />
                    </motion.div>

                    {/* 3. Tech Specs - 2x2 Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-2 gap-x-4 gap-y-4 my-6"
                    >
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Material</p>
                            <p className="text-sm font-medium text-black mt-1">{product.specs?.fabric || "100% Cotton"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Weight</p>
                            <p className="text-sm font-medium text-black mt-1">{product.specs?.gsm || "450 GSM"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Fit</p>
                            <p className="text-sm font-medium text-black mt-1">{product.specs?.fit || "Regular"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Origin</p>
                            <p className="text-sm font-medium text-black mt-1">{product.specs?.origin || "Made in India"}</p>
                        </div>
                    </motion.div>

                    {/* 4. Size Selector - With bottom margin for button gap */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-12"
                    >
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-4 text-center">Select Size</p>
                        <motion.div
                            className="flex justify-center gap-3"
                            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-sm font-semibold ${selectedSize === size
                                            ? 'bg-black text-white border-black'
                                            : isShaking
                                                ? 'border-red-400 text-red-400'
                                                : 'border-gray-200 text-black hover:border-black'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </motion.div>
                        {isShaking && (
                            <p className="text-red-500 text-xs text-center mt-3">Please select a size</p>
                        )}
                    </motion.div>
                </div>

                {/* 5. Product Grid - Below the fold */}
                <div ref={gridRef} className="-mx-2">
                    <MobileProductGrid
                        products={products.filter(p => p.id !== product.id)}
                        onProductSelect={handleProductSelect}
                    />
                </div>
            </div>

            {/* Fixed Add to Cart Button - Smart Visibility */}
            <div
                className={`fixed bottom-24 left-4 right-4 z-40 transition-all duration-500 transform ${showStickyBtn
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-20 opacity-0 pointer-events-none'
                    }`}
            >
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-gray-900 text-white py-4 rounded-xl flex items-center justify-between px-6 shadow-2xl hover:bg-black transition-colors"
                >
                    <span className="font-bold tracking-widest text-sm">ADD TO CART</span>
                    <span className="font-bold text-lg">{product.price}</span>
                </button>
            </div>
        </div>
    );
}
