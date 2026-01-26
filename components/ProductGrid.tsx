import { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductGridProps {
    products: Product[];
    onProductClick: (index: number) => void;
}

export default function ProductGrid({ products, onProductClick }: ProductGridProps) {
    return (
        <section className="min-h-screen bg-[#0D0D0D] py-32 px-4 md:px-12 relative z-20">
            <div className="max-w-[90rem] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 space-y-8 md:space-y-0"
                >
                    <h2 className="text-white text-6xl md:text-8xl font-black leading-[0.8] tracking-tight font-[family-name:var(--font-outfit)]">
                        LATEST<br />DROP
                    </h2>
                    <div className="text-white/40 font-mono text-sm tracking-widest">
                        [ COLLECTION 2026 ]
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index % 2 * 0.1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            onClick={() => onProductClick(index)}
                            className={`group cursor-pointer ${index % 2 === 1 ? 'md:mt-32' : ''}`}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-white/5">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                                    className="w-full h-full"
                                >
                                    <img
                                        src={product.gridThumbnail}
                                        alt={product.title}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                </motion.div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-baseline border-b border-white/10 pb-4 group-hover:border-white/30 transition-colors duration-500">
                                    <h3 className="text-2xl font-semibold text-white tracking-normal font-[family-name:var(--font-outfit)] uppercase">
                                        {product.title}
                                    </h3>
                                    <span className="text-base text-white/60 font-light font-[family-name:var(--font-outfit)]">
                                        {product.price}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-[family-name:var(--font-inter)]">
                                        {product.description}
                                    </p>
                                    <button className="text-black bg-white/90 hover:bg-white px-6 py-2 text-sm uppercase font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
