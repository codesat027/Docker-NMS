// import { useState } from "react"
// import { useOutages } from "../hooks/useOutages"

// export default function OutagesPage() {
//     const [currentOnly, setCurrentOnly] = useState(false)
//     const { outages, loading, error } = useOutages(
//         currentOnly ? { current: "true" } : {}
//     )

//     if (loading) return <div className="p-4">Loading outages...</div>
//     if (error)   return <div className="p-4 text-red-500">Error: {error}</div>

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Outages</h1>

//             {/* filter */}
//             <label className="flex items-center gap-2 mb-4 text-sm cursor-pointer">
//                 <input
//                     type="checkbox"
//                     checked={currentOnly}
//                     onChange={e => setCurrentOnly(e.target.checked)}
//                 />
//                 Show current outages only
//             </label>

//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 text-left border">Node</th>
//                             <th className="p-3 text-left border">IP Address</th>
//                             <th className="p-3 text-left border">Service</th>
//                             <th className="p-3 text-left border">Down Since</th>
//                             <th className="p-3 text-left border">Restored</th>
//                             <th className="p-3 text-left border">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {outages.map(outage => (
//                             <tr
//                                 key={outage.id}
//                                 className={!outage.ifRegainedService ? "bg-red-50" : ""}
//                             >
//                                 <td className="p-3 border">{outage.nodeLabel ?? "N/A"}</td>
//                                 <td className="p-3 border">{outage.ipAddress ?? "N/A"}</td>
//                                 <td className="p-3 border">
//                                     {outage.serviceType?.name ?? "N/A"}
//                                 </td>
//                                 <td className="p-3 border">
//                                     {outage.ifLostService
//                                         ? new Date(outage.ifLostService).toLocaleString()
//                                         : "N/A"}
//                                 </td>
//                                 <td className="p-3 border">
//                                     {outage.ifRegainedService
//                                         ? new Date(outage.ifRegainedService).toLocaleString()
//                                         : "—"}
//                                 </td>
//                                 <td className="p-3 border">
//                                     {outage.ifRegainedService
//                                         ? <span className="text-green-600 text-xs font-medium">Restored</span>
//                                         : <span className="text-red-600 text-xs font-medium">Down</span>
//                                     }
//                                 </td>
//                             </tr>
//                         ))}
//                         {outages.length === 0 && (
//                             <tr>
//                                 <td colSpan={6} className="p-4 text-center text-gray-400">
//                                     No outages found
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }   



import { useState } from "react"
import { useOutages } from "../hooks/useOutages"

export default function OutagesPage() {
    const [currentOnly, setCurrentOnly] = useState(false)
    const { outages, loading, error } = useOutages(
        currentOnly ? { current: "true" } : {}
    )

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <div className="animate-pulse text-slate-400 font-medium tracking-widest uppercase text-[10px]">Scanning Network Faults...</div>
        </div>
    )
    
    if (error) return (
        <div className="p-8">
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold">Telemetry Error:</span> {error}
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-900">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2 italic">Incident <span className="text-red-500">Log</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Real-time service disruption and restoration tracking.</p>
                </div>

                {/* Styled Filter Toggle */}
                <label className="group flex items-center gap-3 bg-white border border-slate-200 px-6 py-3.5 rounded-2xl shadow-sm cursor-pointer hover:border-blue-400 transition-all">
                    <input
                        type="checkbox"
                        checked={currentOnly}
                        onChange={e => setCurrentOnly(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-600">Active Outages Only</span>
                </label>
            </div>

            {/* Main Table Container */}
            <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Node Identifier</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Network Address</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Service Layer</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Down Time</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Restoration</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {outages.map(outage => {
                                const isDown = !outage.ifRegainedService;
                                return (
                                    <tr key={outage.id} className="group hover:bg-slate-50/80 transition-all">
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-slate-800 tracking-tight">{outage.nodeLabel ?? "Unknown Node"}</div>
                                            <div className="text-[10px] font-mono font-bold text-slate-300 uppercase mt-0.5">ID: {outage.id}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                                                {outage.ipAddress ?? "0.0.0.0"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-xs font-bold text-slate-600">
                                                {outage.serviceType?.name ?? "General Service"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-xs text-slate-500 font-medium">
                                            {outage.ifLostService
                                                ? new Date(outage.ifLostService).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                                                : "—"}
                                        </td>
                                        <td className="px-8 py-6 text-xs text-slate-500 font-medium">
                                            {outage.ifRegainedService
                                                ? new Date(outage.ifRegainedService).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                                                : <span className="text-slate-300 italic">Pending...</span>}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                isDown 
                                                ? "bg-red-50 text-red-600 ring-1 ring-red-200" 
                                                : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                                            }`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${isDown ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`} />
                                                {isDown ? "Critical / Down" : "Restored"}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            
                            {outages.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">No matching incidents found</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}