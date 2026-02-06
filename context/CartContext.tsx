"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { Product } from "@/data/products";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

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
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Flag to prevent saving empty cart on logout
    const skipNextSave = useRef(false);

    // Listen for auth state changes and load cart
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User logged in - load cart from Firestore
                setCurrentUser(user);
                await loadCartFromFirestore(user.uid);
            } else {
                // User logged out - skip saving and clear local cart
                skipNextSave.current = true;
                setCartItems([]);
                setCurrentUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Save cart to Firestore whenever it changes (if user is logged in)
    useEffect(() => {
        // Don't save if we're loading, no user, or flagged to skip
        if (isLoading || !currentUser) return;

        if (skipNextSave.current) {
            skipNextSave.current = false;
            return;
        }

        saveCartToFirestore(currentUser.uid, cartItems);
    }, [cartItems, currentUser, isLoading]);

    // Load cart from Firestore
    const loadCartFromFirestore = async (userId: string) => {
        try {
            const cartRef = doc(db, "carts", userId);
            const cartSnap = await getDoc(cartRef);

            if (cartSnap.exists()) {
                const data = cartSnap.data();
                // Skip saving after loading (we just loaded it, no need to save)
                skipNextSave.current = true;
                setCartItems(data.items || []);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error("Error loading cart:", error);
            setCartItems([]);
        }
    };

    // Save cart to Firestore
    const saveCartToFirestore = async (userId: string, items: CartItem[]) => {
        try {
            const cartRef = doc(db, "carts", userId);
            await setDoc(cartRef, {
                items: items,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error saving cart:", error);
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

    // Calculate cart count
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => {
        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
        return acc + (priceNum * item.quantity);
    }, 0);

    // Clear entire cart (used on logout - clears local only, Firestore preserved)
    const clearCart = () => {
        skipNextSave.current = true;
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
            subtotal,
            isLoading
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
