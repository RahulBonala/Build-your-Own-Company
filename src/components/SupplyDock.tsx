'use client';

import { useBuilderStore } from '@/store/builderStore';
import { PRICING_DATA } from '@/utils/PricingLogic';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';

type Category = keyof typeof PRICING_DATA;

export const SupplyDock = () => {
    const { selections, setSelection } = useBuilderStore();
    const [expanded, setExpanded] = useState<Category | null>('design');

    const categories: Category[] = ['design', 'database', 'testing', 'marketing'];

    return (
        <div className="w-full h-full bg-obsidian/90 border-l border-glass-border flex flex-col p-6 overflow-y-auto">
            <h2 className="text-xl font-bold font-mono text-white mb-6 tracking-widest uppercase border-b border-glass-border pb-4">
                Supply Dock
            </h2>

            <div className="flex flex-col gap-4">
                {categories.map((category) => (
                    <div key={category} className="border border-glass-border rounded-lg overflow-hidden bg-black/20">
                        <button
                            onClick={() => setExpanded(expanded === category ? null : category)}
                            className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <span className={clsx("w-2 h-2 rounded-full", selections[category] ? "bg-cyber-cyan" : "bg-gray-600")} />
                                <span className="font-bold text-silver uppercase">{category}</span>
                            </div>
                            <ChevronDown
                                className={clsx("text-gray-400 transition-transform", expanded === category && "rotate-180")}
                                size={16}
                            />
                        </button>

                        <AnimatePresence>
                            {expanded === category && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-2 space-y-2">
                                        {Object.entries(PRICING_DATA[category]).map(([key, data]: [string, any]) => (
                                            <button
                                                key={key}
                                                onClick={() => setSelection(category, key)}
                                                className={clsx(
                                                    "w-full text-left p-3 rounded-md transition-all flex items-center justify-between group relative overflow-hidden",
                                                    selections[category] === key
                                                        ? "bg-cyber-cyan/10 border border-cyber-cyan/50 text-cyber-cyan"
                                                        : "bg-white/5 hover:bg-white/10 border border-transparent text-gray-400 hover:text-white"
                                                )}
                                            >
                                                <div className="relative z-10">
                                                    <div className="text-sm font-bold">{data.label}</div>
                                                    <div className="text-xs opacity-70 mt-1 font-mono">
                                                        {data.price ? `₹${data.price.toLocaleString()}` : `Setup: ₹${data.setup.toLocaleString()}`}
                                                    </div>
                                                </div>

                                                {selections[category] === key && (
                                                    <Check size={16} className="relative z-10" />
                                                )}

                                                {/* Selection Glow */}
                                                {selections[category] === key && (
                                                    <div className="absolute inset-0 bg-cyber-cyan/5 blur-md" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};
