'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-black font-['Inter',_sans-serif]">
            {/* Left Panel - Image */}
            <div className="relative hidden h-full w-1/2 overflow-hidden md:block">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    className="h-full w-full"
                >
                    <Image
                        src="/images/login-hero.png"
                        alt="Person in hoodie - urban streetwear style"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/60 pointer-events-none" />
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex h-full w-full items-center bg-black p-8 md:w-1/2 md:p-[60px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto w-full max-w-[480px]"
                >
                    {/* Header Section */}
                    <div className="mb-[30px]">
                        <h1 className="mb-4 text-[48px] font-bold uppercase leading-none tracking-tight text-white">
                            Welcome Back
                        </h1>
                        <p className="text-base font-normal leading-relaxed text-[#888888]">
                            Sign in to access your exclusive member benefits.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="mb-5 space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-[11px] font-semibold tracking-widest text-[#A0A0A0] uppercase">
                                EMAIL
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="email@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-[4px] border border-[#333333] bg-transparent p-4 text-[15px] text-white outline-none transition-all placeholder:text-[#666666] focus:border-white focus:bg-white/5 focus:ring-4 focus:ring-white/5 hover:border-[#A0A0A0]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-[11px] font-semibold tracking-widest text-[#A0A0A0] uppercase">
                                PASSWORD
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-[4px] border border-[#333333] bg-transparent p-4 pr-12 text-[15px] text-white outline-none transition-all placeholder:text-[#666666] focus:border-white focus:bg-white/5 focus:ring-4 focus:ring-white/5 hover:border-[#A0A0A0]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#A0A0A0] transition-colors hover:text-white"
                                    aria-label="Toggle password visibility"
                                >
                                    <div className="relative h-5 w-5">
                                        <AnimatePresence mode="wait">
                                            {showPassword ? (
                                                <motion.svg
                                                    key="eye"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.2 }}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-full w-full"
                                                >
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </motion.svg>
                                            ) : (
                                                <motion.svg
                                                    key="eye-off"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.2 }}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-full w-full"
                                                >
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                    <line x1="1" y1="1" x2="23" y2="23" />
                                                </motion.svg>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-1">
                            <label className="group relative flex cursor-pointer items-center space-x-2 select-none">
                                <div className="relative h-[18px] w-[18px]">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="peer absolute h-full w-full cursor-pointer opacity-0"
                                    />
                                    <div className="h-full w-full rounded-[3px] border border-[#333333] transition-all group-hover:border-white peer-checked:border-white peer-checked:bg-white" />
                                    <span className="material-icons absolute inset-0 hidden text-[14px] text-black peer-checked:flex peer-checked:items-center peer-checked:justify-center">
                                        check
                                    </span>
                                </div>
                                <span className="text-sm text-white">Remember me</span>
                            </label>
                            <Link href="#forgot" className="text-sm text-[#A0A0A0] transition-colors hover:text-white">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative flex w-full items-center justify-center overflow-hidden rounded-[4px] bg-white p-4 text-[14px] font-bold tracking-wider text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)] active:translate-y-0 disabled:opacity-70"
                        >
                            <span className="relative z-10">{isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}</span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-10 flex items-center">
                        <div className="h-[1px] flex-grow bg-[#333333]" />
                        <span className="px-4 text-[11px] font-medium tracking-widest text-[#666666] uppercase">OR SIGN IN WITH</span>
                        <div className="h-[1px] flex-grow bg-[#333333]" />
                    </div>

                    {/* Social Auth */}
                    <div className="mb-10 flex space-x-[15px]">
                        <button className="flex flex-1 items-center justify-center space-x-2 rounded-[4px] border border-[#333333] p-3 transition-all hover:border-white hover:bg-white/5 hover:-translate-y-0.5 active:translate-y-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            <span className="text-sm font-medium text-white">Apple</span>
                        </button>
                        <button className="flex flex-1 items-center justify-center space-x-2 rounded-[4px] border border-[#333333] p-3 transition-all hover:border-white hover:bg-white/5 hover:-translate-y-0.5 active:translate-y-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="text-sm font-medium text-white">Google</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-sm text-[#888888]">
                            Don't have an account?{' '}
                            <Link href="#signup" className="font-bold text-white transition-opacity hover:opacity-80 hover:underline">
                                Join the Inner Circle
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Success Notification */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, x: 400 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 400 }}
                        className="fixed right-5 top-5 z-[1000] flex items-center space-x-3 rounded-lg bg-[#4CAF50]/95 p-4 text-white shadow-lg"
                    >
                        <span className="material-icons">check_circle</span>
                        <div>
                            <div className="font-semibold">Welcome back!</div>
                            <div className="text-[13px] opacity-90">Signed in as {email}</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
