"use client";

import { useRef } from "react";
import { MenuItem } from "@/data/menuItems";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface DishPopupProps {
    item: MenuItem | null;
    onClose: () => void;
}

export default function DishPopup({ item, onClose }: DishPopupProps) {
    const { addToCart } = useCart();
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/85 backdrop-blur-md"
                    />

                    {/* Content Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg max-h-[85vh] bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-[110] w-9 h-9 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Video Section — muted always, no overlay, no mute button */}
                        <div className="relative w-full aspect-[4/3] bg-black overflow-hidden shrink-0">
                            <video
                                ref={videoRef}
                                src={item.videoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-none font-[family-name:var(--font-outfit)]">
                                        {item.title}
                                    </h2>
                                    <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center shrink-0 ${item.type === 'veg' ? 'border-green-500' : 'border-red-500'}`}>
                                        <div className={`w-2 h-2 rounded-full ${item.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    </div>
                                </div>

                                <p className="text-sm text-white/40 font-medium mb-5 leading-relaxed">
                                    {item.description}
                                </p>

                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-base text-white/35 line-through">{item.originalPrice}</span>
                                    <span className="text-2xl font-bold text-white tracking-wider">{item.price}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    addToCart(item);
                                    onClose();
                                }}
                                className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-[0.25em] text-sm hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Add to Table
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
