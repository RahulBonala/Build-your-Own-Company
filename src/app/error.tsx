'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Send to error reporting service (e.g. Sentry)
  }, [error]);

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-3xl">
          !
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Something went wrong
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          An unexpected error occurred. Please try again or return to the home page.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-cyber-cyan text-obsidian font-bold rounded-lg hover:bg-white transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/5 border border-glass-border text-silver rounded-lg hover:bg-white/10 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
