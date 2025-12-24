'use client';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface InfoCardProps {
    title: string;
    description: string;
    details: string[];
}

export const InfoCard = ({ title, description, details, position }: InfoCardProps & { position?: { top: number } }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
                top: position?.top // Only applies on desktop where we use top
            }}
            className={clsx(
                // Mobile: Fixed at bottom, full width, rounded top only
                "fixed bottom-0 left-0 w-full p-6 rounded-t-xl bg-slate-900/95 border-t border-glass-border backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-[100]",
                // Desktop (lg): Fixed to the left of the sidebar, vertically aligned, rounded full
                "lg:bottom-auto lg:right-[40%] lg:mr-4 lg:w-72 lg:rounded-xl lg:border lg:shadow-2xl lg:-translate-y-1/2"
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent mobile:rounded-t-xl lg:rounded-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-2">
                <div>
                    <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
                    <p className="text-cyan-400 text-xs font-mono uppercase tracking-wider">{description}</p>
                </div>

                <div className="h-px bg-white/10 w-full my-1" />

                <ul className="space-y-2">
                    {details.map((detail, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start gap-2 leading-relaxed">
                            <span className="text-cyan-500 mt-1">•</span>
                            {detail}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};
