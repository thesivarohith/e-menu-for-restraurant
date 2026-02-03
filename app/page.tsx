"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSplit from "@/components/HeroSplit";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import BottomNav from "@/components/BottomNav";
import HeaderToggle from "@/components/HeaderToggle";
import NeedsView from "@/components/NeedsView";
import CartDrawer from "@/components/CartDrawer";
import SizeModal from "@/components/SizeModal";
import NewsletterPopup from "@/components/NewsletterPopup";
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileMenu from "@/components/mobile/MobileMenu";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'WANTS' | 'NEEDS'>('WANTS');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthToast, setShowAuthToast] = useState(false);

  // Auth context
  const { user } = useAuth();

  // Use global cart context
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    updateItemSize,
    isCartOpen,
    setIsCartOpen,
    cartCount
  } = useCart();

  // Size Modal State
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handleProductClick = (index: number) => {
    setCurrentIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle size selection request from WANTS mode (HeroSplit)
  const handleRequestSizeSelection = (product: Product) => {
    // Auth check
    if (!user) {
      setShowAuthToast(true);
      setTimeout(() => setShowAuthToast(false), 3000);
      return;
    }
    setPendingProduct(product);
    setIsSizeModalOpen(true);
  };

  // Handle size selection from modal
  const handleSizeSelected = (size: string) => {
    if (pendingProduct) {
      addToCart(pendingProduct, size);
      setPendingProduct(null);
    }
  };

  // Handle navigation from burger menu (Desktop)
  const handleDesktopNavigation = (section: string) => {
    setIsMenuOpen(false); // Close menu first

    if (section === 'home') {
      setViewMode('WANTS'); // Go to WANTS view (Hero)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'login') {
      window.location.href = '/login';
    } else {
      // For hoodies/pants, scroll to specific section in the product grid
      setTimeout(() => {
        const sectionId = section === 'hoodies' ? 'desktop-hoodies' : 'desktop-pants';
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <>
      {/* Mobile Layout - Only visible on small screens */}
      <MobileLayout
        initialProduct={products[currentIndex]}
        cartItems={cartItems}
        onAddToCart={addToCart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onUpdateItemSize={updateItemSize}
      />

      {/* Desktop Layout - Hidden on mobile, visible on md+ */}
      <div ref={containerRef} className="relative bg-[#0D0D0D] hidden md:block">
        {/* Size Selection Modal */}
        <SizeModal
          isOpen={isSizeModalOpen}
          onClose={() => {
            setIsSizeModalOpen(false);
            setPendingProduct(null);
          }}
          onSelectSize={handleSizeSelected}
          product={pendingProduct}
        />

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onUpdateItemSize={updateItemSize}
        />

        {/* Unified Menu - Responsive: full-screen on mobile, sidebar on desktop */}
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onNavigate={handleDesktopNavigation}
        />

        {/* Fixed Navbar */}
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          onMenuClick={() => setIsMenuOpen(true)}
          cartCount={cartCount}
        />

        {/* Center Toggle Switch */}
        <HeaderToggle viewMode={viewMode} onToggle={setViewMode} />

        {/* Fixed BottomNav */}
        <BottomNav showScroll={viewMode === 'WANTS'} />

        {/* Needs View Overlay - Synchronized with current product */}
        <NeedsView
          product={products[currentIndex]}
          isVisible={viewMode === 'NEEDS'}
          onAddToCart={addToCart}
        />

        {/* Hero Section - Normal Scroll */}
        <div className="w-full h-screen relative">
          <HeroSplit
            product={products[currentIndex]}
            onVideoEnd={handleVideoEnd}
            isPaused={viewMode === 'NEEDS'}
            onRequestSizeSelection={handleRequestSizeSelection}
          />
        </div>

        {/* Product Grid Section - Normal Scroll */}
        <div className="relative">
          <ProductGrid products={products} onProductClick={handleProductClick} onAddToCart={handleRequestSizeSelection} />
        </div>
      </div>

      {/* Auth Required Toast */}
      <AnimatePresence>
        {showAuthToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-3 rounded-full shadow-xl text-sm font-medium tracking-wide"
          >
            Join the Club to add to cart
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
