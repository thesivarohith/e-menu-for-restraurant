"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface CartProps {
    whatsappNumber: string;
}

export default function Cart({ whatsappNumber }: CartProps) {
    const { cart, removeFromCart, totalItems, totalPrice } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const handlePlaceOrder = () => {
        const orderText = cart.map(item => `${item.title} - ${item.price}`).join('\n');
        const message = `Hi! I would like to order:\n\n${orderText}\n\nTotal: ₹${totalPrice}\n\nTable No: `;
        window.open(`https://wa.me/0?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <>
            {/* Floating Cart Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: totalItems > 0 ? 1 : 0 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 z-50 w-16 h-16 bg-white text-black rounded-full shadow-2xl flex items-center justify-center group"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white"
                    >
                        {totalItems}
                    </motion.div>
                )}
            </motion.button>

            {/* Cart Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-4"
                    >
                        {/* Backdrop */}
                        <div 
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Cart Sidebar/Modal */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative w-full max-w-md bg-[#111111] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                        >
                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h2 className="text-xl font-bold uppercase tracking-widest text-white">Your Cart</h2>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-white/40 uppercase tracking-widest text-xs">Your cart is empty</p>
                                    </div>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 group">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 shrink-0">
                                                <img src={item.gridThumbnail} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-bold uppercase text-white tracking-wide">{item.title}</h3>
                                                <p className="text-xs text-white/50">{item.price} x {item.quantity}</p>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-white/20 hover:text-red-500 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-6 bg-white/5 border-t border-white/5 space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs uppercase tracking-widest text-white/40">Total Amount</span>
                                    <span className="text-2xl font-bold text-white tracking-widest">₹{totalPrice}</span>
                                </div>
                                <button
                                    disabled={cart.length === 0}
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 disabled:pointer-events-none"
                                >
                                    Place Order
                                </button>
                                <p className="text-center text-[10px] uppercase tracking-widest text-white/20">
                                    Order via WhatsApp
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
