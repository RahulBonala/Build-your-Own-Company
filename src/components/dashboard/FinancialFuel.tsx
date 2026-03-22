'use client';

import React from 'react';
import { useBuilderStore } from '@/store/builderStore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, Fuel, TrendingUp } from 'lucide-react';
import { PRICING_DATA } from '@/utils/PricingData';

export default function FinancialFuel() {
    const { quote, selections } = useBuilderStore();
    const router = useRouter();

    const totalCost = quote.oneTimeCost || 0;
    const monthlyCost = quote.monthlyCost || 0;
    const paidCost = totalCost * 0.5;
    const remainingCost = totalCost - paidCost;
    const percentage = totalCost > 0 ? 50 : 0;
    const circumference = 2 * Math.PI * 58;

    const breakdown: { label: string; amount: number; color: string }[] = [];
    if (selections.design && PRICING_DATA.design[selections.design]) {
        const d = PRICING_DATA.design[selections.design];
        breakdown.push({ label: `Design · ${d.label}`, amount: d.price, color: 'bg-cyan-500' });
    }
    if (selections.database && PRICING_DATA.database[selections.database]) {
        const d = PRICING_DATA.database[selections.database];
        breakdown.push({ label: `Database · ${d.label}`, amount: d.setup || 0, color: 'bg-emerald-500' });
    }
    if (selections.testing && PRICING_DATA.testing[selections.testing]) {
        const d = PRICING_DATA.testing[selections.testing];
        breakdown.push({ label: `Testing · ${d.label}`, amount: d.price, color: 'bg-amber-500' });
    }
    if (selections.marketing && PRICING_DATA.marketing[selections.marketing]) {
        const d = PRICING_DATA.marketing[selections.marketing];
        breakdown.push({ label: `Marketing · ${d.label}`, amount: d.price, color: 'bg-fuchsia-500' });
    }

    const noSelections = breakdown.length === 0;

    return (
        <div className="w-full h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 z-10">
                <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wide flex items-center gap-2">
                    <Fuel size={20} className="text-amber-400" />
                    Project Fuel
                </h3>
                {monthlyCost > 0 && (
                    <span className="text-xs font-mono text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <TrendingUp size={10} />
                        +₹{monthlyCost.toLocaleString('en-IN')}/mo
                    </span>
                )}
            </div>

            {noSelections ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center">
                        <Fuel size={22} className="text-slate-600" />
                    </div>
                    <p className="text-slate-500 text-sm">No modules selected yet.</p>
                    <button
                        onClick={() => router.push('/configurator')}
                        className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2 cursor-pointer"
                    >
                        Go to configurator →
                    </button>
                </div>
            ) : (
                <div className="flex flex-1 items-center gap-6 z-10">
                    <div className="relative w-28 h-28 flex-shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                            <circle cx="64" cy="64" r="58" stroke="rgba(255,255,255,0.07)" strokeWidth="8" fill="none" />
                            <motion.circle
                                cx="64" cy="64" r="58"
                                stroke="#10b981"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: circumference - (circumference * percentage) / 100 }}
                                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-white">{percentage}%</span>
                            <span className="text-[9px] text-slate-400 uppercase tracking-wide">Paid</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3 min-w-0">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-slate-900/60 p-2 rounded-lg border border-white/5">
                                <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Paid</div>
                                <div className="text-emerald-400 font-mono font-bold text-sm truncate">
                                    {totalCost > 0 ? `₹${paidCost.toLocaleString('en-IN')}` : '—'}
                                </div>
                            </div>
                            <div className="bg-slate-900/60 p-2 rounded-lg border border-white/5">
                                <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Due on Launch</div>
                                <div className="text-white font-mono font-bold text-sm truncate">
                                    {totalCost > 0 ? `₹${remainingCost.toLocaleString('en-IN')}` : '—'}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            {breakdown.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.color}`} />
                                    <span className="text-[10px] text-slate-400 truncate flex-1">{item.label}</span>
                                    <span className="text-[10px] font-mono text-slate-300 shrink-0">
                                        {item.amount > 0 ? `₹${item.amount.toLocaleString('en-IN')}` : 'Free'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {totalCost > 0 && (
                            <p className="text-[9px] text-amber-400/70 italic flex items-center gap-1">
                                <span className="w-1 h-1 bg-amber-400 rounded-full animate-pulse shrink-0" />
                                Balance must be cleared before Stage 7.
                            </p>
                        )}

                        <button
                            onClick={() => router.push('/checkout')}
                            className="w-full py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold uppercase tracking-widest text-xs rounded-lg shadow-[0_0_16px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                            <CreditCard size={12} />
                            {totalCost > 0 ? 'Pay Remaining' : 'Build Your Stack'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
