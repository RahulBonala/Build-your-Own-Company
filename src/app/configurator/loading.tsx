export default function ConfiguratorLoading() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-cyber-cyan/20 border-t-cyber-cyan rounded-full animate-spin" />
        <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">
          Loading Configurator
        </span>
      </div>
    </div>
  );
}
