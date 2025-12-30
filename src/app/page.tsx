'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useBuilderStore } from '@/store/builderStore';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const setIdea = useBuilderStore((state) => state.setIdea);
  const [inputValue, setInputValue] = useState('');
  const [isWarping, setIsWarping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.left = `${e.clientX}px`;
          spotlightRef.current.style.top = `${e.clientY}px`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIdea(inputValue);
    setIsWarping(true);

    // Simulate warp speed delay before navigation
    setTimeout(() => {
      router.push('/tutorial');
    }, 1500);
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-obsidian text-silver">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Spotlight */}
      <div
        ref={spotlightRef}
        className="fixed w-[600px] h-[600px] bg-cyber-cyan/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: isWarping ? 0 : 1 }}
      />

      {/* Stars / Warp Effect */}
      {isWarping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 pointer-events-none"
        >
          <div className="w-full h-full bg-black/80 flex items-center justify-center backdrop-blur-sm">
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 30, opacity: 1 }}
              transition={{ duration: 1.2, ease: "anticipate" }}
              className="text-cyber-cyan text-4xl font-bold tracking-[1em] whitespace-nowrap"
            >
              WARPING...
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 w-full max-w-2xl px-4"
        animate={isWarping ? { scale: 0.8, opacity: 0, filter: 'blur(10px)' } : { scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-black text-center text-white tracking-tight leading-tight">
          Don&apos;t just hire an agency.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-purple-500">
            Build your company.
          </span>
        </h1>

        <form onSubmit={handleSubmit} className="w-full relative group max-w-lg mt-8">
          <div className={`absolute -inset-1 bg-gradient-to-r from-cyber-cyan to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 ${isWarping ? 'opacity-100 duration-75' : ''}`}></div>
          <div className="relative flex items-center bg-obsidian border border-glass-border rounded-lg p-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What is your idea? (e.g. Tinder for Cats)"
              className="w-full bg-transparent text-silver placeholder-gray-600 px-6 py-4 text-xl outline-none font-light selection:bg-cyber-cyan selection:text-obsidian"
              autoFocus
            />
            <button
              type="submit"
              className="p-3 bg-cyber-cyan/10 hover:bg-cyber-cyan/20 text-cyber-cyan rounded-md transition-colors mr-1 cursor-pointer"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </form>

        <motion.p
          className="text-xs text-gray-500 font-mono tracking-widest uppercase mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Press Enter to Initialize
        </motion.p>
      </motion.div>
    </div>
  );
}
