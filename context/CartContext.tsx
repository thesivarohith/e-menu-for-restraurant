"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
    id: number;
    cartItemId: string;
    title: string;
    price: string;
    image: string;
    size: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, size: string) => void;
    updateQuantity: (cartItemId: string, delta: number) => void;
    removeFromCart: (cartItemId: string) => void;
    updateItemSize: (cartItemId: string, newSize: string) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    cartCount: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

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

    // Calculate cart count
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => {
        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
        return acc + (priceNum * item.quantity);
    }, 0);

    // Clear entire cart (used on logout)
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeFromCart,
            updateItemSize,
            clearCart,
            isCartOpen,
            setIsCartOpen,
            cartCount,
            subtotal
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
