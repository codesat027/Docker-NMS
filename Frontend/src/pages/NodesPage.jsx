
// // import { useNodes } from '../hooks/useNodes';
// // import { Link } from 'react-router-dom';

// // const NodeGrid = () => {
// //   const { nodes, loading } = useNodes();

// //   if (loading) return <div className="p-10 text-center text-gray-500 italic">Scanning Inventory...</div>;

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-6 text-gray-800">Network Inventory ({nodes.length})</h2>
      
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {nodes.map((node) => (
// //           <div key={node.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// //             <div className="flex justify-between items-start mb-4">
// //               <div>
// //                 <h3 className="text-lg font-bold text-indigo-700">{node.label}</h3>
// //                 <p className="text-sm text-gray-500">IP: {node.mainIp || 'Unknown'}</p>
// //               </div>
// //               {/* Status Dot: Logic based on if alarms exist */}
// //               <span className="flex h-3 w-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
// //             </div>

// //             <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
// //               <span className="text-xs font-mono text-gray-400">ID: {node.id}</span>
              
// //               <Link 
// //                 to={`/nodes/${node.id}`}
// //                 className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
// //               >
// //                 View Details →
// //               </Link>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NodeGrid;

// import { useState } from "react"
// import { useNodes } from "../hooks/useNodes"

// export default function NodesPage() {
//     const [search, setSearch]   = useState("")
//     const [type, setType]       = useState("")
//     const [showForm, setShowForm] = useState(false)
//     const [editNode, setEditNode] = useState(null)

//     const { nodes, loading, error, addNode, updateNode, deleteNode } = useNodes(
//         Object.fromEntries(
//             Object.entries({ search, type }).filter(([, v]) => v)
//         )
//     )

//     const handleDelete = async (id) => {
//         if (!confirm("Delete this node?")) return
//         await deleteNode(id)
//     }

//     if (loading) return <div className="p-4">Loading nodes...</div>
//     if (error)   return <div className="p-4 text-red-500">Error: {error}</div>

//     return (
//         <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-2xl font-bold">Nodes</h1>
//                 <button
//                     onClick={() => { setEditNode(null); setShowForm(true) }}
//                     className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
//                 >
//                     Add Node
//                 </button>
//             </div>

//             {/* filters */}
//             <div className="flex gap-3 mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search by name..."
//                     value={search}
//                     onChange={e => setSearch(e.target.value)}
//                     className="border rounded px-3 py-2 text-sm w-64"
//                 />
//                 <select
//                     value={type}
//                     onChange={e => setType(e.target.value)}
//                     className="border rounded px-3 py-2 text-sm"
//                 >
//                     <option value="">All Types</option>
//                     <option value="router">Router</option>
//                     <option value="switch">Switch</option>
//                     <option value="server">Server</option>
//                     <option value="firewall">Firewall</option>
//                     <option value="development">Development</option>
//                     <option value="production">Production</option>
//                 </select>
//             </div>

//             {/* table */}
//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 text-left border">ID</th>
//                             <th className="p-3 text-left border">Label</th>
//                             <th className="p-3 text-left border">Location</th>
//                             <th className="p-3 text-left border">Type</th>
//                             <th className="p-3 text-left border">Foreign Source</th>
//                             <th className="p-3 text-left border">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {nodes.map(node => (
//                             <tr key={node.id} className="hover:bg-gray-50">
//                                 <td className="p-3 border">{node.id}</td>
//                                 <td className="p-3 border">{node.label}</td>
//                                 <td className="p-3 border">{node.location ?? "N/A"}</td>
//                                 <td className="p-3 border">
//                                     {node.assetRecord?.category ?? "N/A"}
//                                 </td>
//                                 <td className="p-3 border">{node.foreignSource}</td>
//                                 <td className="p-3 border">
//                                     <div className="flex gap-2">
//                                         <button
//                                             onClick={() => { setEditNode(node); setShowForm(true) }}
//                                             disabled={node.foreignSource === "selfmonitor"}
//                                             className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
//                                              title={node.foreignSource === "selfmonitor" ? "System node — cannot be edited" : "Edit node"}
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(node.id)}
//                                             disabled={node.foreignSource === "selfmonitor"}
//                                             className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
//                                             title={node.foreignSource === "selfmonitor" ? "System node — cannot be deleted" : "Delete node"}
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                         {nodes.length === 0 && (
//                             <tr>
//                                 <td colSpan={6} className="p-4 text-center text-gray-400">
//                                     No nodes found
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* add/edit form modal */}
//             {showForm && (
//                 <NodeForm
//                     node={editNode}
//                     onClose={() => setShowForm(false)}
//                     onSubmit={async (data) => {
//                         if (editNode) {
//                             await updateNode(editNode.id, data)
//                         } else {
//                             await addNode(data)
//                         }
//                         setShowForm(false)
//                     }}
//                 />
//             )}
//         </div>
//     )
// }


// function NodeForm({ node, onClose, onSubmit }) {
//     const [form, setForm] = useState({
//         label:          node?.label ?? "",
//         foreignId:      node?.foreignId ?? (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36)),
//         foreignSource:  node?.foreignSource ?? "",
//         ip:             node?.ipInterfaces?.[0]?.ipAddress ?? "",
//         location:       node?.location ?? "Default",
//         type:           node?.assetRecord?.category ?? "other",
//         description:    node?.assetRecord?.description ?? "",
//         snmpVersion:    "v2c",
//         snmpCommunity:  "public",
//         snmpPort:       161,
//         vendor:         node?.assetRecord?.vendor ?? "",
//         model:          node?.assetRecord?.modelNumber ?? "",
//         serialNumber:   node?.assetRecord?.serialNumber ?? "",
//         building:       node?.assetRecord?.building ?? "",
//         room:           node?.assetRecord?.room ?? "",
//         department:     node?.assetRecord?.department ?? "",
//         services:       ["ICMP", "SNMP"],
//     })

//     console.log("NODE PROP:", node) 

//     const [loading, setLoading] = useState(false)
//     const [error, setError]     = useState(null)

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         console.log("FORM DATA:", JSON.stringify(form))
//         setLoading(true)
//         setError(null)
//         try {
//             await onSubmit(form)
//         } catch (err) {
//             setError(err.message)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const toggleService = (service) => {
//         setForm(prev => ({
//             ...prev,
//             services: prev.services.includes(service)
//                 ? prev.services.filter(s => s !== service)
//                 : [...prev.services, service]
//         }))
//     }

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto p-6">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-lg font-bold">
//                         {node ? "Edit Node" : "Add Node"}
//                     </h2>
//                     <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
//                 </div>

//                 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//                 <form onSubmit={handleSubmit} className="space-y-4">

//                     {/* Section 1 — Basic */}
//                     <p className="text-xs font-semibold text-gray-500 uppercase">Basic Info</p>
//                     <div className="grid grid-cols-2 gap-3">
//                         <div>
//                             <label className="text-sm font-medium">Label *</label>
//                             <input
//                                 required
//                                 value={form.label}
//                                 onChange={e => setForm({...form, label: e.target.value})}
//                                 className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                 placeholder="Core-Switch-01"
//                             />
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium">IP Address *</label>
//                             <input
//                                 required
//                                 value={form.ip}
//                                 onChange={e => setForm({...form, ip: e.target.value})}
//                                 className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                 placeholder="192.168.1.1"
//                                 disabled={!!node}  // can't change IP after creation
//                             />
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium">Location</label>
//                             <input
//                                 value={form.location}
//                                 onChange={e => setForm({...form, location: e.target.value})}
//                                 className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                 placeholder="Default"
//                             />
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium">Type</label>
//                             <select
//                                 value={form.type}
//                                 onChange={e => setForm({...form, type: e.target.value})}
//                                 className="w-full border rounded px-3 py-2 text-sm mt-1"
//                             >
//                                 <option value="router">Router</option>
//                                 <option value="switch">Switch</option>
//                                 <option value="server">Server</option>
//                                 <option value="firewall">Firewall</option>
//                                 <option value="development">Development</option>
//                                 <option value="production">Production</option>
//                                 <option value="other">Other</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium">Description</label>
//                         <textarea
//                             value={form.description}
//                             onChange={e => setForm({...form, description: e.target.value})}
//                             className="w-full border rounded px-3 py-2 text-sm mt-1"
//                             rows={2}
//                         />
//                     </div>

//                     {/* Section 2 — SNMP */}
//                     <p className="text-xs font-semibold text-gray-500 uppercase mt-4">SNMP Config</p>
//                     <div className="grid grid-cols-2 gap-3">
//                         <div>
//                             <label className="text-sm font-medium">SNMP Version</label>
//                             <select
//                                 value={form.snmpVersion}
//                                 onChange={e => setForm({...form, snmpVersion: e.target.value})}
//                                 className="w-full border rounded px-3 py-2 text-sm mt-1"
//                             >
//                                 <option value="v1">v1</option>
//                                 <option value="v2c">v2c</option>
//                                 <option value="v3">v3</option>
//                             </select>
//                         </div>
//                         {form.snmpVersion !== "v3" && (
//                             <div>
//                                 <label className="text-sm font-medium">Community String</label>
//                                 <input
//                                     value={form.snmpCommunity}
//                                     onChange={e => setForm({...form, snmpCommunity: e.target.value})}
//                                     className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                     placeholder="public"
//                                 />
//                             </div>
//                         )}
//                         {form.snmpVersion === "v3" && (
//                             <>
//                                 <div>
//                                     <label className="text-sm font-medium">Security Name</label>
//                                     <input
//                                         value={form.snmpSecurityName ?? ""}
//                                         onChange={e => setForm({...form, snmpSecurityName: e.target.value})}
//                                         className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Auth Protocol</label>
//                                     <select
//                                         value={form.snmpAuthProtocol ?? "MD5"}
//                                         onChange={e => setForm({...form, snmpAuthProtocol: e.target.value})}
//                                         className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                     >
//                                         <option value="MD5">MD5</option>
//                                         <option value="SHA">SHA</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Auth Passphrase</label>
//                                     <input
//                                         type="password"
//                                         value={form.snmpAuthPassphrase ?? ""}
//                                         onChange={e => setForm({...form, snmpAuthPassphrase: e.target.value})}
//                                         className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Privacy Protocol</label>
//                                     <select
//                                         value={form.snmpPrivacyProtocol ?? "AES"}
//                                         onChange={e => setForm({...form, snmpPrivacyProtocol: e.target.value})}
//                                         className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                     >
//                                         <option value="AES">AES</option>
//                                         <option value="DES">DES</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Privacy Passphrase</label>
//                                     <input
//                                         type="password"
//                                         value={form.snmpPrivacyPassphrase ?? ""}
//                                         onChange={e => setForm({...form, snmpPrivacyPassphrase: e.target.value})}
//                                         className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                     />
//                                 </div>
//                             </>
//                         )}
//                     </div>

//                     {/* Section 3 — Asset */}
//                     <p className="text-xs font-semibold text-gray-500 uppercase mt-4">Asset Info</p>
//                     <div className="grid grid-cols-3 gap-3">
//                         {[
//                             ["vendor",       "Vendor"],
//                             ["model",        "Model"],
//                             ["serialNumber", "Serial Number"],
//                             ["building",     "Building"],
//                             ["room",         "Room"],
//                             ["department",   "Department"],
//                         ].map(([field, label]) => (
//                             <div key={field}>
//                                 <label className="text-sm font-medium">{label}</label>
//                                 <input
//                                     value={form[field]}
//                                     onChange={e => setForm({...form, [field]: e.target.value})}
//                                     className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                 />
//                             </div>
//                         ))}
//                     </div>

//                     {/* Section 4 — Services */}
//                     <p className="text-xs font-semibold text-gray-500 uppercase mt-4">Services to Monitor</p>
//                     <div className="flex gap-4">
//                         {["ICMP", "SNMP", "HTTP", "HTTPS", "SSH"].map(service => (
//                             <label key={service} className="flex items-center gap-1 text-sm cursor-pointer">
//                                 <input
//                                     type="checkbox"
//                                     checked={form.services.includes(service)}
//                                     onChange={() => toggleService(service)}
//                                 />
//                                 {service}
//                             </label>
//                         ))}
//                     </div>

//                     {/* buttons */}
//                     <div className="flex justify-end gap-3 pt-4">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//                         >
//                             {loading ? "Saving..." : node ? "Update Node" : "Add Node"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }


import { useState } from "react"
import { useNodes } from "../hooks/useNodes"

export default function NodesPage() {
    const [search, setSearch] = useState("")
    const [type, setType] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [editNode, setEditNode] = useState(null)

    const { nodes, loading, error, addNode, updateNode, deleteNode } = useNodes(
        Object.fromEntries(
            Object.entries({ search, type }).filter(([, v]) => v)
        )
    )

    const handleDelete = async (id) => {
        if (!confirm("Decommission this infrastructure node?")) return
        await deleteNode(id)
    }

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <div className="animate-pulse text-slate-400 font-medium tracking-widest uppercase text-[10px]">Synchronizing Neural Map...</div>
        </div>
    )
    
    if (error) return (
        <div className="p-8">
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold">System Error:</span> {error}
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-900">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2 italic">Add <span className="text-blue-600">Nodes</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Advanced network asset orchestration.</p>
                </div>
                <button
                    onClick={() => { setEditNode(null); setShowForm(true) }}
                    className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-2xl shadow-slate-300 hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                >
                    + Provision Node
                </button>
            </div>

            {/* Utility Bar */}
            <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-75">
                    <input
                        type="text"
                        placeholder="Filter by label or hash..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-white border-none ring-1 ring-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                    />
                    <svg className="absolute left-4 top-4 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                
                <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="bg-white border-none ring-1 ring-slate-200 rounded-2xl px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 focus:ring-2 focus:ring-blue-500 shadow-sm outline-none cursor-pointer"
                >
                    <option value="">All Layers</option>
                    <option value="router">Router</option>
                    <option value="switch">Switch</option>
                    <option value="server">Server</option>
                    <option value="firewall">Firewall</option>
                    <option value="development">Dev</option>
                    <option value="production">Prod</option>
                </select>
            </div>

            {/* Main Table */}
            <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identifier</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Topology</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Class</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Source</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {nodes.map(node => (
                                <tr key={node.id} className="group hover:bg-slate-50/80 transition-all">
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-mono font-bold text-slate-300">#{node.id}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-slate-800 tracking-tight">{node.label}</div>
                                        {node.ipInterfaces?.[0]?.ipAddress && (
                                            <div className="text-[11px] font-mono text-blue-500">
                                                {node.ipInterfaces[0].ipAddress}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                                            {node.location ?? "Global"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-xs font-medium text-slate-600 capitalize">{node.assetRecord?.category ?? "General"}</span>
                                    </td>
                                    <td className="px-8 py-5 text-xs font-bold text-slate-400 italic">
                                        {node.foreignSource}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <button
                                                onClick={() => { setEditNode(node); setShowForm(true) }}
                                                disabled={node.foreignSource === "selfmonitor"}
                                                className="text-xs font-bold text-blue-600 uppercase tracking-tighter hover:underline disabled:hidden"
                                            >
                                                Modify
                                            </button>
                                            <button
                                                onClick={() => handleDelete(node.id)}
                                                disabled={node.foreignSource === "selfmonitor"}
                                                className="text-xs font-bold text-red-400 uppercase tracking-tighter hover:text-red-600 disabled:hidden"
                                            >
                                                Drop
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showForm && (
                <NodeForm
                    node={editNode}
                    onClose={() => setShowForm(false)}
                    onSubmit={async (data) => {
                        if (editNode) {
                            await updateNode(editNode.id, data)
                        } else {
                            await addNode(data)
                        }
                        setShowForm(false)
                    }}
                />
            )}
        </div>
    )
}

function NodeForm({ node, onClose, onSubmit }) {
    const [form, setForm] = useState({
        label:          node?.label ?? "",
        foreignId:      node?.foreignId ?? (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36)),
        foreignSource:  node?.foreignSource ?? "",
        ip:             node?.ipInterfaces?.[0]?.ipAddress ?? "",
        location:       node?.location ?? "Default",
        type:           node?.assetRecord?.category ?? "other",
        description:    node?.assetRecord?.description ?? "",
        snmpVersion:    "v2c",
        snmpCommunity:  "public",
        snmpPort:       161,
        snmpSecurityName: node?.snmpSecurityName ?? "",
        snmpAuthProtocol: node?.snmpAuthProtocol ?? "MD5",
        snmpAuthPassphrase: node?.snmpAuthPassphrase ?? "",
        snmpPrivacyProtocol: node?.snmpPrivacyProtocol ?? "AES",
        snmpPrivacyPassphrase: node?.snmpPrivacyPassphrase ?? "",
        vendor:         node?.assetRecord?.vendor ?? "",
        model:          node?.assetRecord?.modelNumber ?? "",
        serialNumber:   node?.assetRecord?.serialNumber ?? "",
        building:       node?.assetRecord?.building ?? "",
        room:           node?.assetRecord?.room ?? "",
        department:     node?.assetRecord?.department ?? "",
        services:       node?.services ?? ["ICMP", "SNMP"],
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await onSubmit(form)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleService = (service) => {
        setForm(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }))
    }

    const inputClass = "w-full bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
    const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1"

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
                            {node ? "Modify Instance" : "Provision Node"}
                        </h2>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Infrastructure Configuration Layer</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full text-slate-300 hover:text-slate-900 transition-all">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-10 py-8 scrollbar-hide">
                    <form id="node-form" onSubmit={handleSubmit} className="space-y-12">
                        
                        {/* Section: Base Identity */}
                        <section>
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Identity Attributes
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 md:col-span-1">
                                    <label className={labelClass}>System Label</label>
                                    <input required value={form.label} onChange={e => setForm({...form, label: e.target.value})} className={inputClass} placeholder="Node-Alpha-01" />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className={labelClass}>Static IPv4</label>
                                    <input required disabled={!!node} value={form.ip} onChange={e => setForm({...form, ip: e.target.value})} className={`${inputClass} font-mono disabled:bg-slate-100 disabled:text-slate-400`} />
                                </div>
                                <div>
                                    <label className={labelClass}>Topology Group</label>
                                    <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Asset Class</label>
                                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className={inputClass}>
                                        <option value="router">Router</option>
                                        <option value="switch">Switch</option>
                                        <option value="server">Server</option>
                                        <option value="firewall">Firewall</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Section: Telemetry Protocol */}
                        <section>
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Telemetry Protocol
                            </h3>
                            <div className="bg-slate-50/50 rounded-4xl p-8 border border-slate-100 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass}>SNMP Version</label>
                                        <select value={form.snmpVersion} onChange={e => setForm({...form, snmpVersion: e.target.value})} className={inputClass}>
                                            <option value="v1">v1 (Legacy)</option>
                                            <option value="v2c">v2c (Standard)</option>
                                            <option value="v3">v3 (Encrypted)</option>
                                        </select>
                                    </div>
                                    {form.snmpVersion !== "v3" && (
                                        <div>
                                            <label className={labelClass}>Community String</label>
                                            <input value={form.snmpCommunity} onChange={e => setForm({...form, snmpCommunity: e.target.value})} className={inputClass} type="password" />
                                        </div>
                                    )}
                                </div>

                                {form.snmpVersion === "v3" && (
                                    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-4">
                                        <div className="col-span-2">
                                            <label className={labelClass}>Security Name / Principal</label>
                                            <input value={form.snmpSecurityName} onChange={e => setForm({...form, snmpSecurityName: e.target.value})} className={inputClass} placeholder="Required for v3 auth" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Auth Protocol</label>
                                            <select value={form.snmpAuthProtocol} onChange={e => setForm({...form, snmpAuthProtocol: e.target.value})} className={inputClass}>
                                                <option value="MD5">MD5</option>
                                                <option value="SHA">SHA</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Auth Passphrase</label>
                                            <input type="password" value={form.snmpAuthPassphrase} onChange={e => setForm({...form, snmpAuthPassphrase: e.target.value})} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Privacy Protocol</label>
                                            <select value={form.snmpPrivacyProtocol} onChange={e => setForm({...form, snmpPrivacyProtocol: e.target.value})} className={inputClass}>
                                                <option value="AES">AES (256-bit)</option>
                                                <option value="DES">DES</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Privacy Passphrase</label>
                                            <input type="password" value={form.snmpPrivacyPassphrase} onChange={e => setForm({...form, snmpPrivacyPassphrase: e.target.value})} className={inputClass} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Section: Operational Hooks */}
                        <section className="pb-10">
                            <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Service Hooks
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {["ICMP", "SNMP", "HTTP", "HTTPS", "SSH"].map(service => (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() => toggleService(service)}
                                        className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all border-2 ${
                                            form.services.includes(service) 
                                            ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100" 
                                            : "bg-white border-slate-100 text-slate-300 hover:border-slate-200"
                                        }`}
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-10 py-8 border-t border-slate-100 bg-slate-50/50 flex justify-end items-center gap-8">
                    <button type="button" onClick={onClose} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
                        Abort
                    </button>
                    <button
                        form="node-form"
                        type="submit"
                        disabled={loading}
                        className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Syncing..." : node ? "Update Registry" : "Initialize Node"}
                    </button>
                </div>
            </div>
        </div>
    )
}



