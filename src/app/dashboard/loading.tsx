export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="animate-pulse space-y-6 max-w-7xl mx-auto">
        <div className="h-10 w-64 bg-slate-800 rounded" />
        <div className="h-[200px] bg-slate-800/50 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[300px] bg-slate-800/50 rounded-2xl" />
          <div className="h-[300px] bg-slate-800/50 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
