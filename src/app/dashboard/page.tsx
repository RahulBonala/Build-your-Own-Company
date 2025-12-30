'use client';

import React from 'react';
import PipelineMap from '@/components/dashboard/PipelineMap';
import SystemInternals from '@/components/dashboard/SystemInternals';
import FinancialFuel from '@/components/dashboard/FinancialFuel';
import LiveTelemetry from '@/components/dashboard/LiveTelemetry';
import CommunicationHub from '@/components/dashboard/CommunicationHub';

export default function DashboardPage() {
    // Determine timeline string based on Design Tier
    // Tier 1 (Option A/Minimal) -> 1-2 Months
    // Tier 2 (Option B/Mid) -> 2-3 Months
    // Tier 3 (Option C/High) -> 3-6 Months
    // Default to "Calculating..." if no selection

    // We can't access store directly in Server Component (if this was one), but 'use client' is here.
    // However, for simplicity/speed without heavy refactor, we'll assume the store persists client-side state.

    /* 
       NOTE: In a real app, I'd import useBuilderStore here. 
       But since I need to render this conditionally or waiting for hydration, 
       I will just mock the "Timeline Logic" for the visible UI 
       or assume the user came from the checkout flow where parameters might be passed.
       
       Better approach: Let's read the store!
    */

    // const { selections } = useBuilderStore(); // This would be ideal but need to verify import.
    // Let's rely on standard layout fixes first. Content overflow was the user's main complaint.

    return (
        <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
            </div>

            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end relative z-10 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black font-heading uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                        Founder&apos;s Cockpit
                    </h1>
                    <p className="text-slate-500 font-mono text-sm mt-1">Project: BuilderBox // ID: BB-2025-X1</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-400">System Online</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-6 relative z-10 max-w-7xl mx-auto pb-10">
                {/* Row 1: Pipeline Map (Full Width) */}
                <div className="col-span-12">
                    <PipelineMap />
                </div>

                {/* Row 2: Internals & Financials */}
                <div className="col-span-12 lg:col-span-6 min-h-[300px]">
                    <SystemInternals />
                </div>
                <div className="col-span-12 lg:col-span-6 min-h-[300px]">
                    <FinancialFuel />
                </div>

                {/* Row 3: Telemetry & Comm Hub */}
                <div className="col-span-12 lg:col-span-7 min-h-[350px]">
                    <LiveTelemetry />
                </div>
                <div className="col-span-12 lg:col-span-5 min-h-[350px]">
                    <CommunicationHub />
                </div>
            </div>
        </div>
    );
}
