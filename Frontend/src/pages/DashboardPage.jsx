// 


import { useEffect, useState, useCallback } from "react";
import { api } from "../api/opennms";

/**
 * DASHBOARD PAGE
 * Professional, clean layout for network monitoring metrics.
 */
export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get("/dashboard");
      setStats(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} retry={fetchData} />;

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Network Overview
        </h1>
        <p className="text-gray-500 mt-2">Real-time status of your Network nodes and alarms.</p>
      </header>

      <section className="space-y-8">
        {/* Node Status Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Node Inventory</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard label="Total Nodes" value={stats?.total_nodes} theme="neutral" />
            <StatCard label="Nodes Up" value={stats?.nodes_up} theme="success" />
            <StatCard label="Nodes Down" value={stats?.nodes_down} theme="danger" />
          </div>
        </div>

        {/* Alarm Severity Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Alarm Severity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <StatCard label="Total Alarms" value={stats?.total_alarms} theme="warning" isSmall />
            <StatCard label="Critical" value={stats?.critical_alarms} theme="danger" isSmall />
            <StatCard label="Major" value={stats?.major_alarms} theme="orange" isSmall />
            <StatCard label="Minor" value={stats?.minor_alarms} theme="warning" isSmall />
            <StatCard label="Warning" value={stats?.warning_alarms} theme="info" isSmall />
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * STAT CARD COMPONENT
 */
function StatCard({ label, value, theme = "neutral", isSmall = false }) {
  const themes = {
    neutral: "bg-white border-gray-200 text-gray-900",
    success: "bg-white border-emerald-100 text-emerald-600 shadow-emerald-50",
    danger: "bg-white border-rose-100 text-rose-600 shadow-rose-50",
    warning: "bg-white border-amber-100 text-amber-600 shadow-amber-50",
    orange: "bg-white border-orange-100 text-orange-600 shadow-orange-50",
    info: "bg-white border-blue-100 text-sky-600 shadow-sky-50",
  };

  return (
    <div className={`
      relative overflow-hidden rounded-xl border p-5 transition-all duration-200 hover:shadow-md
      ${themes[theme]}
    `}>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className={`${isSmall ? 'text-2xl' : 'text-4xl'} font-bold`}>
        {value?.toLocaleString() ?? 0}
      </p>
      {/* Subtle background accent */}
      <div className={`absolute bottom-0 right-0 w-12 h-12 -mb-4 -mr-4 opacity-10 rounded-full bg-current`} />
    </div>
  );
}

/**
 * FEEDBACK COMPONENTS
 */
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="text-gray-500 font-medium">Fetching dashboard metrics...</p>
    </div>
  );
}

function ErrorState({ message, retry }) {
  return (
    <div className="m-8 p-6 bg-red-50 border border-red-100 rounded-lg text-center">
      <p className="text-red-700 font-semibold mb-2">Failed to load data</p>
      <p className="text-red-500 text-sm mb-4">{message}</p>
      <button 
        onClick={retry}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}