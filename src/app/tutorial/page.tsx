'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, PlayCircle, Hammer, Headphones, ArrowLeft } from 'lucide-react';
import { useBuilderStore } from '@/store/builderStore';
import PageTransition from '@/components/PageTransition';

export default function TutorialPage() {
    const router = useRouter();
    const idea = useBuilderStore((state) => state.idea);
    const [hydrated, setHydrated] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        setHydrated(true);
    }, []);

    // Route guard: redirect if no idea
    useEffect(() => {
        if (hydrated && !idea) {
            router.replace('/');
        }
    }, [hydrated, idea, router]);

    useEffect(() => {
        if (step < 3) {
            const timer = setTimeout(() => {
                setStep(prev => prev + 1);
            }, step === 0 ? 1000 : step === 1 ? 3000 : 5000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const handleWatchAgain = () => {
        setStep(0);
    };

    const handleConnectAgent = () => {
        alert("Establishing secure uplink to Builder Support Agent... (Stub)");
    };

    const handleFastForward = () => {
        if (step < 3) {
            setStep(prev => prev + 1);
        }
    };

    if (!hydrated) return <div className="min-h-screen bg-obsidian" />;

    return (
        <PageTransition>
            <div
                onClick={handleFastForward}
                className="w-full h-screen bg-obsidian flex flex-col items-center justify-center p-8 text-center text-silver relative overflow-hidden cursor-pointer"
            >
                {/* Back Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); router.push('/'); }}
                    className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all cursor-pointer"
                >
                    <ArrowLeft size={16} /> Back
                </button>

                {/* Ambient Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-obsidian to-obsidian pointer-events-none" />

                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mb-8 relative z-10 pointer-events-none"
                >
                    <Bot size={64} className="text-cyber-cyan animate-pulse" />
                </motion.div>

                <div className="max-w-2xl h-48 flex flex-col items-center relative z-10 pointer-events-none">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-2xl font-mono"
                            >
                                Initializing Architect Mode...
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className="text-white font-bold text-3xl mb-2">Welcome, Founder.</div>
                                <div className="text-lg text-gray-400">
                                    Let&apos;s assemble your vision: <span className="text-cyber-cyan underline">{idea || "The Next Big Thing"}</span>.
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-xl text-gray-300 leading-relaxed max-w-lg"
                            >
                                On the next screen, you will choose components for your company.
                                <br />
                                <span className="text-cyber-cyan font-bold">Stack bricks to build your quote.</span>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center gap-6 pointer-events-auto"
                            >
                                <div className="text-3xl font-black text-white uppercase tracking-widest">
                                    System Ready
                                </div>

                                <div className="flex flex-wrap justify-center gap-4">
                                    <button
                                        onClick={handleWatchAgain}
                                        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-lg transition-all cursor-pointer"
                                    >
                                        <PlayCircle size={20} /> Watch Again
                                    </button>

                                    <button
                                        onClick={handleConnectAgent}
                                        className="flex items-center gap-2 px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500 text-purple-300 rounded-lg transition-all cursor-pointer"
                                    >
                                        <Headphones size={20} /> Help Me Choose
                                    </button>

                                    <button
                                        onClick={() => router.push('/configurator')}
                                        className="flex items-center gap-2 px-8 py-3 bg-cyber-cyan hover:bg-white text-obsidian font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(102,252,241,0.4)] hover:scale-105 cursor-pointer"
                                    >
                                        <Hammer size={20} /> Ready to Build
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Skip Intro button */}
                {step < 3 && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setStep(3)}
                        className="absolute bottom-8 text-sm text-gray-500 hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
                    >
                        Skip Intro
                    </motion.button>
                )}
            </div>
        </PageTransition>
    );
}
