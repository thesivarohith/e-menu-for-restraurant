"use client";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (section: string) => void;
}

export default function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
    const menuItems = [
        { label: "JOIN THE CLUB", section: "login" },
        { label: "HOME", section: "home" },
        { label: "HOODIES", section: "hoodies" },
        { label: "SWEATPANTS", section: "pants" },
    ];

    const secondaryItems = [
        { icon: "user", label: "MY ACCOUNT" },
        { icon: "package", label: "ORDER TRACKING" },
        { icon: "support", label: "CONTACT OR SUPPORT" },
    ];

    return (
        // Unified Container - Always rendered, visibility controlled by CSS
        <div
            className={`fixed inset-0 z-[100] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
        >
            {/* Backdrop - Fade In/Out, blur on mobile only */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm md:backdrop-blur-none transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            {/* Panel - Full width on mobile, sidebar on desktop */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute right-0 top-0 h-full w-full md:w-[450px] bg-black md:border-l md:border-white/10 md:shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Close Button - Animated */}
                <button
                    onClick={onClose}
                    className={`absolute top-6 right-6 md:top-8 md:right-8 p-2 text-white/60 hover:text-white transition-all duration-300 z-10 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                        }`}
                    style={{ transitionDelay: isOpen ? '150ms' : '0ms' }}
                    aria-label="Close menu"
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Main Navigation */}
                <div className="flex-1 flex flex-col justify-center px-8 md:px-12">
                    <nav className="space-y-2 md:space-y-4">
                        {menuItems.map((item, index) => (
                            <button
                                key={item.section}
                                onClick={() => onNavigate(item.section)}
                                className={`block text-left w-full group transition-all duration-500 ${isOpen
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-12'
                                    }`}
                                style={{
                                    transitionDelay: isOpen ? `${100 + index * 60}ms` : '0ms'
                                }}
                            >
                                <span className="text-white font-black text-5xl tracking-tight group-hover:text-white/70 group-active:text-white/70 transition-colors inline-block group-hover:translate-x-2 duration-200">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </nav>

                    {/* Divider - Animated */}
                    <div
                        className={`h-[2px] bg-white/20 my-10 md:my-12 origin-left transition-all duration-300 ${isOpen ? 'w-12 md:w-16 opacity-100 scale-x-100' : 'w-0 opacity-0 scale-x-0'
                            }`}
                        style={{ transitionDelay: isOpen ? '280ms' : '0ms' }}
                    />

                    {/* Secondary Links - Animated */}
                    <div
                        className={`space-y-5 md:space-y-6 transition-all duration-400 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        style={{ transitionDelay: isOpen ? '350ms' : '0ms' }}
                    >
                        {secondaryItems.map((item, index) => (
                            <button
                                key={item.label}
                                className={`flex items-center gap-4 text-white/50 hover:text-white active:text-white transition-all duration-300 hover:translate-x-1 ${isOpen ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{ transitionDelay: isOpen ? `${380 + index * 40}ms` : '0ms' }}
                            >
                                {item.icon === "user" && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                )}
                                {item.icon === "package" && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                )}
                                {item.icon === "support" && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                )}
                                <span className="text-xs font-medium tracking-[0.2em]">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer - Animated */}
                <div
                    className={`px-8 md:px-12 pb-10 md:pb-12 transition-all duration-400 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}
                    style={{ transitionDelay: isOpen ? '450ms' : '0ms' }}
                >
                    {/* Social Links */}
                    <div className="flex items-center gap-6 md:gap-8 mb-6">
                        <a
                            href="#"
                            className="text-white/50 hover:text-white text-xs font-medium tracking-[0.15em] transition-colors"
                        >
                            INSTAGRAM
                        </a>
                        <a
                            href="#"
                            className="text-white/50 hover:text-white text-xs font-medium tracking-[0.15em] transition-colors"
                        >
                            TIKTOK
                        </a>
                        <a
                            href="#"
                            className="text-white/50 hover:text-white text-xs font-medium tracking-[0.15em] transition-colors ml-auto"
                        >
                            LOG OUT
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-white/30 text-[10px] tracking-wide">
                        <p>© 2024 WANTS AND NEEDS.</p>
                        <p className="mt-1">
                            <a href="#" className="hover:text-white/50 transition-colors">PRIVACY</a>
                            <span className="mx-2">·</span>
                            <a href="#" className="hover:text-white/50 transition-colors">TERMS</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
