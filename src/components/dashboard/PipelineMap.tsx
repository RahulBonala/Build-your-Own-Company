'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, Lock } from 'lucide-react';

const stages = [
    { id: 1, name: 'Strategy', status: 'completed' },
    { id: 2, name: 'Web Design', status: 'active', subStatus: 'Figma Prototyping' },
    { id: 3, name: 'Coding', status: 'pending' },
    { id: 4, name: 'Testing', status: 'pending' },
    { id: 5, name: 'Marketing', status: 'pending' },
    { id: 6, name: 'Pre-Launch', status: 'gate' },
    { id: 7, name: 'Launch', status: 'locked' },
];

export default function PipelineMap() {
    return (
        <div className="w-full p-4 md:p-6 pb-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden min-h-[180px] md:min-h-[220px]">
            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                <h2 className="text-2xl md:text-4xl font-black font-heading text-white/10 uppercase tracking-widest">Pipeline</h2>
            </div>

            <div className="flex justify-between items-start relative z-10 mt-8 md:mt-12 px-2 md:px-8 overflow-x-auto">
                {/* Connection Line Background */}
                <div className="absolute top-6 left-0 w-full h-1 bg-white/5 -z-10" />

                {stages.map((stage, index) => {
                    const isActive = stage.status === 'active';
                    const isCompleted = stage.status === 'completed';
                    const isGate = stage.status === 'gate';

                    return (
                        <div key={stage.id} className="flex flex-col items-center gap-2 md:gap-4 relative group min-w-[60px] md:w-24 flex-shrink-0">
                            {/* Node Circle */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 relative bg-slate-950",
                                    isCompleted ? "border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]" :
                                        isActive ? "border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-110" :
                                            isGate ? "border-amber-500 text-amber-400" :
                                                "border-slate-700 text-slate-500"
                                )}
                            >
                                {isCompleted ? <Check size={16} className="md:w-5 md:h-5" /> :
                                    isGate ? <Lock size={14} className="md:w-[18px] md:h-[18px]" /> :
                                        isActive ? <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse" /> :
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-600 rounded-full" />}

                                {/* Active Ring Animation */}
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-cyan-400"
                                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    />
                                )}
                            </motion.div>

                            {/* Label */}
                            <div className="text-center w-16 md:w-32 flex flex-col items-center">
                                <p className={cn(
                                    "text-[9px] md:text-xs font-bold uppercase tracking-wider mb-1",
                                    isActive ? "text-cyan-400" : isCompleted ? "text-emerald-400" : "text-slate-500"
                                )}>
                                    {stage.name}
                                </p>
                                {stage.subStatus && (
                                    <p className="text-[8px] md:text-[10px] text-slate-400 font-mono bg-slate-900/80 px-1 md:px-2 py-0.5 rounded border border-white/5 inline-block whitespace-nowrap hidden md:block">
                                        {stage.subStatus}
                                    </p>
                                )}
                                {isGate && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-1 px-2 md:px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-[8px] md:text-[10px] font-bold tracking-widest uppercase rounded shadow-[0_0_10px_rgba(245,158,11,0.2)] cursor-pointer"
                                    >
                                        Approve
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
