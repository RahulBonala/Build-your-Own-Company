'use client';

import { SupplyDock } from '@/components/SupplyDock';
import { ThreeDBox } from '@/components/ThreeDBox';
import { useBuilderStore } from '@/store/builderStore';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ConfiguratorPage() {
    const router = useRouter();
    const { quote, idea, selections } = useBuilderStore();

    // Check if all 4 categories have a selection
    const isReady = Object.values(selections).every(Boolean);

    return (
        <div className="w-full h-screen bg-obsidian flex overflow-hidden">
            {/* Left Stage - 60% */}
            <div className="w-[60%] h-full relative flex flex-col items-center justify-center p-8">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-obsidian to-obsidian pointer-events-none" />

                {/* Header / Idea */}
                <div className="absolute top-8 left-8 z-10">
                    <h1 className="text-3xl font-black text-white tracking-tighter">
                        BUILD YOUR OWN <span className="text-cyber-cyan">COMPANY (BYOC)</span>
                    </h1>
                    {idea && (
                        <div className="mt-2 text-sm text-gray-400 font-mono border-l-2 border-cyber-cyan pl-3">
                            Project: {idea}
                        </div>
                    )}
                </div>

                {/* Price Counter */}
                <div className="absolute top-8 right-8 z-10 flex flex-col items-end">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
                        Estimated Cost
                    </div>
                    <div className="text-4xl font-bold text-cyber-cyan tabular-nums">
                        <AnimatedNumber value={quote.oneTimeCost} />
                    </div>
                    {quote.monthlyCost > 0 && (
                        <div className="text-sm text-gray-400 font-mono mt-1">
                            + ₹{quote.monthlyCost.toLocaleString()}/mo
                        </div>
                    )}
                </div>

                {/* 3D Stage */}
                <div className="relative z-0 w-full max-w-2xl aspect-square flex items-center justify-center">
                    <ThreeDBox />
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-8 text-center flex flex-col items-center gap-4 z-20">
                    <div className="text-xs text-gray-600 font-mono">
                        {isReady ? "SYSTEM READY FOR LAUNCH." : "DRAG MODULES TO INITIALIZE."}
                    </div>

                    {isReady && (
                        <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                // Add a small delay for the tap animation before navigating
                                setTimeout(() => router.push('/checkout'), 200);
                            }}
                            className="px-8 py-3 bg-cyber-cyan text-obsidian font-bold text-lg uppercase tracking-widest rounded-sm shadow-[0_0_20px_rgba(102,252,241,0.5)] hover:bg-white transition-colors cursor-pointer"
                        >
                            Initialize Launch Sequence
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Right Supply Dock - 40% */}
            <div className="w-[40%] h-full relative z-20 shadow-2xl">
                <SupplyDock />
            </div>
        </div>
    );
}

function AnimatedNumber({ value }: { value: number }) {
    // Simple wrapper for now, could be spring animated
    return <>₹{value.toLocaleString()}</>;
}
