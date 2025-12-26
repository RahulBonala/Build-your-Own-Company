'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Fuel, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FinancialFuel() {
    const totalCost = 115000;
    const paidCost = totalCost * 0.5;
    const remainingCost = totalCost - paidCost;
    const percentage = 50;

    return (
        <div className="w-full h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 z-10">
                <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wide flex items-center gap-2">
                    <Fuel size={20} className="text-amber-400" />
                    Project Fuel
                </h3>
            </div>

            <div className="flex flex-1 items-center gap-8 z-10">
                {/* Gauge using SVG */}
                <div className="relative w-32 h-32 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Background Circle */}
                        <circle
                            cx="64" cy="64" r="58"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                            fill="none"
                        />
                        {/* Progress Circle (Green) */}
                        <motion.circle
                            cx="64" cy="64" r="58"
                            stroke="#10b981" // Emerald-500
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={364} // 2 * PI * 58
                            strokeDashoffset={364 - (364 * percentage) / 100}
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: 364 }}
                            animate={{ strokeDashoffset: 364 - (364 * percentage) / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </svg>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-white">{percentage}%</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Paid</span>
                    </div>
                </div>

                {/* Info & Actions */}
                <div className="flex-1 space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-900/50 p-2 rounded border border-white/5">
                            <div className="text-[10px] text-slate-500 uppercase">Paid</div>
                            <div className="text-emerald-400 font-mono font-bold">₹{paidCost.toLocaleString('en-IN')}</div>
                        </div>
                        <div className="bg-slate-900/50 p-2 rounded border border-white/5">
                            <div className="text-[10px] text-slate-500 uppercase">Remaining</div>
                            <div className="text-white font-mono font-bold">₹{remainingCost.toLocaleString('en-IN')}</div>
                        </div>
                    </div>

                    {/* Warning Text */}
                    <div className="text-[10px] text-amber-400/80 italic flex items-center gap-1">
                        <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
                        Balance must be cleared before Stage 7.
                    </div>

                    {/* Pay Button */}
                    <button
                        className="w-full py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold uppercase tracking-widest text-xs rounded shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        onClick={() => alert('Opening Secure Payment Gateway...')}
                    >
                        <CreditCard size={14} />
                        Pay Remaining
                    </button>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-8 h-4 bg-slate-700 rounded-full relative">
                        <div className="absolute left-1 top-1 w-2 h-2 bg-slate-400 rounded-full" />
                    </div>
                    <span className="text-xs text-slate-400">AMC (Save 20%)</span>
                </div>
            </div>
        </div>
    );
}
