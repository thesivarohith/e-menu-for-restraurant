import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (cartItemId: string, delta: number) => void;
    onRemoveItem: (cartItemId: string) => void;
    onUpdateItemSize: (cartItemId: string, newSize: string) => void;
}

const sizes = ['S', 'M', 'L', 'XL'];

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onUpdateItemSize }: CartDrawerProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    // Calculate subtotal
    const subtotal = items.reduce((acc, item) => {
        // Price string format is "₹2,499" -> remove non-digits
        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
        return acc + (priceNum * item.quantity);
    }, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#111111]/95 z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 flex items-center justify-between border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-outfit)] tracking-tight">
                                YOUR SELECTION ({items.length})
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <span className="text-2xl font-medium text-gray-900">&times;</span>
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-12">
                            {items.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex gap-6">
                                    <div className="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-semibold text-lg text-gray-900 font-[family-name:var(--font-outfit)] tracking-wide">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <div className="relative mb-2">
                                                <button
                                                    onClick={() => setOpenDropdown(openDropdown === item.cartItemId ? null : item.cartItemId)}
                                                    className="flex items-center gap-2 text-[11px] text-gray-700 font-semibold tracking-widest uppercase bg-transparent border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:border-gray-900 hover:text-gray-900 focus:outline-none transition-all duration-200"
                                                >
                                                    <span>SIZE {item.size}</span>
                                                    <motion.svg
                                                        animate={{ rotate: openDropdown === item.cartItemId ? 180 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="w-3 h-3"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </motion.svg>
                                                </button>

                                                <AnimatePresence>
                                                    {openDropdown === item.cartItemId && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            transition={{ duration: 0.15 }}
                                                            className="absolute top-full left-0 mt-2 bg-gray-900 rounded-lg shadow-xl z-50 overflow-hidden min-w-[120px]"
                                                        >
                                                            {sizes.map((size) => (
                                                                <button
                                                                    key={size}
                                                                    onClick={() => {
                                                                        onUpdateItemSize(item.cartItemId, size);
                                                                        setOpenDropdown(null);
                                                                    }}
                                                                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors duration-150 ${item.size === size
                                                                            ? 'bg-white text-gray-900'
                                                                            : 'text-white hover:bg-gray-800'
                                                                        }`}
                                                                >
                                                                    SIZE {size}
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 border border-gray-200 rounded-full px-4 py-2">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                                                    className="text-gray-700 hover:text-black transition-colors font-medium"
                                                >
                                                    &minus;
                                                </button>
                                                <span className="text-sm font-semibold w-4 text-center text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                                                    className="text-gray-700 hover:text-black transition-colors font-medium"
                                                >
                                                    &#43;
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <button
                                                    onClick={() => onRemoveItem(item.cartItemId)}
                                                    className="text-[10px] text-gray-600 underline decoration-gray-400 hover:text-black tracking-widest uppercase mb-1 font-medium"
                                                >
                                                    Remove
                                                </button>
                                                <p className="font-bold text-lg text-gray-900">
                                                    {item.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-8 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-sm text-gray-700 font-semibold">Shipping</span>
                                <span className="text-sm text-gray-900 font-semibold">Calculated at checkout</span>
                            </div>
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-lg font-bold text-gray-900 font-[family-name:var(--font-outfit)]">SUBTOTAL</span>
                                <span className="text-lg font-bold text-gray-900 font-[family-name:var(--font-outfit)]">₹{subtotal.toLocaleString()}</span>
                            </div>

                            <button className="w-full bg-black text-white py-5 text-sm font-bold tracking-[0.2em] hover:bg-gray-900 transition-colors uppercase">
                                Proceed to Checkout
                            </button>

                            <div className="flex justify-center gap-4 mt-6 opacity-30 grayscale">
                                {/* Placeholder Icons for Payment */}
                                <div className="w-8 h-5 bg-gray-400 rounded-sm"></div>
                                <div className="w-8 h-5 bg-gray-400 rounded-sm"></div>
                                <div className="w-8 h-5 bg-gray-400 rounded-sm"></div>
                                <div className="w-8 h-5 bg-gray-400 rounded-sm"></div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
