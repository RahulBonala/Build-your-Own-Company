'use client';

import { useBuilderStore } from '@/store/builderStore';
import { PRICING_DATA } from '@/utils/PricingData';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { SidebarOption } from './SidebarOption';

type Category = keyof typeof PRICING_DATA;

export const SupplyDock = () => {
    const { selections, setSelection } = useBuilderStore();
    const [expanded, setExpanded] = useState<Category | null>('design');

    const categories: Category[] = ['design', 'database', 'testing', 'marketing'];

    const getCategoryColor = (cat: Category) => {
        switch (cat) {
            case 'design': return 'bg-cyan-500';
            case 'database': return 'bg-emerald-500';
            case 'testing': return 'bg-amber-400';
            case 'marketing': return 'bg-fuchsia-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="w-full h-full bg-slate-900/95 border-l border-glass-border flex flex-col p-6 overflow-y-auto">
            <h2 className="text-xl font-bold font-mono text-white mb-6 tracking-widest uppercase border-b border-glass-border pb-4">
                Supply Dock
            </h2>

            <div className="flex flex-col gap-4">
                {categories.map((category) => (
                    <div key={category} className="border border-glass-border rounded-lg overflow-visible bg-black/20">
                        <button
                            onClick={() => setExpanded(expanded === category ? null : category)}
                            className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <span className={clsx("w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]", getCategoryColor(category))} />
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
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-visible"
                                >
                                    <div className="p-2 space-y-2">
                                        {Object.entries(PRICING_DATA[category]).map(([key, data]) => (
                                            <SidebarOption
                                                key={key}
                                                optionKey={key}
                                                data={data}
                                                isSelected={selections[category] === key}
                                                onSelect={() => setSelection(category, key)}
                                            />
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
