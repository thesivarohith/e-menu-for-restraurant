"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, products } from "@/data/products";
import MobileWants from "./MobileWants";
import MobileNeeds from "./MobileNeeds";
import MobileGrid from "./MobileGrid";
import MobileDock from "./MobileDock";
import CartDrawer, { CartItem } from "@/components/CartDrawer";

interface MobileLayoutProps {
    initialProduct: Product;
    cartItems: CartItem[];
    onAddToCart: (product: Product, size: string) => void;
    onUpdateQuantity: (cartItemId: string, delta: number) => void;
    onRemoveItem: (cartItemId: string) => void;
    onUpdateItemSize: (cartItemId: string, newSize: string) => void;
}

export default function MobileLayout({
    initialProduct,
    cartItems,
    onAddToCart,
    onUpdateQuantity,
    onRemoveItem,
    onUpdateItemSize
}: MobileLayoutProps) {
    const [viewMode, setViewMode] = useState<'WANTS' | 'NEEDS'>('WANTS');
    const [isGridOpen, setIsGridOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product>(initialProduct);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleProductSelect = (product: Product, index: number) => {
        setCurrentProduct(product);
        setCurrentIndex(index);
        setIsGridOpen(false);
    };

    const handleVideoEnd = () => {
        const nextIndex = (currentIndex + 1) % products.length;
        setCurrentIndex(nextIndex);
        setCurrentProduct(products[nextIndex]);
    };

    return (
        <div className="md:hidden fixed inset-0 z-50">
            {/* Background Container with mode-based color */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    backgroundColor: viewMode === 'WANTS' ? '#000000' : '#FFFFFF'
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Content Layer */}
            <AnimatePresence mode="wait">
                {viewMode === 'WANTS' ? (
                    <motion.div
                        key="wants"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        <MobileWants
                            product={currentProduct}
                            viewMode={viewMode}
                            onToggleMode={setViewMode}
                            onVideoEnd={handleVideoEnd}
                            onProductSelect={handleProductSelect}
                            onAddToCart={onAddToCart}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="needs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        <MobileNeeds
                            product={currentProduct}
                            viewMode={viewMode}
                            onToggleMode={setViewMode}
                            onAddToCart={onAddToCart}
                            onProductSelect={handleProductSelect}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Grid Drawer */}
            <MobileGrid
                isOpen={isGridOpen}
                onClose={() => setIsGridOpen(false)}
                products={products}
                onProductSelect={handleProductSelect}
            />

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cartItems}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
                onUpdateItemSize={onUpdateItemSize}
            />

            {/* Bottom Dock */}
            <MobileDock
                viewMode={viewMode}
                onGridToggle={() => setIsGridOpen(!isGridOpen)}
                onCartToggle={() => setIsCartOpen(!isCartOpen)}
                cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            />
        </div>
    );
}
