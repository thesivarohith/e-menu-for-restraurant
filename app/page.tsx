"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroSplit from "@/components/HeroSplit";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import BottomNav from "@/components/BottomNav";
import HeaderToggle from "@/components/HeaderToggle";
import NeedsView from "@/components/NeedsView";
import { products } from "@/data/products";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'WANTS' | 'NEEDS'>('WANTS');

  // Scroll Animations
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handleProductClick = (index: number) => {
    setCurrentIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative bg-[#0D0D0D]">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Center Toggle Switch */}
      <HeaderToggle viewMode={viewMode} onToggle={setViewMode} />

      {/* Fixed BottomNav */}
      <BottomNav />

      {/* Needs View Overlay - Synchronized with current product */}
      <NeedsView
        product={products[currentIndex]}
        isVisible={viewMode === 'NEEDS'}
      />

      {/* Fixed Hero Section with Scroll Effects */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="fixed top-0 left-0 w-full h-screen z-0"
      >
        <HeroSplit
          product={products[currentIndex]}
          onVideoEnd={handleVideoEnd}
          isPaused={viewMode === 'NEEDS'}
        />
      </motion.div>

      {/* Spacer for Fixed Hero */}
      <div className="h-screen" />

      {/* Product Grid Section - Slides up over hero */}
      <div className="relative z-10">
        <ProductGrid products={products} onProductClick={handleProductClick} />
      </div>
    </div>
  );
}
