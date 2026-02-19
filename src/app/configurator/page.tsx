'use client';

import { SupplyDock } from '@/components/SupplyDock';
import { ThreeDBox } from '@/components/ThreeDBox';
import { useBuilderStore } from '@/store/builderStore';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

export default function ConfiguratorPage() {
    const router = useRouter();
    const { quote, idea, selections } = useBuilderStore();
    const [hydrated, setHydrated] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    const isReady = Object.values(selections).every(Boolean);

    useEffect(() => {
        setHydrated(true);
    }, []);

    // Route guard
    useEffect(() => {
        if (hydrated && !idea) {
            router.replace('/');
        }
    }, [hydrated, idea, router]);

    useEffect(() => {
        router.prefetch('/checkout');
    }, [router]);

    if (!hydrated) return <div className="min-h-screen bg-obsidian" />;

    return (
        <PageTransition>
            <div className="w-full h-screen bg-obsidian flex flex-col lg:flex-row overflow-hidden lg:overflow-hidden overflow-y-auto">
                {/* Left Stage */}
                <div className="w-full lg:w-[60%] min-h-[50vh] lg:h-full relative flex flex-col items-center justify-center p-8 shrink-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-obsidian to-obsidian pointer-events-none" />

                    {/* Back Button */}
                    <button
                        onClick={() => router.push('/tutorial')}
                        className="absolute top-4 left-4 lg:top-8 lg:left-8 z-20 flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>

                    {/* Header / Idea */}
                    <div className="absolute top-14 left-4 lg:top-20 lg:left-8 z-10 pointer-events-none lg:pointer-events-auto">
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
                            {isReady ? "SYSTEM READY FOR LAUNCH." : "SELECT ALL 4 MODULES TO INITIALIZE."}
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

                {/* Right Supply Dock */}
                <div className="w-full lg:w-[40%] h-auto lg:h-full relative z-20 shadow-2xl bg-slate-900/95 lg:border-l border-t lg:border-t-0 border-glass-border">
                    <SupplyDock />
                </div>
            </div>
        </PageTransition>
    );
}

function AnimatedNumber({ value }: { value: number }) {
    const spring = useSpring(0, { stiffness: 100, damping: 30 });
    const display = useTransform(spring, (v) => `₹${Math.round(v).toLocaleString()}`);

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
}
