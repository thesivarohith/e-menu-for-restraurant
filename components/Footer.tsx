"use client";

interface FooterProps {
    restaurantName: string;
    tagline: string;
}

export default function Footer({ restaurantName, tagline }: FooterProps) {
    return (
        <footer className="bg-[#0a0a0a] py-20 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                <h2 className="text-xl md:text-2xl font-bold tracking-[0.4em] uppercase text-white mb-4 font-[family-name:var(--font-outfit)]">
                    {restaurantName}
                </h2>
                <p className="text-[10px] md:text-xs tracking-[0.25em] text-white/30 uppercase mb-12 font-[family-name:var(--font-inter)]">
                    {tagline}
                </p>
                <div className="text-[10px] tracking-[0.15em] text-white/15 uppercase">
                    © {new Date().getFullYear()} {restaurantName}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
