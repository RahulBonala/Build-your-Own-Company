'use client';

import { useBuilderStore } from '@/store/builderStore';
import { PRICING_DATA } from '@/utils/PricingData';
import { Calendar, MessageSquare, CheckCircle2, AlertCircle, Rocket } from 'lucide-react';
import { useMemo } from 'react';

export default function CommunicationHub() {
    const { selections, idea } = useBuilderStore();

    const design = selections.design || 'minimal';
    const TIMELINE: Record<string, string> = { minimal: '1-2 Months', mid: '2-3 Months', high: '3-6 Months' };
    const timelineStr = TIMELINE[design] ?? '1-2 Months';

    const updates = useMemo(() => {
        const items: { id: number; text: string; time: string; icon: React.ElementType; color: string }[] = [];
        if (selections.design) {
            const label = PRICING_DATA.design[selections.design]?.label;
            items.push({ id: 1, text: `Design module locked in: ${label} tier.`, time: 'Just now', icon: CheckCircle2, color: 'text-emerald-400' });
        }
        if (selections.database) {
            const label = PRICING_DATA.database[selections.database]?.label;
            items.push({ id: 2, text: `Database configured: ${label}.`, time: '2m ago', icon: CheckCircle2, color: 'text-cyan-400' });
        }
        if (selections.testing) {
            const label = PRICING_DATA.testing[selections.testing]?.label;
            items.push({ id: 3, text: `QA pipeline selected: ${label}.`, time: '5m ago', icon: CheckCircle2, color: 'text-purple-400' });
        }
        if (selections.marketing) {
            const label = PRICING_DATA.marketing[selections.marketing]?.label;
            items.push({ id: 4, text: `Marketing strategy: ${label}.`, time: '8m ago', icon: Rocket, color: 'text-fuchsia-400' });
        }
        if (items.length === 0) {
            items.push({ id: 5, text: 'No modules selected yet — head to the configurator.', time: 'Now', icon: AlertCircle, color: 'text-amber-400' });
        }
        if (items.length < 4) {
            items.push({ id: 6, text: `Project "${idea?.slice(0, 30) || 'Untitled'}" created.`, time: 'Earlier', icon: MessageSquare, color: 'text-slate-400' });
        }
        return items;
    }, [selections, idea]);

    return (
        <div className="w-full h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wide flex items-center gap-2">
                    <MessageSquare size={20} className="text-fuchsia-400" />
                    Comm Hub
                </h3>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Live</span>
            </div>

            <div className="flex flex-col gap-4 flex-1">
                <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg text-white">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider">Est. Completion</div>
                            <div className="text-lg font-bold text-white">{timelineStr}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                                Based on {PRICING_DATA.design[design]?.label ?? 'Minimal'} design tier
                            </div>
                        </div>
                    </div>
                    <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-xs text-white uppercase font-bold rounded transition-colors cursor-pointer">
                        Sync
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                    <div className="text-xs text-slate-500 uppercase tracking-wider pb-1">
                        Project Updates
                    </div>
                    {updates.map((update) => (
                        <div key={update.id} className="flex gap-3 group">
                            <div className="pt-0.5 shrink-0">
                                <update.icon size={13} className={update.color} />
                            </div>
                            <div className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                <p className="leading-snug">{update.text}</p>
                                <span className="text-[10px] text-slate-500 block mt-0.5">{update.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
