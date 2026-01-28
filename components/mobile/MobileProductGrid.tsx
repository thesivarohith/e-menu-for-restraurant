"use client";

import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface MobileProductGridProps {
    products: Product[];
    onProductSelect: (product: Product, index: number) => void;
    darkMode?: boolean;
}

export default function MobileProductGrid({ products, onProductSelect, darkMode = false }: MobileProductGridProps) {
    return (
        <div className="w-full px-4">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`flex-1 h-[1px] ${darkMode ? 'bg-white/20' : 'bg-gray-200'}`} />
                <span className={`text-xs uppercase tracking-[0.3em] font-medium ${darkMode ? 'text-white/50' : 'text-gray-400'}`}>
                    Archive
                </span>
                <div className={`flex-1 h-[1px] ${darkMode ? 'bg-white/20' : 'bg-gray-200'}`} />
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-2 gap-4">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => onProductSelect(product, index)}
                        className="cursor-pointer group"
                    >
                        {/* Product Image */}
                        <div className={`aspect-[3/4] rounded-lg overflow-hidden mb-3 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
                            <img
                                src={product.gridThumbnail}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Product Info */}
                        <h3 className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-black'}`}>
                            {product.title}
                        </h3>
                        <p className={`text-sm mt-0.5 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            {product.price}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
