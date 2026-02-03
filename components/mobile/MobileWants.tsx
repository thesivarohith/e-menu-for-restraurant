"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Product, products } from "@/data/products";
import { getOptimizedVideoUrl } from "@/lib/mediaUtils";
import MobileProductGrid from "./MobileProductGrid";
import SizeModal from "@/components/SizeModal";

interface MobileWantsProps {
    product: Product;
    viewMode: 'WANTS' | 'NEEDS';
    onToggleMode: (mode: 'WANTS' | 'NEEDS') => void;
    onVideoEnd: () => void;
    onProductSelect?: (product: Product, index: number) => void;
    onAddToCart?: (product: Product, size: string) => void;
}

export default function MobileWants({ product, viewMode, onToggleMode, onVideoEnd, onProductSelect, onAddToCart }: MobileWantsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [modalProduct, setModalProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, [product]);

    // Hide Add to Cart button when scrolling to grid
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsButtonVisible(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (gridRef.current) {
            observer.observe(gridRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleProductSelect = (selectedProduct: Product, index: number) => {
        if (onProductSelect) {
            onProductSelect(selectedProduct, index);
        }
        // Scroll to top smoothly when a product is selected
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddToCart = () => {
        // 📸 Capture the product snapshot at the moment of click
        setModalProduct(product);
    };

    const handleSizeSelect = (size: string) => {
        if (onAddToCart && modalProduct) {
            // ✅ Use the frozen snapshot, not the current product
            onAddToCart(modalProduct, size);
        }
        setModalProduct(null);
    };

    return (
        <div ref={scrollContainerRef} className="h-full w-full bg-black overflow-x-hidden overflow-y-auto">
            {/* Hero Video Section */}
            <div className="h-screen w-full relative">
                {/* Full-screen Video */}
                <video
                    ref={videoRef}
                    src={getOptimizedVideoUrl(product.videoUrl)}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    loop={false}
                    onEnded={onVideoEnd}
                />

                {/* Top Toggle */}
                <div className="fixed top-6 left-0 right-0 flex justify-center z-30">
                    <div className="flex items-center bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full p-1">
                        <button
                            onClick={() => onToggleMode('WANTS')}
                            className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${viewMode === 'WANTS'
                                ? 'bg-white text-black shadow-lg'
                                : 'text-white/70 hover:text-white'
                                }`}
                        >
                            WANTS
                        </button>
                        <button
                            onClick={() => onToggleMode('NEEDS')}
                            className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${viewMode === 'NEEDS'
                                ? 'bg-white text-black shadow-lg'
                                : 'text-white/70 hover:text-white'
                                }`}
                        >
                            NEEDS
                        </button>
                    </div>
                </div>

                {/* Top Right W Logo */}
                <div className="fixed top-6 right-4 z-30">
                    <span className="text-white text-2xl font-bold font-[family-name:var(--font-outfit)]">W</span>
                </div>

                {/* Bottom Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

                {/* Product Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="absolute bottom-48 left-6 z-20"
                >
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2 font-[family-name:var(--font-outfit)] uppercase">
                        {product.title}
                    </h1>
                    <p className="text-xl text-white/90 font-medium mb-2">
                        {product.price}
                    </p>
                </motion.div>

                {/* Add to Cart Button - Floating Glass Design */}
                <div
                    className={`absolute bottom-28 left-4 right-4 z-20 transition-all duration-300 ${isButtonVisible
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-full opacity-0 pointer-events-none'
                        }`}
                >
                    {product.isJoinSlide ? (
                        <Link
                            href="/login"
                            className="flex items-center justify-center w-full backdrop-blur-md bg-white text-black py-4 rounded-sm font-bold tracking-widest text-sm uppercase transition-all duration-500 hover:bg-white/90"
                        >
                            SIGN IN / JOIN THE CLUB
                        </Link>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="w-full backdrop-blur-md bg-white/10 border border-white/20 text-white py-4 rounded-sm font-bold tracking-widest text-sm uppercase hover:bg-white hover:text-black transition-all duration-500"
                        >
                            ADD TO CART
                        </button>
                    )}
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center"
                    >
                        <span className="text-white/50 text-xs tracking-wider mb-2">SCROLL</span>
                        <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>

            {/* Product Grid Section - Below the fold */}
            <div ref={gridRef} className="bg-[#0a0a0a] px-2 pt-12 pb-44">
                <MobileProductGrid
                    products={products.filter(p => p.id !== product.id)}
                    onProductSelect={handleProductSelect}
                    darkMode
                />
            </div>
            {/* Size Modal - Uses frozen snapshot */}
            <SizeModal
                isOpen={modalProduct !== null}
                onClose={() => setModalProduct(null)}
                onSelectSize={handleSizeSelect}
                product={modalProduct}
            />
        </div>
    );
}
