'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, Zap, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data generator
const generateData = (prevData: any[], count: number) => {
    const lastPoint = prevData[prevData.length - 1] || { time: 0, users: 420, load: 88 };
    // Simulate rapid growth if count > 10 to trigger upsell
    const userGrowth = Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 1 : -1;
    const newUsers = Math.max(400, lastPoint.users + userGrowth); // Always > 400 to approach 450

    const loadChange = Math.random() > 0.5 ? 1 : -1;
    const newLoad = Math.min(99, Math.max(80, lastPoint.load + loadChange));

    // Determine time label (hh:mm:ss) - mocked
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    return {
        time: timeStr,
        users: newUsers,
        load: newLoad,
    };
};

export default function LiveTelemetry() {
    const [data, setData] = useState([
        { time: '10:00', users: 420, load: 88 },
        { time: '10:05', users: 425, load: 89 },
        { time: '10:10', users: 432, load: 87 },
        { time: '10:15', users: 438, load: 90 },
        { time: '10:20', users: 442, load: 91 },
    ]);
    const [showUpsell, setShowUpsell] = useState(false);
    const [isUpgrading, setIsUpgrading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev) => {
                const newDataPoint = generateData(prev, prev.length);
                const newData = [...prev.slice(1), newDataPoint];

                // Trigger Upsell Logic
                if (newDataPoint.users > 450) {
                    setShowUpsell(true);
                }

                return newData;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const latest = data[data.length - 1];

    return (
        <div className="w-full h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-2 z-10">
                <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wide flex items-center gap-2">
                    <Activity size={20} className="text-blue-400" />
                    Live Telemetry
                </h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs text-blue-300 font-mono">{latest.users} Users</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full animate-pulse", latest.load > 90 ? "bg-rose-500" : "bg-emerald-500")} />
                        <span className={cn("text-xs font-mono", latest.load > 90 ? "text-rose-400" : "text-emerald-400")}>CPU {latest.load}%</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full h-full min-h-[150px] relative z-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                            itemStyle={{ color: '#3b82f6' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="users"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorUsers)"
                            isAnimationActive={false} // smoother real-time updates
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Upsell Alert Overlay */}
            <AnimatePresence>
                {showUpsell && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="absolute inset-x-4 bottom-4 bg-slate-900/90 border border-rose-500/50 p-4 rounded-xl shadow-[0_0_30px_rgba(244,63,94,0.3)] z-50 flex items-center justify-between backdrop-blur-md"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-rose-500/20 rounded-lg text-rose-500 animate-bounce">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h4 className="text-rose-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                    Critical Alert
                                    <span className="text-[10px] bg-rose-500/20 px-1 rounded text-rose-300">Database at 90%</span>
                                </h4>
                                <p className="text-slate-300 text-xs mt-1">Shared node capacity limit reached ({latest.users}/500).</p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setIsUpgrading(true);
                                setTimeout(() => {
                                    setIsUpgrading(false);
                                    setShowUpsell(false);
                                    setData(prev => prev.map(d => ({ ...d, load: 40 }))); // Reset load simulation
                                }, 2000);
                            }}
                            disabled={isUpgrading}
                            className="px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs uppercase rounded shadow-lg flex items-center gap-2 transition-all"
                        >
                            {isUpgrading ? (
                                <>
                                    <Server size={14} className="animate-spin" />
                                    Upgrading...
                                </>
                            ) : (
                                <>
                                    <Zap size={14} />
                                    Upgrade Core
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
