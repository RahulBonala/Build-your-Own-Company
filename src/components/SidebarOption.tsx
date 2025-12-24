'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import clsx from 'clsx';
import { InfoCard } from './InfoCard';
import { OptionType } from '@/utils/PricingData';

interface SidebarOptionProps {
    optionKey: string;
    data: OptionType;
    isSelected: boolean;
    onSelect: () => void;
}

export const SidebarOption = ({ optionKey, data, isSelected, onSelect }: SidebarOptionProps) => {
    const [showInfo, setShowInfo] = useState(false);
    const [cardPos, setCardPos] = useState<{ top: number } | undefined>(undefined);

    const handleMouseEnter = (e: React.MouseEvent) => {
        // Calculate stable top position based on the element
        const rect = e.currentTarget.getBoundingClientRect();
        setCardPos({ top: rect.top + (rect.height / 2) }); // Center of the item
        setShowInfo(true);
    };

    return (
        <div className="relative group">
            <button
                onClick={onSelect}
                className={clsx(
                    "w-full text-left p-3 rounded-md transition-all flex items-center justify-between relative overflow-hidden",
                    isSelected
                        ? "bg-cyber-cyan/10 border border-cyber-cyan/50 text-cyber-cyan"
                        : "bg-white/5 hover:bg-white/10 border border-transparent text-gray-400 hover:text-white"
                )}
            >
                <div className="relative z-10">
                    <div className="text-sm font-bold flex items-center gap-2">
                        {data.label}
                    </div>
                    <div className="text-xs opacity-70 mt-1 font-mono">
                        {data.price ? `₹${data.price.toLocaleString()}` : `Setup: ₹${(data.setup || 0).toLocaleString()}`}
                    </div>
                </div>

                <div className="flex items-center gap-2 relative z-10">
                    {isSelected && <Check size={16} />}
                </div>

                {/* Selection Glow */}
                {isSelected && (
                    <div className="absolute inset-0 bg-cyber-cyan/5 blur-md" />
                )}
            </button>

            {/* Info Icon Button - Positioned absolute to not interfere with main click but accessible */}
            <div
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 text-gray-500 hover:text-cyan-400 cursor-help transition-colors"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setShowInfo(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    // On mobile touch, calculate position immediately
                    const rect = e.currentTarget.getBoundingClientRect();
                    setCardPos({ top: rect.top });
                    setShowInfo(!showInfo);
                }}
            >
                <Info size={14} />
            </div>

            {/* Info Popup - Rendered outside the button to avoid nesting issues */}
            <AnimatePresence>
                {showInfo && (
                    <InfoCard
                        title={data.label}
                        description={data.description}
                        details={data.details}
                        position={cardPos}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
