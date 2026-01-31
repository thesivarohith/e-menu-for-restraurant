"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

// Address Interface
interface Address {
    id: string;
    label: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
}

// Initial address for demo
const initialAddresses: Address[] = [
    {
        id: "1",
        label: "HOME",
        name: "John Doe",
        street: "123 Fashion Ave, Apt 4B",
        city: "New York",
        state: "NY",
        zip: "10012",
        country: "United States",
        phone: "+1 (555) 019-2834",
    },
];

// Address Card Component
function AddressCard({
    address,
    isSelected,
    onSelect,
    onEdit,
}: {
    address: Address;
    isSelected: boolean;
    onSelect: () => void;
    onEdit: () => void;
}) {
    return (
        <motion.div
            onClick={onSelect}
            whileTap={{ scale: 0.995 }}
            className={`relative p-5 rounded-xl cursor-pointer transition-all duration-300 ${isSelected
                ? "border-2 border-black bg-white"
                : "border border-gray-200 bg-white hover:border-gray-300"
                }`}
        >
            <div className="flex items-start gap-4">
                {/* Radio Button */}
                <div className="mt-1 flex-shrink-0">
                    <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-black" : "border-gray-300"
                            }`}
                    >
                        {isSelected && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2.5 h-2.5 rounded-full bg-black"
                            />
                        )}
                    </div>
                </div>

                {/* Address Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                        <span
                            className={`text-sm font-bold uppercase tracking-wider ${isSelected ? "text-black" : "text-gray-500"
                                }`}
                        >
                            {address.label}
                        </span>
                        {isSelected && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit();
                                }}
                                className="text-xs font-semibold uppercase tracking-widest text-black hover:underline"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                    <p
                        className={`font-semibold mb-1 ${isSelected ? "text-black" : "text-gray-600"
                            }`}
                    >
                        {address.name}
                    </p>
                    <p
                        className={`text-sm leading-relaxed ${isSelected ? "text-gray-600" : "text-gray-400"
                            }`}
                    >
                        {address.street}
                        <br />
                        {address.city}, {address.state} {address.zip}
                        <br />
                        {address.country}
                    </p>
                    {address.phone && isSelected && (
                        <p className="text-sm text-blue-600 mt-2">{address.phone}</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// Address Form Component
function AddressForm({
    address,
    onSave,
    onCancel,
}: {
    address: Address | null;
    onSave: (address: Address) => void;
    onCancel: () => void;
}) {
    const [formData, setFormData] = useState<Omit<Address, 'id'>>({
        label: address?.label || "",
        name: address?.name || "",
        street: address?.street || "",
        city: address?.city || "",
        state: address?.state || "",
        zip: address?.zip || "",
        country: address?.country || "United States",
        phone: address?.phone || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: address?.id || crypto.randomUUID(),
            ...formData,
        });
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="space-y-4 bg-gray-50 p-6 rounded-xl"
        >
            <h3 className="text-lg font-bold mb-4">
                {address ? "Edit Address" : "Add New Address"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Label
                    </label>
                    <input
                        type="text"
                        value={formData.label}
                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                        placeholder="e.g., Home, Office"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                        required
                    />
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Street Address
                </label>
                <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder="123 Fashion Ave, Apt 4B"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                    required
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="New York"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        State
                    </label>
                    <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="NY"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        ZIP Code
                    </label>
                    <input
                        type="text"
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        placeholder="10012"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Phone Number
                </label>
                <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                    required
                />
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-3 border border-gray-200 rounded-lg font-semibold text-sm uppercase tracking-widest hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 py-3 bg-black text-white rounded-lg font-semibold text-sm uppercase tracking-widest hover:bg-gray-900 transition-colors"
                >
                    Save Address
                </button>
            </div>
        </motion.form>
    );
}

// Order Summary Component
function OrderSummary({ isCollapsible = false }: { isCollapsible?: boolean }) {
    const { cartItems, subtotal } = useCart();
    const [isExpanded, setIsExpanded] = useState(!isCollapsible);

    // Calculate shipping (Free if subtotal > 2000)
    const shippingCost = subtotal > 2000 ? 0 : 150;
    const total = subtotal + shippingCost;

    return (
        <div className="bg-gray-50 lg:bg-white rounded-2xl lg:rounded-none p-6 lg:p-0">
            {/* Header */}
            <div
                className={`flex items-center justify-between ${isCollapsible ? "cursor-pointer" : ""}`}
                onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
            >
                <h2 className="text-lg lg:text-xl font-bold tracking-tight font-[family-name:var(--font-outfit)]">
                    YOUR ORDER{" "}
                    <span className="text-gray-400 font-normal">({cartItems.length})</span>
                </h2>
                {isCollapsible && (
                    <motion.svg
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                )}
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        {/* Product List */}
                        <div className="mt-6 space-y-4">
                            {cartItems.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.cartItemId} className="flex gap-4">
                                        {/* Thumbnail */}
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm text-black">{item.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right">
                                            <span className="font-semibold text-sm">{item.price}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-6" />

                        {/* Totals */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                {shippingCost === 0 ? (
                                    <span className="bg-black text-white text-xs font-bold px-2.5 py-1 rounded">
                                        FREE
                                    </span>
                                ) : (
                                    <span className="font-medium">₹{shippingCost}</span>
                                )}
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Taxes</span>
                                <span className="text-gray-400 text-xs">Calculated next step</span>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-baseline pt-4 border-t border-gray-200">
                                <span className="font-semibold">Total</span>
                                <div className="text-right">
                                    <span className="text-xs text-gray-400 mr-2">INR</span>
                                    <span className="text-2xl font-bold">₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Main Checkout Page
export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, subtotal } = useCart();

    // Address State
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [selectedAddressId, setSelectedAddressId] = useState(initialAddresses[0].id);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    // Calculate shipping and total
    const shippingCost = subtotal > 2000 ? 0 : 150;
    const total = subtotal + shippingCost;

    // Handle save address
    const handleSaveAddress = (address: Address) => {
        if (editingAddress) {
            // Update existing
            setAddresses(prev => prev.map(a => a.id === address.id ? address : a));
        } else {
            // Add new
            setAddresses(prev => [...prev, address]);
        }
        setSelectedAddressId(address.id);
        setIsFormOpen(false);
        setEditingAddress(null);
    };

    // Handle edit
    const handleEdit = (address: Address) => {
        setEditingAddress(address);
        setIsFormOpen(true);
    };

    // Handle add new
    const handleAddNew = () => {
        setEditingAddress(null);
        setIsFormOpen(true);
    };

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0) {
            // Allow a brief moment for context to hydrate
            const timer = setTimeout(() => {
                if (cartItems.length === 0) {
                    // Don't redirect, just show empty state
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [cartItems, router]);

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="border-b border-gray-100">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
                    <div className="flex items-center justify-between">
                        {/* Mobile: Back Arrow + Title */}
                        <div className="flex items-center gap-4">
                            <Link href="/" className="hover:opacity-70 transition-opacity">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            {/* Mobile: Title */}
                            <h1 className="lg:hidden text-sm font-bold tracking-widest uppercase">
                                Shipping
                            </h1>
                        </div>

                        {/* Secure Checkout Badge */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">
                                Secure Checkout
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                    {/* Left Column - Shipping */}
                    <div className="lg:col-span-7">
                        {/* Section Header - Desktop Only */}
                        <div className="hidden lg:block mb-8">
                            <h1 className="text-3xl font-black tracking-tight font-[family-name:var(--font-outfit)] uppercase">
                                Shipping
                            </h1>
                            <div className="w-12 h-1 bg-black mt-3" />
                        </div>

                        <AnimatePresence mode="wait">
                            {isFormOpen ? (
                                <AddressForm
                                    key="form"
                                    address={editingAddress}
                                    onSave={handleSaveAddress}
                                    onCancel={() => {
                                        setIsFormOpen(false);
                                        setEditingAddress(null);
                                    }}
                                />
                            ) : (
                                <motion.div
                                    key="list"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {/* Address Cards */}
                                    <div className="space-y-3">
                                        {addresses.map((address) => (
                                            <AddressCard
                                                key={address.id}
                                                address={address}
                                                isSelected={selectedAddressId === address.id}
                                                onSelect={() => setSelectedAddressId(address.id)}
                                                onEdit={() => handleEdit(address)}
                                            />
                                        ))}
                                    </div>

                                    {/* Add New Address */}
                                    <button
                                        onClick={handleAddNew}
                                        className="flex items-center gap-2 mt-6 text-sm font-semibold uppercase tracking-widest hover:text-gray-600 transition-colors"
                                    >
                                        <span className="text-lg">+</span>
                                        <span>Add New Address</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Continue Button - Desktop */}
                        <AnimatePresence>
                            {!isFormOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className="hidden lg:block mt-10"
                                >
                                    <button
                                        disabled={cartItems.length === 0}
                                        className="w-full bg-black text-white h-14 rounded-lg font-bold tracking-widest text-sm uppercase hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Continue to Payment
                                    </button>
                                    <p className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        All transactions are secure and encrypted.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-24">
                            <OrderSummary isCollapsible={false} />
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Footer - Fixed Bottom */}
            <AnimatePresence>
                {!isFormOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-pb"
                    >
                        {/* Total Amount */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                                Total Amount
                            </span>
                            <span className="text-2xl font-bold">₹{total.toLocaleString()}</span>
                        </div>

                        {/* Continue Button */}
                        <button
                            disabled={cartItems.length === 0}
                            className="w-full bg-black text-white h-14 rounded-lg font-bold tracking-widest text-sm uppercase hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Continue to Payment
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile padding for fixed footer */}
            <div className="lg:hidden h-32" />
        </div>
    );
}
