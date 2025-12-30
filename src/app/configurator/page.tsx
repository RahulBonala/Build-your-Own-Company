'use client';

import { SupplyDock } from '@/components/SupplyDock';
import { ThreeDBox } from '@/components/ThreeDBox';
import { useBuilderStore } from '@/store/builderStore';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ConfiguratorPage() {
    const router = useRouter();
    const { quote, idea, selections } = useBuilderStore();
    const [isNavigating, setIsNavigating] = useState(false);

    // Check if all 4 categories have a selection
    const isReady = Object.values(selections).every(Boolean);

    useEffect(() => {
        router.prefetch('/checkout');
    }, [router]);

    return (
        <div className="w-full h-screen bg-obsidian flex flex-col lg:flex-row overflow-hidden lg:overflow-hidden overflow-y-auto">
            {/* Left Stage - 60% on Desktop, Full on Mobile */}
            <div className="w-full lg:w-[60%] min-h-[50vh] lg:h-full relative flex flex-col items-center justify-center p-8 shrink-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-obsidian to-obsidian pointer-events-none" />

                {/* Header / Idea */}
                <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-10 pointer-events-none lg:pointer-events-auto">
                    <h1 className="text-xl lg:text-3xl font-black text-white tracking-tighter">
                        BUILD YOUR OWN <span className="text-cyber-cyan block lg:inline">COMPANY</span>
                    </h1>
                    {idea && (
                        <div className="mt-2 text-xs lg:text-sm text-gray-400 font-mono border-l-2 border-cyber-cyan pl-3">
                            Project: {idea}
                        </div>
                    )}
                </div>

                {/* Price Counter */}
                <div className="absolute top-4 right-4 lg:top-8 lg:right-8 z-10 flex flex-col items-end pointer-events-none lg:pointer-events-auto">
                    <div className="text-[10px] lg:text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
                        Estimated Cost
                    </div>
                    <div className="text-2xl lg:text-4xl font-bold text-cyber-cyan tabular-nums">
                        <AnimatedNumber value={quote.oneTimeCost} />
                    </div>
                    {quote.monthlyCost > 0 && (
                        <div className="text-xs lg:text-sm text-gray-400 font-mono mt-1">
                            + ₹{quote.monthlyCost.toLocaleString()}/mo
                        </div>
                    )}
                </div>

                {/* 3D Stage */}
                <div className="relative z-0 w-full max-w-sm lg:max-w-2xl aspect-square flex items-center justify-center mt-12 lg:mt-0">
                    <ThreeDBox />
                </div>

                {/* Footer Info / Launch Button */}
                <div className="absolute bottom-8 text-center flex flex-col items-center gap-4 z-20 w-full px-4">
                    <div className="text-xs text-gray-600 font-mono hidden lg:block">
                        {isReady ? "SYSTEM READY FOR LAUNCH." : "DRAG MODULES TO INITIALIZE."}
                    </div>

                    {isReady && (
                        <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isNavigating}
                            onClick={() => {
                                setIsNavigating(true);
                                setTimeout(() => router.push('/checkout'), 500);
                            }}
                            className={`w-full lg:w-auto px-8 py-3 font-bold text-lg uppercase tracking-widest rounded-sm transition-all cursor-pointer ${isNavigating
                                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                    : "bg-cyber-cyan text-obsidian shadow-[0_0_20px_rgba(102,252,241,0.5)] hover:bg-white"
                                }`}
                        >
                            {isNavigating ? "Initializing..." : "Initialize Launch"}
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Right Supply Dock - 40% on Desktop, Full stack on Mobile */}
            <div className="w-full lg:w-[40%] h-auto lg:h-full relative z-20 shadow-2xl bg-slate-900/95 lg:border-l border-t lg:border-t-0 border-glass-border">
                <SupplyDock />
            </div>
        </div>
    );
}

function AnimatedNumber({ value }: { value: number }) {
    // Simple wrapper for now, could be spring animated
    return <>₹{value.toLocaleString()}</>;
}
