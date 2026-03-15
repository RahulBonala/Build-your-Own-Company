'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilderStore } from '@/store/builderStore';
import { ArrowLeft, Lock, Zap, ChevronRight, ShoppingCart, Settings } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'chat' | 'generating' | 'preview';
type Message = { role: 'user' | 'ai'; text: string; id: string };

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_Q = 5;
const GEN_STEPS = [
    'Analyzing your requirements...',
    'Designing the layout...',
    'Writing HTML structure...',
    'Building components...',
    'Styling with your brand colors...',
    'Adding scroll animations...',
    'Polishing the UI...',
    'Almost ready...',
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DemoPage() {
    const router = useRouter();
    const { idea, selections } = useBuilderStore();

    // ── Hydration guard + route guard
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => { setHydrated(true); }, []);
    useEffect(() => {
        if (hydrated && !idea) router.replace('/');
    }, [hydrated, idea, router]);

    // ── Phase state
    const [phase, setPhase] = useState<Phase>('chat');

    // ── Chat state
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isBusy, setIsBusy] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [summary, setSummary] = useState('');
    const historyRef = useRef<{ role: string; content: string }[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // ── Preview state
    const [generatedHtml, setGeneratedHtml] = useState('');
    const [streamingCode, setStreamingCode] = useState('');
    const [genStepLabel, setGenStepLabel] = useState(GEN_STEPS[0]);
    const [genProgress, setGenProgress] = useState(0);

    // ── Continue button logic
    const isFullyConfigured = Object.values(selections).every(Boolean);

    // ── Code protection — block all copy/inspect shortcuts globally
    useEffect(() => {
        if (phase !== 'preview') return;
        const blockShortcuts = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            const modifier = e.ctrlKey || e.metaKey;
            if (modifier && ['c', 'a', 'u', 's', 'p'].includes(key)) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        document.addEventListener('keydown', blockShortcuts, true);
        return () => document.removeEventListener('keydown', blockShortcuts, true);
    }, [phase]);

    // ── Auto-scroll chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isBusy]);

    // ── Boot: fetch first Pixel message
    useEffect(() => {
        if (!hydrated || !idea) return;
        bootPixel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hydrated, idea]);

    // ── Helpers ───────────────────────────────────────────────────────────────

    function pushMessage(role: 'user' | 'ai', text: string) {
        setMessages(prev => [...prev, { role, text, id: `${Date.now()}-${Math.random()}` }]);
    }

    async function bootPixel() {
        setIsBusy(true);
        const seed = [{ role: 'user', content: 'Greet me in ONE warm sentence, then immediately ask Q1/5.' }];
        try {
            const res = await fetch('/api/pixel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: seed, idea }),
            });
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();
            const text = data.text || fallbackQ(1);
            historyRef.current = [...seed, { role: 'assistant', content: text }];
            pushMessage('ai', text);
            setQuestionIndex(1);
        } catch {
            const text = fallbackQ(1);
            historyRef.current = [{ role: 'assistant', content: text }];
            pushMessage('ai', text);
            setQuestionIndex(1);
        }
        setIsBusy(false);
        setTimeout(() => inputRef.current?.focus(), 150);
    }

    function fallbackQ(n: number): string {
        const fallbacks: Record<number, string> = {
            1: `Hey Founder! 🚀 Love the idea — let's build your demo!\n\nQ1/5: Who is your primary target user — their role, age range, and the main problem this solves for them?`,
            2: `Q2/5: What design vibe fits best?\nA: Clean & minimal (white space, subtle)\nB: Bold & energetic (vivid colors, punchy)\nC: Premium & dark (luxury, sophisticated)`,
            3: `Q3/5: Which three sections are must-haves for your landing page? (e.g. hero, pricing, features, testimonials, how-it-works, FAQ, waitlist...)`,
            4: `Q4/5: What is the single primary action you want a first-time visitor to take? (e.g. "Sign up free", "Book a demo", "Join waitlist")`,
            5: `Q5/5: What is the ONE feature that makes this idea unforgettable — the thing no competitor does?`,
        };
        return fallbacks[n] ?? `Q${n}/5: Tell me more about what makes this special.`;
    }

    async function sendMessage(text: string) {
        if (!text.trim() || isBusy || isDone) return;
        const trimmed = text.trim();
        setInput('');
        pushMessage('user', trimmed);
        setIsBusy(true);

        const newHistory = [
            ...historyRef.current,
            { role: 'user', content: trimmed },
        ];

        try {
            const res = await fetch('/api/pixel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newHistory, idea }),
            });
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();
            const replyText: string = data.text || '';

            historyRef.current = [...newHistory, { role: 'assistant', content: replyText }];

            if (replyText.includes('DONE||')) {
                const parts = replyText.split('DONE||');
                const brief = parts[1]?.trim() || replyText;
                setSummary(brief);
                pushMessage('ai', `✅ Requirements captured!\n\n**Your Design Brief:**\n${brief}\n\nClick the button below to watch your website come to life!`);
                setIsDone(true);
                setQuestionIndex(MAX_Q);
            } else {
                pushMessage('ai', replyText);
                setQuestionIndex(prev => Math.min(prev + 1, MAX_Q));
            }
        } catch {
            const nextQ = questionIndex + 1;
            if (nextQ > MAX_Q) {
                const brief = "A stunning modern landing page with vibrant colors, an engaging hero section, and smooth scroll animations.";
                setSummary(brief);
                pushMessage('ai', `✅ Requirements captured!\n\n**Your Design Brief:**\n${brief}\n\nClick the button below to watch your website come to life!`);
                setIsDone(true);
                setQuestionIndex(MAX_Q);
            } else {
                const fallbackText = fallbackQ(nextQ);
                historyRef.current = [...newHistory, { role: 'assistant', content: fallbackText }];
                pushMessage('ai', fallbackText);
                setQuestionIndex(nextQ);
            }
        }

        setIsBusy(false);
        setTimeout(() => inputRef.current?.focus(), 120);
    }

    async function startGeneration() {
        setPhase('generating');
        setGenProgress(0);
        let stepIdx = 0;

        const stepInterval = setInterval(() => {
            stepIdx = (stepIdx + 1) % GEN_STEPS.length;
            setGenStepLabel(GEN_STEPS[stepIdx]);
            setGenProgress(prev => Math.min(prev + 11, 90));
        }, 1200);

        try {
            const res = await fetch('/api/generate-demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idea, summary, selections }),
            });
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();
            clearInterval(stepInterval);
            setGenProgress(100);

            let html: string = data.html || getErrorHtml();
            setGeneratedHtml(html);

            // Small delay so progress bar hits 100% visually
            await new Promise(r => setTimeout(r, 400));
            setPhase('preview');

            // Stream code character by character
            let i = 0;
            const CHUNK = 80;
            const codeInterval = setInterval(() => {
                if (i >= html.length) {
                    clearInterval(codeInterval);
                    setStreamingCode(html);
                    return;
                }
                setStreamingCode(html.slice(0, i + CHUNK));
                i += CHUNK;
            }, 14);

        } catch {
            clearInterval(stepInterval);
            setGeneratedHtml(getErrorHtml());
            setPhase('preview');
        }
    }

    function getErrorHtml(): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .reveal { animation: fadeInUp 0.8s ease-out forwards; }
    </style>
</head>
<body class="bg-slate-900 text-white font-sans antialiased min-h-screen flex flex-col items-center justify-center p-8 text-center">
    <div class="max-w-2xl reveal border border-slate-800 bg-slate-800/50 p-12 rounded-3xl shadow-2xl backdrop-blur-sm">
        <div class="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20">🚀</div>
        <h1 class="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            ${idea || 'Waitlist Startup'}
        </h1>
        <p class="text-lg text-slate-400 mb-8 leading-relaxed">
            API Rate Limit Reached!<br/><br/>But don't worry, this fallback page proves that our split-screen preview, layout frames, and code protection mechanisms are fully functional.
        </p>
        <div class="flex items-center justify-center gap-4">
            <button class="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors">Join Waitlist</button>
            <button class="px-6 py-3 bg-white/10 hover:bg-white/20 font-semibold rounded-lg transition-colors border border-white/10">Learn More</button>
        </div>
    </div>
</body>
</html>`;
    }

    function handleContinue() {
        if (isFullyConfigured) {
            router.push('/checkout');
        } else {
            router.push('/configurator');
        }
    }

    // ── Render guards ─────────────────────────────────────────────────────────

    if (!hydrated) return <div className="min-h-screen bg-obsidian" />;

    // ── Phase: Generating ─────────────────────────────────────────────────────

    if (phase === 'generating') {
        return (
            <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center gap-8 p-8">
                {/* Triple ring spinner */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-cyber-cyan/10" />
                    <div
                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyber-cyan"
                        style={{ animation: 'spin 1s linear infinite' }}
                    />
                    <div
                        className="absolute inset-3 rounded-full border-2 border-transparent border-t-purple-500"
                        style={{ animation: 'spin 0.7s linear infinite reverse' }}
                    />
                    <div
                        className="absolute inset-6 rounded-full border-2 border-transparent border-t-cyber-cyan/50"
                        style={{ animation: 'spin 1.4s linear infinite' }}
                    />
                    <span className="text-2xl">⚡</span>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black text-white tracking-tight">Building Your Demo</h2>
                    <p
                        className="text-cyber-cyan font-mono text-sm"
                        style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
                    >
                        {genStepLabel}
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-cyber-cyan to-purple-500 rounded-full"
                        animate={{ width: `${genProgress}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                </div>

                {/* Animated dots */}
                <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map(i => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 bg-cyber-cyan rounded-full"
                            style={{
                                animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                            }}
                        />
                    ))}
                </div>

                <style>{`
                    @keyframes spin { to { transform: rotate(360deg); } }
                    @keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
                    @keyframes bounce { 0%,100%{transform:scale(.7);opacity:.3} 50%{transform:scale(1.2);opacity:1} }
                `}</style>
            </div>
        );
    }

    // ── Phase: Preview (split screen) ─────────────────────────────────────────

    if (phase === 'preview') {
        const continueLabel = isFullyConfigured
            ? '⚡ Continue to Checkout'
            : '🔧 Back to Configurator';
        const continueSubtext = isFullyConfigured
            ? 'All 4 modules selected — ready to launch'
            : `${Object.values(selections).filter(Boolean).length}/4 modules selected — continue building`;

        return (
            <div className="w-full h-screen bg-obsidian flex flex-col overflow-hidden">
                {/* Top bar */}
                <div className="h-11 bg-slate-950 border-b border-glass-border flex items-center justify-between px-4 shrink-0 z-30">
                    <div className="flex items-center gap-3">
                        <span className="text-cyber-cyan font-black text-xs font-mono tracking-widest">BYOC DEMO</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono">
                            LIVE PREVIEW
                        </span>
                    </div>
                    <button
                        onClick={() => { setPhase('chat'); setGeneratedHtml(''); setStreamingCode(''); }}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-glass-border transition-all cursor-pointer"
                    >
                        <ArrowLeft size={12} /> Rebuild
                    </button>
                </div>

                {/* Main split screen */}
                <div className="flex-1 flex overflow-hidden relative">
                    {/* ── LEFT: Website Preview ── */}
                    <div className="w-[60%] flex flex-col border-r border-glass-border">
                        {/* Browser chrome */}
                        <div className="h-9 bg-slate-900 flex items-center gap-3 px-3 shrink-0 border-b border-glass-border">
                            <div className="flex gap-1.5">
                                {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
                                    <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                                ))}
                            </div>
                            <div className="flex-1 bg-black/30 rounded h-5 flex items-center px-2.5 overflow-hidden">
                                <span className="text-[10px] text-gray-500 font-mono truncate">
                                    preview.byoc.studio/{idea.toLowerCase().replace(/\s+/g, '-').slice(0, 40)}
                                </span>
                            </div>
                        </div>

                        {/* Preview iframe + protection overlay */}
                        <div
                            className="flex-1 relative"
                            onContextMenu={e => e.preventDefault()}
                        >
                            <iframe
                                srcDoc={generatedHtml}
                                sandbox="allow-scripts"
                                className="w-full h-full border-none"
                                title="Demo Preview"
                            />
                            {/* Transparent overlay — blocks right-click, drag, text-select on the preview */}
                            <div
                                className="absolute inset-0 z-10"
                                onContextMenu={e => e.preventDefault()}
                                onDragStart={e => e.preventDefault()}
                                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                            />
                        </div>
                    </div>

                    {/* ── RIGHT: Protected Code Panel ── */}
                    <div
                        className="w-[40%] flex flex-col bg-[#020817] overflow-hidden"
                        onContextMenu={e => e.preventDefault()}
                        onCopy={e => e.preventDefault()}
                        onCut={e => e.preventDefault()}
                    >
                        {/* Code panel header */}
                        <div className="h-9 bg-slate-950/80 border-b border-glass-border flex items-center justify-between px-3 shrink-0">
                            <span className="text-[10px] text-gray-500 font-mono">index.html</span>
                            <div className="flex items-center gap-1.5">
                                <Lock size={10} className="text-amber-400" />
                                <span className="text-[10px] text-amber-400/80 font-mono">Code protected</span>
                                {streamingCode.length < generatedHtml.length ? (
                                    <span className="text-[10px] text-purple-400 font-mono bg-purple-500/10 px-1.5 rounded border border-purple-500/20">
                                        Writing {Math.round((streamingCode.length / Math.max(generatedHtml.length, 1)) * 100)}%
                                    </span>
                                ) : (
                                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 rounded border border-emerald-500/20">
                                        {generatedHtml.split('\n').length} lines
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Code display — fully protected */}
                        <div
                            className="flex-1 overflow-auto relative group"
                            style={{
                                userSelect: 'none',
                                WebkitUserSelect: 'none',
                                MozUserSelect: 'none',
                                msUserSelect: 'none',
                            } as React.CSSProperties}
                            onContextMenu={e => e.preventDefault()}
                            onMouseDown={e => {
                                if (e.detail > 1) e.preventDefault(); // block double-click select
                            }}
                        >
                            <pre
                                className="p-3 font-mono text-[11px] leading-relaxed text-slate-400 whitespace-pre-wrap break-all pointer-events-none"
                                style={{
                                    userSelect: 'none',
                                    WebkitUserSelect: 'none',
                                } as React.CSSProperties}
                            >
                                {streamingCode}
                            </pre>

                            {/* Hover protection overlay with tooltip */}
                            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                                <div className="flex items-center gap-2 bg-slate-900/95 border border-amber-500/30 px-4 py-2 rounded-lg shadow-xl">
                                    <Lock size={14} className="text-amber-400" />
                                    <span className="text-xs text-amber-300 font-mono">Purchase to access source code</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── CONTINUE YOUR BUILD BUTTON — fixed bottom center ── */}
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                    className="absolute bottom-0 left-0 right-0 z-40 flex flex-col items-center pb-5 pt-3 bg-gradient-to-t from-obsidian via-obsidian/95 to-transparent pointer-events-none"
                >
                    <div className="pointer-events-auto flex flex-col items-center gap-1.5">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleContinue}
                            className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-2xl cursor-pointer transition-all ${
                                isFullyConfigured
                                    ? 'bg-cyber-cyan text-obsidian shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:bg-white'
                                    : 'bg-purple-500/90 text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] hover:bg-purple-400'
                            }`}
                        >
                            {isFullyConfigured
                                ? <><Zap size={16} /> {continueLabel}</>
                                : <><Settings size={16} /> {continueLabel}</>
                            }
                            <ChevronRight size={16} />
                        </motion.button>

                        <span className="text-[10px] text-gray-500 font-mono tracking-wider">
                            {continueSubtext}
                        </span>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ── Phase: Chat ───────────────────────────────────────────────────────────

    const progress = isDone ? 100 : (questionIndex / MAX_Q) * 100;

    return (
        <PageTransition>
            <div className="w-full h-screen bg-obsidian flex flex-col overflow-hidden text-silver">
                {/* Header */}
                <div className="h-14 bg-slate-950/80 border-b border-glass-border flex items-center justify-between px-4 shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push('/configurator')}
                            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-glass-border transition-all cursor-pointer"
                        >
                            <ArrowLeft size={12} /> Back
                        </button>

                        {/* Pixel avatar + name */}
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-cyan to-purple-500 flex items-center justify-center text-sm shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                                ⚡
                            </div>
                            <div>
                                <div className="text-sm font-bold leading-tight text-white">Pixel AI</div>
                                <div className="text-[10px] text-cyber-cyan font-mono leading-tight truncate max-w-[160px] lg:max-w-none">
                                    {idea}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress tracker */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] text-gray-500 font-mono">
                            {isDone ? '✓ Ready to generate' : `Q${Math.min(questionIndex, MAX_Q)} of ${MAX_Q}`}
                        </span>
                        <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: isDone ? '#22c55e' : '#22d3ee' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3">
                    <AnimatePresence initial={false}>
                        {messages.map(msg => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2.5 items-end`}
                            >
                                {msg.role === 'ai' && (
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyber-cyan to-purple-500 flex items-center justify-center text-xs shrink-0 mb-0.5">
                                        ⚡
                                    </div>
                                )}
                                <div
                                    className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                                        msg.role === 'user'
                                            ? 'bg-cyber-cyan/10 border border-cyber-cyan/20 text-silver rounded-br-md'
                                            : 'bg-white/5 border border-glass-border text-slate-300 rounded-bl-md'
                                    }`}
                                >
                                    {msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Typing indicator */}
                    {isBusy && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-end gap-2.5"
                        >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyber-cyan to-purple-500 flex items-center justify-center text-xs shrink-0">
                                ⚡
                            </div>
                            <div className="px-4 py-3 bg-white/5 border border-glass-border rounded-2xl rounded-bl-md flex gap-1.5 items-center">
                                {[0, 1, 2].map(i => (
                                    <div
                                        key={i}
                                        className="w-1.5 h-1.5 bg-cyber-cyan rounded-full"
                                        style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Generate button — appears when all 5 questions answered */}
                <AnimatePresence>
                    {isDone && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="px-4 pt-2 pb-3 bg-cyber-cyan/5 border-t border-cyber-cyan/15 shrink-0"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={startGeneration}
                                className="w-full py-4 bg-gradient-to-r from-cyber-cyan to-purple-500 text-obsidian font-black text-base uppercase tracking-widest rounded-xl shadow-[0_0_24px_rgba(34,211,238,0.3)] hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                ⚡ Generate My Demo Website
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Input bar */}
                {!isDone && (
                    <div className="px-4 py-3 border-t border-glass-border bg-slate-950/60 shrink-0 flex gap-2">
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage(input);
                                }
                            }}
                            placeholder="Type your answer and press Enter..."
                            disabled={isBusy}
                            className="flex-1 bg-white/5 border border-glass-border rounded-xl px-4 py-3 text-sm text-silver placeholder-gray-600 outline-none focus:border-cyber-cyan/40 transition-colors disabled:opacity-40"
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            disabled={isBusy || !input.trim()}
                            className={`px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                                input.trim() && !isBusy
                                    ? 'bg-cyber-cyan text-obsidian hover:bg-white'
                                    : 'bg-white/5 text-gray-600 cursor-not-allowed border border-glass-border'
                            }`}
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes bounce {
                    0%,100% { transform: scale(0.7); opacity: 0.3; }
                    50%    { transform: scale(1.2); opacity: 1;   }
                }
            `}</style>
        </PageTransition>
    );
}
