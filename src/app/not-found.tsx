import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-6">
        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-purple-500">
          404
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-cyber-cyan text-obsidian font-bold rounded-lg hover:bg-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
