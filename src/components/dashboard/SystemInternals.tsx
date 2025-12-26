'use client';

import React from 'react';
import { Figma, GitBranch, Server, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SystemInternals() {
    return (
        <div className="w-full h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    System Internals
                </h3>
                <span className="text-xs text-slate-500 font-mono">v1.0.4-beta</span>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
                {/* Design Quadrant */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-pink-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500 group-hover:text-pink-400 transition-colors">
                            <Figma size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-300">Design</span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Status</div>
                        <div className="text-sm font-mono text-white">Live Prototype</div>
                        <div className="text-xs text-emerald-400 mt-1">3/5 Modules Approved</div>
                    </div>
                </div>

                {/* Code Quadrant */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-orange-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 group-hover:text-orange-400 transition-colors">
                            <GitBranch size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-300">Repo</span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Latest Commit</div>
                        <div className="text-sm font-mono text-white truncate w-full" title="feat: auth_middleware implementation">
                            feat: auth_middleware
                        </div>
                        <div className="text-xs text-slate-400 font-mono">#a1b2c3d</div>
                    </div>
                </div>

                {/* Database Quadrant */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-blue-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 group-hover:text-blue-400 transition-colors">
                            <Server size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-300">Database</span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">AWS RDS (Mumbai)</div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">Latency:</span>
                            <span className="text-sm font-mono text-emerald-400">24ms</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                            <div className="w-[30%] h-full bg-emerald-500" />
                        </div>
                    </div>
                </div>

                {/* Testing Quadrant */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-purple-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 group-hover:text-purple-400 transition-colors">
                            <ShieldCheck size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-300">Security</span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Cypress Suite</div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-mono text-white">Coverage</span>
                            <span className="text-sm font-bold text-emerald-400">92%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                            <div className="w-[92%] h-full bg-purple-500" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
