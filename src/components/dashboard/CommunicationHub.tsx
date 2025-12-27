'use client';

import { useBuilderStore } from '@/store/builderStore';
import { PRICING_DATA } from '@/utils/PricingData';
import { useEffect, useState } from 'react';
import { Calendar, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const updates = [
    { id: 1, text: 'UX Team uploaded new assets.', time: '2h ago', icon: CheckCircle2, color: 'text-emerald-400' },
    { id: 2, text: 'Dev Team fixed payment bug #402.', time: '4h ago', icon: AlertCircle, color: 'text-amber-400' },
    { id: 3, text: 'Database connected to AWS ap-south-1.', time: '1d ago', icon: CheckCircle2, color: 'text-cyan-400' },
    { id: 4, text: 'Project Manager updated timeline.', time: '1d ago', icon: MessageSquare, color: 'text-slate-400' },
];

export default function CommunicationHub() {
    const { selections } = useBuilderStore();
    const [timelineStr, setTimelineStr] = useState('Calculating...');

    useEffect(() => {
        // Logic: Option A (Minimal) -> 1-2 Months
        // Option B (Mid) -> 2-3 Months
        // Option C (High/Luxury) -> 3-6 Months
        const design = selections.design || 'minimal';

        if (design === 'minimal') setTimelineStr('1-2 Months');
        else if (design === 'mid') setTimelineStr('2-3 Months');
        else if (design === 'high') setTimelineStr('3-6 Months');
        else setTimelineStr('1-2 Months');
    }, [selections]);

    return (
        <div className="w-full h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wide flex items-center gap-2">
                    <MessageSquare size={20} className="text-fuchsia-400" />
                    Comm Hub
                </h3>
            </div>

            <div className="flex flex-col gap-4 flex-1">
                {/* Next Sync Card */}
                <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg text-white">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider">Est. Completion</div>
                            <div className="text-lg font-bold text-white">{timelineStr}</div>
                        </div>
                    </div>
                    <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-xs text-white uppercase font-bold rounded transition-colors">
                        Sync
                    </button>
                </div>

                {/* Activity Feed */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    <div className="text-xs text-slate-500 uppercase tracking-wider sticky top-0 bg-[#0F172A] pb-2 z-10">
                        Live Updates
                    </div>
                    {updates.map((update) => (
                        <div key={update.id} className="flex gap-3 group">
                            <div className="pt-1">
                                <update.icon size={14} className={update.color} />
                            </div>
                            <div className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                <p>{update.text}</p>
                                <span className="text-[10px] text-slate-500 block mt-0.5">{update.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
