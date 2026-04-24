// import { useState } from "react"
// import { useReports } from "../hooks/useReports"

// export default function ReportsPage() {
//     const [period, setPeriod] = useState("weekly")
//     const [type, setType]     = useState("full")
//     const { downloadCSV} = useReports()

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-6">Reports</h1>

//             <div className="bg-white border rounded p-6 max-w-md space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Period</label>
//                     <select
//                         value={period}
//                         onChange={e => setPeriod(e.target.value)}
//                         className="w-full border rounded px-3 py-2 text-sm"
//                     >
//                         <option value="daily">Last 24 Hours</option>
//                         <option value="weekly">Last 7 Days</option>
//                         <option value="monthly">Last 30 Days</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-1">Report Type</label>
//                     <select
//                         value={type}
//                         onChange={e => setType(e.target.value)}
//                         className="w-full border rounded px-3 py-2 text-sm"
//                     >
//                         <option value="full">Full Report</option>
//                         <option value="alarms">Alarms Only</option>
//                         <option value="nodes">Nodes Only</option>
//                         <option value="outages">Outages Only</option>
//                     </select>
//                 </div>

//                 <div className="flex gap-3 pt-2">
//                     <button
//                         onClick={() => downloadCSV(period, type)}
//                         className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700"
//                     >
//                         Download CSV
//                     </button>
//                     {/* <button
//                         onClick={() => downloadPDF(period)}
//                         className="flex-1 bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700"
//                     >
//                         Download PDF
//                     </button> */}
//                 </div>
//             </div>
//         </div>
//     )
// }   




import { useState } from "react"
import { useReports } from "../hooks/useReports"

export default function ReportsPage() {
    const [period, setPeriod] = useState("weekly")
    const [type, setType] = useState("full")
    const { downloadCSV } = useReports()

    const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1"
    const selectClass = "w-full bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none cursor-pointer appearance-none"

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-900">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2 italic">Data <span className="text-emerald-500">Exfiltration</span></h1>
                <p className="text-slate-500 font-medium tracking-tight">Generate and export granular network intelligence reports.</p>
            </div>

            <div className="max-w-xl mx-auto mt-20">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
                    
                    {/* Decorative Top Bar */}
                    <div className="h-2 w-full bg-linear-to-r from-emerald-400 via-blue-500 to-purple-600" />
                    
                    <div className="p-12 space-y-10">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center h-16 w-16 bg-emerald-50 rounded-3xl mb-4">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Export Configuration</h2>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Define parameters for CSV generation</p>
                        </div>

                        <div className="space-y-6">
                            {/* Temporal Bound */}
                            <div className="relative">
                                <label className={labelClass}>Temporal Bound</label>
                                <div className="relative">
                                    <select
                                        value={period}
                                        onChange={e => setPeriod(e.target.value)}
                                        className={selectClass}
                                    >
                                        <option value="daily">Last 24 Hours (Real-time)</option>
                                        <option value="weekly">Last 7 Days (Standard)</option>
                                        <option value="monthly">Last 30 Days (Archive)</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Data Schema */}
                            <div className="relative">
                                <label className={labelClass}>Data Schema</label>
                                <div className="relative">
                                    <select
                                        value={type}
                                        onChange={e => setType(e.target.value)}
                                        className={selectClass}
                                    >
                                        <option value="full">Comprehensive System Audit</option>
                                        <option value="alarms">Active Fault Alerts Only</option>
                                        <option value="nodes">Infrastructure Inventory</option>
                                        <option value="outages">Historical Downtime Data</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={() => downloadCSV(period, type)}
                                className="w-full bg-slate-900 text-white py-5 rounded-4xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-emerald-100 hover:bg-emerald-600 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Initialize CSV Download
                            </button>
                            
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}