'use client';

import { motion } from 'framer-motion';
import { PRICING_DATA } from '@/utils/PricingData';
import clsx from 'clsx';

interface BrickProps {
    category: 'design' | 'database' | 'testing' | 'marketing';
    type: string;
    index: number;
}

export const Brick = ({ category, type, index }: BrickProps) => {
    // Safe lookup with type narrowing if needed, though category/type inputs should match keys.
    const info = PRICING_DATA[category]?.[type];

    if (!info) return null;

    return (
        <motion.div
            layoutId={`brick-${category}`}
            initial={{ opacity: 0, y: -200, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                mass: 1
            }}
            className={clsx(
                "relative w-full h-16 mb-1 rounded-sm shadow-lg flex items-center justify-center backdrop-blur-md bg-gradient-to-r border border-white/20",
                info.color // Tailwind class now contains gradient e.g., "from-cyan-500 to-blue-500"
            )}
            style={{
                zIndex: index, // Ensure stacking order visual
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            }}
        >
            <span className="font-mono font-bold text-white uppercase tracking-widest drop-shadow-md">
                {category} module
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
};
