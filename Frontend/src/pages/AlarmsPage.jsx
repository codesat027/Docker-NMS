// // import React from 'react';
// // import { useAlarms } from '../hooks/useAlarms';

// // const Alarms = () => {
// //   const { alarms, loading } = useAlarms();

// //   // Helper to color-code the severity
// //   const getSeverityClass = (severity) => {
// //     switch (severity?.toLowerCase()) {
// //       case 'critical': return 'bg-red-500 text-white';
// //       case 'major': return 'bg-orange-500 text-white';
// //       case 'minor': return 'bg-yellow-400 text-black';
// //       case 'warning': return 'bg-blue-400 text-white';
// //       default: return 'bg-gray-300 text-gray-800';
// //     }
// //   };

// //   if (loading) return <div className="p-10 text-center text-lg">Loading Alarms...</div>;

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-6">Active Alarms</h1>
// //       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
// //         <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-4 py-3 font-semibold text-gray-900">Severity</th>
// //               <th className="px-4 py-3 font-semibold text-gray-900">Node</th>
// //               <th className="px-4 py-3 font-semibold text-gray-900">Description</th>
// //               <th className="px-4 py-3 font-semibold text-gray-900">Last Seen</th>
// //               <th className="px-4 py-3 font-semibold text-gray-900">Action</th>
              
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-200 bg-white">
// //             {alarms.map((alarm) => (
// //               <tr key={alarm.id} className="hover:bg-gray-50">
// //                 <td className="px-4 py-3 whitespace-nowrap">
// //                   <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getSeverityClass(alarm.severity.label)}`}>
// //                     {alarm.severity.label}
// //                   </span>
// //                 </td>
// //                 <td className="px-4 py-3 font-medium text-gray-900">{alarm.nodeLabel}</td>
// //                 <td className="px-4 py-3 text-gray-600 truncate max-w-xs">{alarm.description}</td>
// //                 <td className="px-4 py-3 text-gray-500">
// //                   {new Date(alarm.lastEventTime).toLocaleString()}
// //                 </td>
// //                 <td className="px-4 py-3">
// //                   <button className="text-indigo-600 hover:text-indigo-900 font-medium">
// //                     Ack
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Alarms;

// import { useState } from "react"
// import { useAlarms } from "../hooks/useAlarms"

// export default function AlarmsPage() {
//     const [severity, setSeverity] = useState("")
//     const { alarms, loading, error } = useAlarms(
//         severity ? { severity } : {}
//     )

//     if (loading) return <div className="p-4">Loading alarms...</div>
//     if (error)   return <div className="p-4 text-red-500">Error: {error}</div>

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Alarms</h1>

//             {/* filter */}
//             <select
//                 value={severity}
//                 onChange={e => setSeverity(e.target.value)}
//                 className="border rounded px-3 py-2 text-sm mb-4"
//             >
//                 <option value="">All Severities</option>
//                 <option value="CRITICAL">Critical</option>
//                 <option value="MAJOR">Major</option>
//                 <option value="MINOR">Minor</option>
//                 <option value="WARNING">Warning</option>
//             </select>

//             {/* table */}
//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 text-left border">ID</th>
//                             <th className="p-3 text-left border">Node</th>
//                             <th className="p-3 text-left border">Severity</th>
//                             <th className="p-3 text-left border">Description</th>
//                             <th className="p-3 text-left border">Last Event</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {alarms.map(alarm => (
//                             <tr key={alarm.id} className="hover:bg-gray-50">
//                                 <td className="p-3 border">{alarm.id}</td>
//                                 <td className="p-3 border">{alarm.nodeLabel ?? "N/A"}</td>
//                                 <td className="p-3 border">
//                                     <SeverityBadge severity={alarm.severity?.label ?? alarm.severity} />
//                                 </td>
//                                 <td className="p-3 border">{alarm.description?.replace(/<[^>]*>/g, '')}</td>
//                                 <td className="p-3 border">
//                                     {alarm.lastEventTime
//                                         ? new Date(alarm.lastEventTime).toLocaleString()
//                                         : "N/A"}
//                                 </td>
//                             </tr>
//                         ))}
//                         {alarms.length === 0 && (
//                             <tr>
//                                 <td colSpan={5} className="p-4 text-center text-gray-400">
//                                     No alarms found
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// function SeverityBadge({ severity }) {
//     const colors = {
//         CRITICAL: "bg-red-100 text-red-700",
//         MAJOR:    "bg-orange-100 text-orange-700",
//         MINOR:    "bg-yellow-100 text-yellow-700",
//         WARNING:  "bg-blue-100 text-blue-700",
//         NORMAL:   "bg-green-100 text-green-700",
//     }
//     const color = colors[severity?.toUpperCase()] ?? "bg-gray-100 text-gray-700"
//     return (
//         <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
//             {severity}
//         </span>
//     )
// }


// import React from 'react';
// import { useAlarms } from '../hooks/useAlarms';

// const Alarms = () => {
//   const { alarms, loading } = useAlarms();

//   // Helper to color-code the severity
//   const getSeverityClass = (severity) => {
//     switch (severity?.toLowerCase()) {
//       case 'critical': return 'bg-red-500 text-white';
//       case 'major': return 'bg-orange-500 text-white';
//       case 'minor': return 'bg-yellow-400 text-black';
//       case 'warning': return 'bg-blue-400 text-white';
//       default: return 'bg-gray-300 text-gray-800';
//     }
//   };

//   if (loading) return <div className="p-10 text-center text-lg">Loading Alarms...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Active Alarms</h1>
//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//         <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 font-semibold text-gray-900">Severity</th>
//               <th className="px-4 py-3 font-semibold text-gray-900">Node</th>
//               <th className="px-4 py-3 font-semibold text-gray-900">Description</th>
//               <th className="px-4 py-3 font-semibold text-gray-900">Last Seen</th>
//               <th className="px-4 py-3 font-semibold text-gray-900">Action</th>

//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {alarms.map((alarm) => (
//               <tr key={alarm.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getSeverityClass(alarm.severity.label)}`}>
//                     {alarm.severity.label}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 font-medium text-gray-900">{alarm.nodeLabel}</td>
//                 <td className="px-4 py-3 text-gray-600 truncate max-w-xs">{alarm.description}</td>
//                 <td className="px-4 py-3 text-gray-500">
//                   {new Date(alarm.lastEventTime).toLocaleString()}
//                 </td>
//                 <td className="px-4 py-3">
//                   <button className="text-indigo-600 hover:text-indigo-900 font-medium">
//                     Ack
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Alarms;




import { useState } from "react"
import { useAlarms } from "../hooks/useAlarms"
import {
  AlertTriangle,
  Bell,
  RefreshCw,
  Filter,
  Clock,
  Server,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react"

export default function AlarmsPage() {
  const [severity, setSeverity] = useState("")
  const { alarms, loading, error, refetch } = useAlarms(
    severity ? { severity } : {}
  )
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    if (refetch) {
      setIsRefreshing(true)
      await refetch()
      setIsRefreshing(false)
    }
  }

  const severityStats = {
    critical: alarms?.filter(a => (a.severity?.label ?? a.severity)?.toUpperCase() === "CRITICAL").length || 0,
    major: alarms?.filter(a => (a.severity?.label ?? a.severity)?.toUpperCase() === "MAJOR").length || 0,
    minor: alarms?.filter(a => (a.severity?.label ?? a.severity)?.toUpperCase() === "MINOR").length || 0,
    warning: alarms?.filter(a => (a.severity?.label ?? a.severity)?.toUpperCase() === "WARNING").length || 0,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-muted-foreground animate-spin" />
          <p className="text-muted-foreground font-medium">Loading alarms...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <p className="text-foreground font-semibold">Failed to load alarms</p>
            <p className="text-muted-foreground text-sm mt-1">{error}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Alarms</h1>
            <p className="text-muted-foreground text-sm">
              Monitor and manage system alerts
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Critical"
          count={severityStats.critical}
          icon={XCircle}
          color="text-red-600"
          bgColor="bg-red-50"
          borderColor="border-red-200"
        />
        <StatCard
          label="Major"
          count={severityStats.major}
          icon={AlertTriangle}
          color="text-orange-600"
          bgColor="bg-orange-50"
          borderColor="border-orange-200"
        />
        <StatCard
          label="Minor"
          count={severityStats.minor}
          icon={AlertCircle}
          color="text-yellow-600"
          bgColor="bg-yellow-50"
          borderColor="border-yellow-200"
        />
        <StatCard
          label="Warning"
          count={severityStats.warning}
          icon={Bell}
          color="text-blue-600"
          bgColor="bg-blue-50"
          borderColor="border-blue-200"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="pl-9 pr-10 py-2.5 bg-background border border-input rounded-lg text-sm font-medium text-foreground appearance-none cursor-pointer hover:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-all min-w-45"
            >
              <option value="">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="MAJOR">Major</option>
              <option value="MINOR">Minor</option>
              <option value="WARNING">Warning</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {alarms?.length || 0} alarm{alarms?.length !== 1 ? "s" : ""}
          </span>
          {refetch && (
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    Node
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Last Event
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {alarms?.map((alarm) => (
                <tr
                  key={alarm.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-muted-foreground">
                      #{alarm.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-foreground">
                      {alarm.nodeLabel ?? "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <SeverityBadge
                      severity={alarm.severity?.label ?? alarm.severity}
                    />
                  </td>
                  <td className="px-6 py-4 max-w-md">
                    <p className="text-sm text-muted-foreground truncate">
                      {alarm.description?.replace(/<[^>]*>/g, "")}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {alarm.lastEventTime
                        ? new Date(alarm.lastEventTime).toLocaleString()
                        : "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {(!alarms || alarms.length === 0) && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-foreground font-semibold mb-1">No alarms found</p>
            <p className="text-muted-foreground text-sm text-center max-w-sm">
              {severity
                ? `There are no ${severity.toLowerCase()} alarms at this time.`
                : "All systems are operating normally."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, count, color, bgColor, borderColor, icon }) {
  const Icon = icon
  return (
    <div className={`${bgColor} ${borderColor} border rounded-xl p-4 transition-all hover:shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className={`text-2xl font-bold ${color} mt-1`}>{count}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
    </div>
  )
}

function SeverityBadge({ severity }) {
  const config = {
    CRITICAL: {
      bg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-500",
      ring: "ring-red-200",
    },
    MAJOR: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      dot: "bg-orange-500",
      ring: "ring-orange-200",
    },
    MINOR: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      dot: "bg-yellow-500",
      ring: "ring-yellow-200",
    },
    WARNING: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      dot: "bg-blue-500",
      ring: "ring-blue-200",
    },
    NORMAL: {
      bg: "bg-green-100",
      text: "text-green-700",
      dot: "bg-green-500",
      ring: "ring-green-200",
    },
  }

  const style = config[severity?.toUpperCase()] ?? {
    bg: "bg-muted",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    ring: "ring-border",
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ring-1 ${style.bg} ${style.text} ${style.ring}`}
    >
      <span className={`w-2 h-2 rounded-full ${style.dot}`} />
      {severity}
    </span>
  )
}
