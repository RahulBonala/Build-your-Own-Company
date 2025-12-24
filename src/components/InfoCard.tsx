'use client';
import { motion } from 'framer-motion';

interface InfoCardProps {
    title: string;
    description: string;
    details: string[];
}

export const InfoCard = ({ title, description, details }: InfoCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-full top-0 mr-4 w-64 p-4 rounded-xl bg-slate-900/90 border border-glass-border backdrop-blur-xl shadow-2xl z-50 pointer-events-none"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none" />

            <h3 className="text-white font-bold text-lg mb-1 relative z-10">{title}</h3>
            <p className="text-cyan-400 text-xs font-mono mb-3 uppercase tracking-wider relative z-10">{description}</p>

            <ul className="space-y-2 relative z-10">
                {details.map((detail, index) => (
                    <li key={index} className="text-gray-300 text-xs flex items-start gap-2 leading-relaxed">
                        <span className="text-cyan-500 mt-0.5">•</span>
                        {detail}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};
