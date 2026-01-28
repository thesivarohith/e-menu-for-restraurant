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
import SizeModal from "@/components/SizeModal";
import MobileLayout from "@/components/mobile/MobileLayout";
import { products, Product } from "@/data/products";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'WANTS' | 'NEEDS'>('WANTS');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  // Add to cart with size
  const addToCart = (product: Product, size: string) => {
    setCartItems(prev => {
      // Check for existing item with same product AND size
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Create new item with unique cartItemId
      return [...prev, {
        id: product.id,
        cartItemId: crypto.randomUUID(),
        title: product.title,
        price: product.price,
        image: product.gridThumbnail,
        size: size,
        quantity: 1
      }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // Update item size in cart
  const updateItemSize = (cartItemId: string, newSize: string) => {
    setCartItems(prev => {
      const itemToUpdate = prev.find(item => item.cartItemId === cartItemId);
      if (!itemToUpdate) return prev;

      // Check if there's already an item with the same product and new size
      const existingWithNewSize = prev.find(
        item => item.id === itemToUpdate.id && item.size === newSize && item.cartItemId !== cartItemId
      );

      if (existingWithNewSize) {
        // Merge quantities and remove the updated item
        return prev
          .map(item =>
            item.cartItemId === existingWithNewSize.cartItemId
              ? { ...item, quantity: item.quantity + itemToUpdate.quantity }
              : item
          )
          .filter(item => item.cartItemId !== cartItemId);
      }

      // Just update the size
      return prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, size: newSize } : item
      );
    });
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
            onRequestSizeSelection={handleRequestSizeSelection}
          />
        </div>

        {/* Product Grid Section - Normal Scroll */}
        <div className="relative">
          <ProductGrid products={products} onProductClick={handleProductClick} onAddToCart={handleRequestSizeSelection} />
        </div>
      </div>
    </>
  );
}
