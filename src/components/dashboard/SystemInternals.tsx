'use client';

import React from 'react';
import { Figma, GitBranch, Server, ShieldCheck } from 'lucide-react';
import { useBuilderStore } from '@/store/builderStore';
import { PRICING_DATA } from '@/utils/PricingData';

const DESIGN_TECH: Record<string, string> = {
    minimal: 'Template + CMS',
    mid: 'React / Next.js',
    high: 'WebGL / Three.js',
};
const DB_LABEL: Record<string, { provider: string; latency: string; fill: string; color: string }> = {
    small:  { provider: 'Firebase / Supabase', latency: '18ms', fill: '20%', color: 'bg-emerald-500' },
    medium: { provider: 'AWS RDS (Mumbai)',     latency: '24ms', fill: '45%', color: 'bg-blue-500' },
    large:  { provider: 'Kubernetes Cluster',   latency: '8ms',  fill: '72%', color: 'bg-purple-500' },
};
const TEST_COVERAGE: Record<string, { label: string; pct: string }> = {
    basic:    { label: 'Manual QA',        pct: '40%' },
    standard: { label: 'Jest / Cypress',   pct: '78%' },
    extreme:  { label: 'Chaos + Pen Test', pct: '97%' },
};

export default function SystemInternals() {
    const { selections } = useBuilderStore();

    const designKey = selections.design   || null;
    const dbKey     = selections.database || null;
    const testKey   = selections.testing  || null;

    const designLabel = designKey ? PRICING_DATA.design[designKey]?.label : null;
    const dbInfo      = dbKey     ? DB_LABEL[dbKey]                       : null;
    const testInfo    = testKey   ? TEST_COVERAGE[testKey]                 : null;
    const mktLabel    = selections.marketing ? PRICING_DATA.marketing[selections.marketing]?.label : null;

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
                {/* Design */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-pink-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500 group-hover:text-pink-400 transition-colors">
                            <Figma size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-300">Design</span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">
                            {designLabel ? designLabel + ' Tier' : 'Not selected'}
                        </div>
                        <div className="text-sm font-mono text-white">
                            {designKey ? DESIGN_TECH[designKey] : '—'}
                        </div>
                        <div className={`text-xs mt-1 ${designKey ? 'text-emerald-400' : 'text-slate-600'}`}>
                            {designKey ? 'Figma prototype in progress' : 'Awaiting selection'}
                        </div>
                    </div>
                </div>

                {/* Repo */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-orange-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 group-hover:text-orange-400 transition-colors">
                            <GitBranch size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-300">Repo</span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Latest Commit</div>
                        <div className="text-sm font-mono text-white truncate" title="feat: auth_middleware implementation">
                            feat: auth_middleware
                        </div>
                        <div className="text-xs text-slate-400 font-mono">#a1b2c3d</div>
                    </div>
                </div>

                {/* Database */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-blue-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 group-hover:text-blue-400 transition-colors">
                            <Server size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-300">Database</span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">
                            {dbInfo ? dbInfo.provider : 'Not selected'}
                        </div>
                        {dbInfo ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-400">Latency:</span>
                                    <span className="text-sm font-mono text-emerald-400">{dbInfo.latency}</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                                    <div className={`h-full ${dbInfo.color} transition-all duration-1000`} style={{ width: dbInfo.fill }} />
                                </div>
                            </>
                        ) : (
                            <div className="text-xs text-slate-600 mt-1">Awaiting selection</div>
                        )}
                    </div>
                </div>

                {/* Testing / Security */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-purple-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 group-hover:text-purple-400 transition-colors">
                            <ShieldCheck size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-300">
                            {mktLabel ? `Mktg: ${mktLabel}` : 'Security'}
                        </span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">
                            {testInfo ? testInfo.label : 'Not selected'}
                        </div>
                        {testInfo ? (
                            <>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-mono text-white">Coverage</span>
                                    <span className="text-sm font-bold text-emerald-400">{testInfo.pct}</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: testInfo.pct }} />
                                </div>
                            </>
                        ) : (
                            <div className="text-xs text-slate-600 mt-1">Awaiting selection</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
