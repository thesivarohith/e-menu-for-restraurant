"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface BottomNavProps {
    showScroll?: boolean;
}

export default function BottomNav({ showScroll = true }: BottomNavProps) {
    const { user, loading } = useAuth();

    return (
        <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="fixed bottom-0 left-0 w-full z-50 px-12 pb-8 flex items-end justify-between pointer-events-none mix-blend-difference text-white"
        >
            {/* Left - Join the Club / View Profile Link */}
            <Link
                href={user ? "/checkout" : "/login"}
                className="pointer-events-auto cursor-pointer hover:opacity-100 opacity-50 transition-opacity duration-300 flex items-center gap-3"
            >
                {!loading && user ? (
                    <>
                        {/* Profile Icon */}
                        <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <span className="text-xs tracking-[0.2em] font-medium uppercase font-sans">
                            View Profile
                        </span>
                    </>
                ) : (
                    <>
                        <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                            <span className="text-[10px] font-bold">N</span>
                        </div>
                        <span className="text-xs tracking-[0.2em] font-medium uppercase font-sans">
                            Join the Club
                        </span>
                    </>
                )}
            </Link>

            {/* Center - Scroll Indicator */}
            <div className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300 ${showScroll ? 'opacity-50' : 'opacity-0'}`}>
                <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
                <div className="h-8 w-[1px] bg-white/50" />
            </div>

            {/* Right - Empty for balance or could be removed if no items needed */}
            <div className="pointer-events-none opacity-0">
                {/* Spacer to keep center alignment correct if needed */}
                <span className="text-xs tracking-[0.2em] font-medium uppercase font-sans">
                    Space
                </span>
            </div>
        </motion.nav>
    );
}
