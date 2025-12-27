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
        <div className="w-full p-6 pb-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden min-h-[220px]">
            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                <h2 className="text-4xl font-black font-heading text-white/10 uppercase tracking-widest">Pipeline</h2>
            </div>

            <div className="flex justify-between items-start relative z-10 mt-12 px-8">
                {/* Connection Line Background */}
                <div className="absolute top-6 left-0 w-full h-1 bg-white/5 -z-10" />

                {stages.map((stage, index) => {
                    const isActive = stage.status === 'active';
                    const isCompleted = stage.status === 'completed';
                    const isGate = stage.status === 'gate';

                    return (
                        <div key={stage.id} className="flex flex-col items-center gap-4 relative group w-24">
                            {/* Node Circle */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 relative bg-slate-950",
                                    isCompleted ? "border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]" :
                                        isActive ? "border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-110" :
                                            isGate ? "border-amber-500 text-amber-400" :
                                                "border-slate-700 text-slate-500"
                                )}
                            >
                                {isCompleted ? <Check size={20} /> :
                                    isGate ? <Lock size={18} /> :
                                        isActive ? <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" /> :
                                            <div className="w-2 h-2 bg-slate-600 rounded-full" />}

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
                            <div className="text-center w-32 flex flex-col items-center">
                                <p className={cn(
                                    "text-xs font-bold uppercase tracking-wider mb-1",
                                    isActive ? "text-cyan-400" : isCompleted ? "text-emerald-400" : "text-slate-500"
                                )}>
                                    {stage.name}
                                </p>
                                {stage.subStatus && (
                                    <p className="text-[10px] text-slate-400 font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-white/5 inline-block whitespace-nowrap">
                                        {stage.subStatus}
                                    </p>
                                )}
                                {isGate && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-1 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-[10px] font-bold tracking-widest uppercase rounded shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                                    >
                                        Approve
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* The Loop (Testing -> Coding) - SVG Overlay */}
                {/* We absolutely position this over the nodes explicitly relevant to the loop */}
                <div className="absolute top-6 left-0 w-full h-full pointer-events-none -z-10">
                    <svg className="w-full h-32 overflow-visible">
                        <defs>
                            <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(244, 63, 94, 0)" />
                                <stop offset="50%" stopColor="#f43f5e" />
                                <stop offset="100%" stopColor="rgba(244, 63, 94, 0)" />
                            </linearGradient>
                        </defs>
                        {/* 
                  Drawing a path from Stage 4 (Testing) back to Stage 2 (Coding).
                  Assuming distinct spacing: 
                  Stage 1: ~4%, Stage 2: ~18%, Stage 3: ~32%, Stage 4: ~46% ... 
                  This is tricky with flexbox, but 'w-full' px calc approximation is okay for a POC 
                  OR we use a simpler visual for now. 
                  Let's try a distinct curved line. 
                */}
                        <motion.path
                            d="M 520 20 Q 350 100 220 20"
                            fill="none"
                            stroke="url(#loopGradient)"
                            strokeWidth="3"
                            strokeDasharray="8 4"
                            initial={{ strokeDashoffset: 100, opacity: 0 }}
                            animate={{ strokeDashoffset: 0, opacity: [0, 1, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        />
                        <motion.text
                            x="350"
                            y="70"
                            fill="#f43f5e"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                        >
                            BUG DETECTED // RETRYING
                        </motion.text>
                    </svg>
                </div>
            </div>
        </div>
    );
}
