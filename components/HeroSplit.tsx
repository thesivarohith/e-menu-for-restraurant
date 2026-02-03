import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { AnimatePresence, motion } from "framer-motion";
import { getOptimizedVideoUrl } from "@/lib/mediaUtils";

interface HeroSplitProps {
    product: Product;
    onVideoEnd: () => void;
    isPaused: boolean;
    onRequestSizeSelection: (product: Product) => void;
}

export default function HeroSplit({ product, onVideoEnd, isPaused, onRequestSizeSelection }: HeroSplitProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isPaused) {
            video.pause();
        } else {
            // Catch the AbortError that occurs when video is removed during play
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    // Ignore AbortError - this happens when the video is removed from DOM
                    if (error.name !== 'AbortError') {
                        console.error('Video play error:', error);
                    }
                });
            }
        }
    }, [isPaused, product.id]);

    return (
        <div className="absolute inset-0 h-screen w-full flex overflow-hidden bg-[#0D0D0D]">
            {/* Left Side - Info */}
            <div className="w-1/2 h-full flex items-center justify-center px-12 lg:px-24 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8, ease: "easeOut" }
                        }}
                        exit={{ opacity: 0, y: -30, transition: { duration: 0.5 } }}
                        className="text-white max-w-xl"
                    >
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        >
                            <motion.h1
                                className="text-4xl lg:text-5xl font-semibold leading-tight mb-6 tracking-wide font-[family-name:var(--font-outfit)]"
                            >
                                {product.title}
                            </motion.h1>

                            <motion.p
                                className="text-sm lg:text-base mb-8 tracking-widest font-light text-white/70 uppercase font-[family-name:var(--font-inter)]"
                            >
                                {product.description}
                            </motion.p>

                            <div className="flex items-center gap-8">
                                {!product.isJoinSlide && (
                                    <motion.div
                                        className="text-lg font-light opacity-60 font-[family-name:var(--font-outfit)]"
                                    >
                                        {product.price}
                                    </motion.div>
                                )}

                                {product.isJoinSlide ? (
                                    <div className="flex flex-col gap-4">
                                        <Link
                                            href="/login"
                                            className="bg-[#ededed] text-[#0D0D0D] px-8 py-3 text-sm font-medium tracking-wide hover:bg-white transition-colors duration-300 w-fit"
                                        >
                                            SIGN IN
                                        </Link>
                                        <p className="text-[10px] tracking-[0.2em] text-white/50 uppercase">
                                            Don't have an account?{' '}
                                            <Link href="/signup" className="text-white font-bold hover:underline underline-offset-4">
                                                Join the Inner Circle
                                            </Link>
                                        </p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => onRequestSizeSelection(product)}
                                        className="bg-[#ededed] text-[#0D0D0D] px-8 py-3 text-sm font-medium tracking-wide hover:bg-white transition-colors duration-300"
                                    >
                                        ADD TO CART
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Right Side - Video */}
            <div className="w-1/2 h-full flex items-center justify-center relative">
                <motion.div
                    className="relative h-[80%] w-[65%] flex items-center justify-center"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 }}
                >
                    <div className="relative w-full h-full overflow-hidden">
                        <video
                            ref={videoRef}
                            key={product.id}
                            className="h-full w-full object-cover opacity-90"
                            autoPlay
                            muted
                            playsInline
                            crossOrigin="anonymous"
                            onEnded={onVideoEnd}
                        >
                            <source src={getOptimizedVideoUrl(product.videoUrl)} type="video/mp4" />
                        </video>
                    </div>

                    {/* Gradient Overlay for Mood */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/20 to-transparent pointer-events-none" />
                </motion.div>
            </div>
        </div>
    );
}
