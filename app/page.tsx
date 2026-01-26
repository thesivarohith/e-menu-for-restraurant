"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import HeroSplit from "@/components/HeroSplit";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import BottomNav from "@/components/BottomNav";
import HeaderToggle from "@/components/HeaderToggle";
import NeedsView from "@/components/NeedsView";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import { products, Product } from "@/data/products";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'WANTS' | 'NEEDS'>('WANTS');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handleProductClick = (index: number) => {
    setCurrentIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.gridThumbnail,
        size: "M", // Default for now
        quantity: 1
      }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div ref={containerRef} className="relative bg-[#0D0D0D]">
      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      {/* Fixed Navbar */}
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
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
          onAddToCart={addToCart}
        />
      </div>

      {/* Product Grid Section - Normal Scroll */}
      <div className="relative">
        <ProductGrid products={products} onProductClick={handleProductClick} />
      </div>
    </div>
  );
}
