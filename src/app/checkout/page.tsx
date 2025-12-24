'use client';

import { useBuilderStore } from '@/store/builderStore';
import { PRICING_DATA } from '@/utils/PricingLogic';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Database, Zap, Headphones } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
    const router = useRouter();
    const { selections, quote } = useBuilderStore();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    // Prevent hydration mismatch or empty state flash
    if (!hydrated) return <div className="min-h-screen bg-obsidian" />;

    const handleConnectAgent = () => {
        alert("Connecting to Senior Solutions Architect... (Stub)");
    };

    return (
        <div className="min-h-screen bg-obsidian text-silver p-8 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter">BLUEPRINT SUMMARY</h1>
                        <div className="h-1 w-20 bg-cyber-cyan mt-2" />
                    </div>

                    <button
                        onClick={handleConnectAgent}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-500/50 text-purple-300 rounded hover:bg-purple-900/50 transition-colors"
                    >
                        <Headphones size={18} /> Speak to an Expert
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left: Component Breakdown */}
                    <div className="space-y-4">
                        <div className="bg-white/5 border border-glass-border rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Zap className="text-cyber-cyan" /> Core Systems
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(selections).map(([key, value]) => {
                                    if (!value) return null;
                                    // @ts-ignore
                                    const item = PRICING_DATA[key]?.[value];
                                    if (!item) return null;

                                    return (
                                        <div key={key} className="flex justify-between items-start border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <div className="text-xs text-cyber-cyan uppercase font-mono tracking-widest mb-1">{key}</div>
                                                <div className="text-white font-bold text-lg">{item.label}</div>
                                                <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-mono font-bold">
                                                    {item.price ? `₹${item.price.toLocaleString()}` : `₹${item.setup.toLocaleString()}`}
                                                </div>
                                                {item.monthly > 0 && (
                                                    <div className="text-xs text-gray-400">+ ₹{item.monthly.toLocaleString()}/mo</div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="bg-white/5 border border-glass-border rounded-lg p-6 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Clock className="text-purple-500" />
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-bold">Est. Timeline</div>
                                    <div className="text-2xl font-black text-white">{quote.timelineWeeks} Weeks</div>
                                </div>
                            </div>
                            <div className="h-12 w-px bg-white/10" />
                            <div>
                                <div className="text-xs text-gray-500 uppercase font-bold">Monthly Fuel</div>
                                <div className="text-2xl font-black text-white">₹{quote.monthlyCost.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-cyber-cyan/30 rounded-lg p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <Database size={150} />
                            </div>

                            <div className="relative z-10">
                                <div className="text-sm text-cyber-cyan font-mono uppercase tracking-widest mb-2">Total Build Cost</div>
                                <div className="text-6xl font-black text-white mb-8 tracking-tight">₹{quote.oneTimeCost.toLocaleString()}</div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="text-gray-400">50% Deposit Due Now</span>
                                        <span className="font-bold text-white text-xl">₹{(quote.oneTimeCost * 0.5).toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-px" />
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="text-gray-400">Remaining on Launch</span>
                                        <span className="font-bold text-gray-300">₹{(quote.oneTimeCost * 0.5).toLocaleString()}</span>
                                    </div>
                                </div>

                                <button className="w-full py-5 bg-cyber-cyan text-obsidian font-black text-xl uppercase tracking-widest rounded hover:bg-white transition-colors shadow-[0_0_30px_rgba(102,252,241,0.3)] hover:scale-[1.02] transform duration-200">
                                    Pay 50% Deposit
                                </button>

                                <div className="text-center mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    Secured by Razorpay. 100% Refundable within 7 days.
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded text-center text-green-400 text-sm flex items-center justify-center gap-2">
                            <CheckCircle size={16} /> All systems nominal. Ready for production.
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
