import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

export interface CartItem {
    id: number;
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
    onUpdateQuantity: (id: number, delta: number) => void;
    onRemoveItem: (id: number) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
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
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 flex items-center justify-between border-b border-gray-100">
                            <h2 className="text-2xl font-bold font-[family-name:var(--font-outfit)] tracking-tight">
                                YOUR SELECTION ({items.length})
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <span className="text-2xl font-light">&times;</span>
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
                                                <h3 className="font-bold text-lg font-[family-name:var(--font-outfit)] tracking-wide">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className="text-xs text-gray-400 font-medium tracking-widest uppercase mb-4">
                                                SIZE {item.size}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 border border-gray-200 rounded-full px-4 py-2">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                                    className="text-gray-400 hover:text-black transition-colors"
                                                >
                                                    &minus;
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                                    className="text-gray-400 hover:text-black transition-colors"
                                                >
                                                    &#43;
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <button
                                                    onClick={() => onRemoveItem(item.id)}
                                                    className="text-[10px] text-gray-400 underline decoration-gray-300 hover:text-black tracking-widest uppercase mb-1"
                                                >
                                                    Remove
                                                </button>
                                                <p className="font-bold text-lg">
                                                    {item.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-8 bg-gray-50/50 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-sm text-gray-500 font-medium">Shipping</span>
                                <span className="text-sm text-black font-medium">Calculated at checkout</span>
                            </div>
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-lg font-bold font-[family-name:var(--font-outfit)]">SUBTOTAL</span>
                                <span className="text-lg font-bold font-[family-name:var(--font-outfit)]">₹{subtotal.toLocaleString()}</span>
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
