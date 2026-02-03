'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterPopupProps {
    delay?: number; // Delay in ms before showing the popup
}

export default function NewsletterPopup({ delay = 2000 }: NewsletterPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem('hasSeenNewsletterPopup');
            if (!hasSeenPopup) {
                setIsOpen(true);
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenNewsletterPopup', 'true');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setTimeout(() => {
                handleClose();
            }, 2500);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/85 backdrop-blur-md"
                    />

                    {/* Popup Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative grid aspect-video w-full max-w-[1000px] overflow-hidden rounded-xl border border-white/5 bg-black shadow-2xl md:grid-cols-2"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all hover:rotate-90 hover:scale-110 hover:bg-white/20 active:scale-95"
                            aria-label="Close popup"
                        >
                            <span className="material-icons">close</span>
                        </button>

                        {/* Left Panel - Image */}
                        <div className="relative h-full w-full overflow-hidden">
                            <motion.div
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 8, ease: "easeOut" }}
                                className="h-full w-full"
                            >
                                <Image
                                    src="/images/fashion-portrait.jpg"
                                    alt="Modern woman in white tailored blazer"
                                    fill
                                    className="object-cover object-center"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/50 pointer-events-none" />
                        </div>

                        {/* Right Panel - Content */}
                        <div className="flex flex-col justify-center bg-black p-8 md:p-10 lg:p-14">
                            <AnimatePresence mode="wait">
                                {!showSuccess ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="mb-8">
                                            <h2 className="mb-3 text-[32px] font-bold uppercase leading-tight tracking-tight text-white lg:text-[36px]">
                                                Unlock 10% Off
                                            </h2>
                                            <p className="text-[15px] font-light leading-relaxed text-[#A0A0A0]">
                                                First access to new drops, sales, and exclusive events. Join the inner circle.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                                            <input
                                                type="email"
                                                placeholder="Enter your email address"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full rounded-[4px] border border-[#333333] bg-transparent p-4 text-[14px] text-white outline-none transition-all placeholder:text-[#555555] focus:border-white focus:bg-white/5"
                                            />
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group flex w-full items-center justify-center space-x-2 rounded-[4px] bg-white p-4 text-[14px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.3)] active:translate-y-0 disabled:opacity-70"
                                            >
                                                <span>{isSubmitting ? 'JOINING...' : 'CONTINUE'}</span>
                                                {!isSubmitting && (
                                                    <span className="material-icons text-[18px] transition-transform group-hover:translate-x-1">
                                                        arrow_forward
                                                    </span>
                                                )}
                                            </button>
                                        </form>

                                        <div className="relative mb-6 flex items-center">
                                            <div className="h-[1px] flex-grow bg-[#333333]" />
                                            <span className="px-4 text-[10px] font-medium tracking-widest text-[#555555] uppercase">OR LOGIN WITH</span>
                                            <div className="h-[1px] flex-grow bg-[#333333]" />
                                        </div>

                                        <div className="mb-8 flex space-x-3">
                                            <button type="button" className="flex flex-1 items-center justify-center space-x-2 rounded-[4px] border border-[#333333] p-3 text-white transition-all hover:border-white hover:bg-white/5 hover:-translate-y-0.5">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                                </svg>
                                                <span className="text-[13px]">Apple</span>
                                            </button>
                                            <button type="button" className="flex flex-1 items-center justify-center space-x-2 rounded-[4px] border border-[#333333] p-3 text-white transition-all hover:border-white hover:bg-white/5 hover:-translate-y-0.5">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                </svg>
                                                <span className="text-[13px]">Google</span>
                                            </button>
                                        </div>

                                        <p className="text-center text-[10px] uppercase leading-relaxed text-[#555555]">
                                            By signing up, you agree to our <a href="#" className="text-[#A0A0A0] hover:underline">Terms</a> & <a href="#" className="text-[#A0A0A0] hover:underline">Privacy Policy</a>.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center text-center"
                                    >
                                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white">
                                            <span className="material-icons text-[48px]">check_circle</span>
                                        </div>
                                        <h3 className="mb-2 text-[28px] font-bold uppercase text-white">You're In</h3>
                                        <p className="mb-6 text-[#A0A0A0]">
                                            Check your inbox at <span className="text-white font-medium">{email}</span> for your 10% discount code.
                                        </p>
                                        <p className="text-[13px] text-[#555555]">Redirecting you back to the store...</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
