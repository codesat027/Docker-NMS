// import { useState } from "react"
// import { useThresholds } from "../hooks/useThresholds"
// import { useNodes } from "../hooks/useNodes"
// import { useNodeResources } from "../hooks/useNodeResources"

// export default function ThresholdsPage() {
//     const { rules, loading, error, createRule, updateRule, deleteRule } = useThresholds()
//     const [showForm, setShowForm] = useState(false)

//     if (loading) return <div className="p-4">Loading thresholds...</div>
//     if (error)   return <div className="p-4 text-red-500">Error: {error}</div>

//     return (
//         <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-2xl font-bold">Threshold Policies</h1>
//                 <button
//                     onClick={() => setShowForm(true)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
//                 >
//                     Create Rule
//                 </button>
//             </div>

//             {/* Global policies */}
//             <h2 className="text-lg font-semibold mb-2 mt-4">Global Policies</h2>
//             <p className="text-sm text-gray-500 mb-3">Apply to all nodes matching a type</p>
//             <RuleTable
//                 rules={rules.filter(r => r.policy_type === "global")}
//                 onToggle={(id, active) => updateRule(id, { active: !active })}
//                 onDelete={deleteRule}
//             />

//             {/* Node specific policies */}
//             <h2 className="text-lg font-semibold mb-2 mt-6">Node Specific Policies</h2>
//             <p className="text-sm text-gray-500 mb-3">Override global for specific nodes</p>
//             <RuleTable
//                 rules={rules.filter(r => r.policy_type === "specific")}
//                 onToggle={(id, active) => updateRule(id, { active: !active })}
//                 onDelete={deleteRule}
//             />

//             {showForm && (
//                 <ThresholdForm
//                     onClose={() => setShowForm(false)}
//                     onSubmit={async (data) => {
//                         await createRule(data)
//                         setShowForm(false)
//                     }}
//                 />
//             )}
//         </div>
//     )
// }


// function RuleTable({ rules, onToggle, onDelete }) {
//     if (rules.length === 0) {
//         return (
//             <div className="text-sm text-gray-400 bg-gray-50 border rounded p-4 text-center">
//                 No policies configured
//             </div>
//         )
//     }

//     return (
//         <div className="overflow-x-auto">
//             <table className="w-full text-sm border-collapse">
//                 <thead>
//                     <tr className="bg-gray-100">
//                         <th className="p-3 text-left border">Name</th>
//                         <th className="p-3 text-left border">Target</th>
//                         <th className="p-3 text-left border">Metric</th>
//                         <th className="p-3 text-left border">Condition</th>
//                         <th className="p-3 text-left border">Action</th>
//                         <th className="p-3 text-left border">Status</th>
//                         <th className="p-3 text-left border">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {rules.map(rule => (
//                         <tr key={rule.id} className="hover:bg-gray-50">
//                             <td className="p-3 border font-medium">{rule.name}</td>
//                             <td className="p-3 border">
//                                 {rule.policy_type === "global"
//                                     ? <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
//                                         {rule.node_filter || "All nodes"}
//                                       </span>
//                                     : <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
//                                         Node {rule.node_id}
//                                       </span>
//                                 }
//                             </td>
//                             <td className="p-3 border">{rule.metric}</td>
//                             <td className="p-3 border">
//                                 <span className="font-mono text-xs">
//                                     {rule.operator_display} {rule.threshold}
//                                 </span>
//                             </td>
//                             <td className="p-3 border">
//                                 <ActionBadge action={rule.action_display} />
//                             </td>
//                             <td className="p-3 border">
//                                 <button
//                                     onClick={() => onToggle(rule.id, rule.active)}
//                                     className={`text-xs px-2 py-1 rounded font-medium ${
//                                         rule.active
//                                             ? "bg-green-100 text-green-700"
//                                             : "bg-gray-100 text-gray-500"
//                                     }`}
//                                 >
//                                     {rule.active ? "Active" : "Inactive"}
//                                 </button>
//                             </td>
//                             <td className="p-3 border">
//                                 <button
//                                     onClick={() => onDelete(rule.id)}
//                                     className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }


// function ActionBadge({ action }) {
//     const colors = {
//         "Alert only":       "bg-yellow-100 text-yellow-700",
//         "Quarantine node":  "bg-orange-100 text-orange-700",
//         "SNMP shutdown":    "bg-red-100 text-red-700",
//     }
//     const color = colors[action] ?? "bg-gray-100 text-gray-700"
//     return (
//         <span className={`text-xs px-2 py-0.5 rounded font-medium ${color}`}>
//             {action}
//         </span>
//     )
// }


// function ThresholdForm({ onClose, onSubmit }) {
//     const { nodes } = useNodes()
//     const [policyType, setPolicyType] = useState("global")
//     const [selectedNodeId, setSelectedNodeId] = useState("")
//     const { metrics, loading: metricsLoading } = useNodeResources(
//         policyType === "specific" ? selectedNodeId : null
//     )
//     const [formError, setFormError] = useState(null)
//     const [saving, setSaving]       = useState(false)

//     const [form, setForm] = useState({
//         name:        "",
//         policy_type: "global",
//         node_filter: "",
//         node_id:     "",
//         resource_id: "",
//         metric:      "",
//         operator:    ">",
//         threshold:   "",
//         action:      "alert",
//     })

//     const handlePolicyTypeChange = (type) => {
//         setPolicyType(type)
//         setForm(prev => ({
//             ...prev,
//             policy_type: type,
//             node_filter: "",
//             node_id:     "",
//             resource_id: "",
//             metric:      "",
//         }))
//         setSelectedNodeId("")
//     }

//     const handleNodeSelect = (nodeId) => {
//         setSelectedNodeId(nodeId)
//         setForm(prev => ({
//             ...prev,
//             node_id:     nodeId,
//             resource_id: "",
//             metric:      "",
//         }))
//     }

//     const handleMetricSelect = (metricStr) => {
//         const selected = metrics.find(m => m.metric === metricStr)
//         setForm(prev => ({
//             ...prev,
//             metric:      metricStr,
//             resource_id: selected?.resource_id ?? "",
//         }))
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setFormError(null)
//         setSaving(true)
//         try {
//             await onSubmit({
//                 ...form,
//                 threshold: parseFloat(form.threshold),
//             })
//         } catch (err) {
//             setFormError(err.message)
//         } finally {
//             setSaving(false)
//         }
//     }

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-screen overflow-y-auto p-6">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-lg font-bold">Create Threshold Rule</h2>
//                     <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
//                 </div>

//                 {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}

//                 <form onSubmit={handleSubmit} className="space-y-4">

//                     {/* Rule Name */}
//                     <div>
//                         <label className="text-sm font-medium">Rule Name *</label>
//                         <input
//                             required
//                             value={form.name}
//                             onChange={e => setForm({...form, name: e.target.value})}
//                             className="w-full border rounded px-3 py-2 text-sm mt-1"
//                             placeholder="e.g. Firewall CPU Alert"
//                         />
//                     </div>

//                     {/* Policy Type Toggle */}
//                     <div>
//                         <label className="text-sm font-medium">Policy Type *</label>
//                         <div className="flex gap-2 mt-1">
//                             <button
//                                 type="button"
//                                 onClick={() => handlePolicyTypeChange("global")}
//                                 className={`px-4 py-2 text-sm rounded ${
//                                     policyType === "global"
//                                         ? "bg-blue-600 text-white"
//                                         : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                                 }`}
//                             >
//                                 Global Policy
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => handlePolicyTypeChange("specific")}
//                                 className={`px-4 py-2 text-sm rounded ${
//                                     policyType === "specific"
//                                         ? "bg-blue-600 text-white"
//                                         : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                                 }`}
//                             >
//                                 Node Specific
//                             </button>
//                         </div>
//                     </div>

//                     {/* Global — node filter */}
//                     {policyType === "global" && (
//                         <div>
//                             <label className="text-sm font-medium">Node Filter *</label>
//                             <select
//                                 required
//                                 value={form.node_filter}
//                                 onChange={e => setForm({...form, node_filter: e.target.value})}
//                                 className="w-full border rounded px-3 py-2 text-sm mt-1"
//                             >
//                                 <option value="">Select type...</option>
//                                 <option value="router">Routers</option>
//                                 <option value="switch">Switches</option>
//                                 <option value="server">Servers</option>
//                                 <option value="firewall">Firewalls</option>
//                                 <option value="development">Development</option>
//                                 <option value="production">Production</option>
//                             </select>
//                         </div>
//                     )}

//                     {/* Specific — node selector */}
//                     {policyType === "specific" && (
//                         <div>
//                             <label className="text-sm font-medium">Select Node *</label>
//                             <select
//                                 required
//                                 value={selectedNodeId}
//                                 onChange={e => handleNodeSelect(e.target.value)}
//                                 className="w-full border rounded px-3 py-2 text-sm mt-1"
//                             >
//                                 <option value="">Select node...</option>
//                                 {nodes.map(node => (
//                                     <option key={node.id} value={node.id}>
//                                         {node.label} ({node.foreignSource})
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     )}

//                     {/* Metric — dynamic for specific, manual for global */}
//                     {policyType === "specific" && selectedNodeId && (
//                         <div>
//                             <label className="text-sm font-medium">Metric *</label>
//                             {metricsLoading ? (
//                                 <p className="text-sm text-gray-400 mt-1">Loading metrics...</p>
//                             ) : (
//                                 <select
//                                     required
//                                     value={form.metric}
//                                     onChange={e => handleMetricSelect(e.target.value)}
//                                     className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                 >
//                                     <option value="">Select metric...</option>
//                                     {metrics.map(m => (
//                                         <option key={`${m.resource_id}-${m.metric}`} value={m.metric}>
//                                             {m.metric} ({m.resource_type})
//                                         </option>
//                                     ))}
//                                 </select>
//                             )}
//                         </div>
//                     )}

//                     {policyType === "global" && (
//                         <div>
//                             <label className="text-sm font-medium">Metric *</label>
//                             <select
//                                 required
//                                 value={form.metric}
//                                 onChange={e => setForm({...form, metric: e.target.value})}
//                                 className="w-full border rounded px-3 py-2 text-sm mt-1"
//                             >
//                                 <option value="">Select metric...</option>
//                                 <option value="MemPctUsage">Memory Usage %</option>
//                                 <option value="CpuRawUser">CPU Usage</option>
//                                 <option value="hrStorageUsed">Disk Usage</option>
//                                 <option value="ifInOctets">Incoming Traffic</option>
//                                 <option value="ifOutOctets">Outgoing Traffic</option>
//                                 <option value="HeapUsageUsed">JVM Heap Used</option>
//                                 <option value="ThreadCount">Thread Count</option>
//                             </select>
//                         </div>
//                     )}

//                     {/* Condition */}
//                     <div className="grid grid-cols-2 gap-3">
//                         <div>
//                             <label className="text-sm font-medium">Operator *</label>
//                             <select
//                                 required
//                                 value={form.operator}
//                                 onChange={e => setForm({...form, operator: e.target.value})}
//                                 className="w-full border rounded px-3 py-2 text-sm mt-1"
//                             >
//                                 <option value=">">Greater than ( &gt; )</option>
//                                 <option value="<">Less than ( &lt; )</option>
//                                 <option value=">=">Greater or equal ( &ge; )</option>
//                                 <option value="<=">Less or equal ( &le; )</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium">Threshold Value *</label>
//                             <input
//                                 required
//                                 type="number"
//                                 step="0.1"
//                                 value={form.threshold}
//                                 onChange={e => setForm({...form, threshold: e.target.value})}
//                                 className="w-full border rounded px-3 py-2 text-sm mt-1"
//                                 placeholder="e.g. 90"
//                             />
//                         </div>
//                     </div>

//                     {/* Action */}
//                     <div>
//                         <label className="text-sm font-medium">Action *</label>
//                         <select
//                             required
//                             value={form.action}
//                             onChange={e => setForm({...form, action: e.target.value})}
//                             className="w-full border rounded px-3 py-2 text-sm mt-1"
//                         >
//                             <option value="alert">Alert only</option>
//                             <option value="quarantine">Quarantine node</option>
//                             <option value="shutdown">SNMP shutdown</option>
//                         </select>
//                     </div>

//                     {/* Buttons */}
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
//                             disabled={saving}
//                             className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//                         >
//                             {saving ? "Creating..." : "Create Rule"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }   




// ------------------------



import { useState } from "react"
import { useThresholds } from "../hooks/useThresholds"
import { useNodes } from "../hooks/useNodes"
import { useNodeResources } from "../hooks/useNodeResources"

export default function ThresholdsPage() {
    const { rules, loading, error, createRule, updateRule, deleteRule } = useThresholds()
    const [showForm, setShowForm] = useState(false)

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <div className="animate-pulse text-slate-400 font-medium tracking-widest uppercase text-[10px]">Syncing Policy Engine...</div>
        </div>
    )
    
    if (error) return (
        <div className="p-8">
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm flex items-center gap-3">
                <span className="font-bold">Policy Error:</span> {error}
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-900">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2 italic"><span className="text-blue-600">Thresholds</span></h1>
                    <p className="text-slate-500 font-medium tracking-tight">Automated guardrails and performance trigger orchestration.</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                >
                    + Define Rule
                </button>
            </div>

            <div className="max-w-7xl mx-auto space-y-12">
                {/* Global Section */}
                <section>
                    <div className="mb-6 ml-2">
                        <h2 className="text-sm font-black text-purple-600 uppercase tracking-[0.2em]">Global Policies</h2>
                        <p className="text-[11px] text-slate-400 font-bold uppercase mt-1">Wide-area monitoring for asset classes</p>
                    </div>
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                        <RuleTable
                            rules={rules.filter(r => r.policy_type === "global")}
                            onToggle={(id, active) => updateRule(id, { active: !active })}
                            onDelete={deleteRule}
                        />
                    </div>
                </section>

                {/* Specific Section */}
                <section>
                    <div className="mb-6 ml-2">
                        <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">Node Specific Policies</h2>
                        <p className="text-[11px] text-slate-400 font-bold uppercase mt-1">Granular overrides for critical infrastructure</p>
                    </div>
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                        <RuleTable
                            rules={rules.filter(r => r.policy_type === "specific")}
                            onToggle={(id, active) => updateRule(id, { active: !active })}
                            onDelete={deleteRule}
                        />
                    </div>
                </section>
            </div>

            {showForm && (
                <ThresholdForm
                    onClose={() => setShowForm(false)}
                    onSubmit={async (data) => {
                        await createRule(data)
                        setShowForm(false)
                    }}
                />
            )}
        </div>
    )
}

function RuleTable({ rules, onToggle, onDelete }) {
    if (rules.length === 0) {
        return (
            <div className="px-8 py-16 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">No active policies in this scope</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-50 bg-slate-50/50">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Policy Name</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Scope</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Condition</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Trigger Action</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Status / Ops</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {rules.map(rule => (
                        <tr key={rule.id} className="group hover:bg-slate-50/80 transition-all">
                            <td className="px-8 py-6">
                                <div className="font-bold text-slate-800 tracking-tight">{rule.name}</div>
                                <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Rule ID: {rule.id}</div>
                            </td>
                            <td className="px-8 py-6">
                                {rule.policy_type === "global"
                                    ? <span className="text-[10px] font-black uppercase tracking-widest bg-purple-50 text-purple-600 px-3 py-1 rounded-lg border border-purple-100">
                                        {rule.node_filter || "All Nodes"}
                                      </span>
                                    : <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-3 py-1 rounded-lg border border-blue-100">
                                        Node {rule.node_id}
                                      </span>
                                }
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-600 capitalize">{rule.metric}</span>
                                    <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                                        {rule.operator_display} {rule.threshold}
                                    </span>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <ActionBadge action={rule.action_display} />
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end gap-4">
                                    <button
                                        onClick={() => onToggle(rule.id, rule.active)}
                                        className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-all border ${
                                            rule.active
                                                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                : "bg-slate-100 text-slate-400 border-slate-200"
                                        }`}
                                    >
                                        {rule.active ? "Active" : "Disabled"}
                                    </button>
                                    <button
                                        onClick={() => onDelete(rule.id)}
                                        className="text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function ActionBadge({ action }) {
    const styles = {
        "Alert only":       "bg-amber-50 text-amber-600 border-amber-100",
        "Quarantine node":  "bg-orange-50 text-orange-600 border-orange-100",
        "SNMP shutdown":    "bg-red-50 text-red-600 border-red-100",
    }
    const style = styles[action] ?? "bg-slate-50 text-slate-600 border-slate-100"
    return (
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${style}`}>
            {action}
        </span>
    )
}

function ThresholdForm({ onClose, onSubmit }) {
    const { nodes } = useNodes()
    const [policyType, setPolicyType] = useState("global")
    const [selectedNodeId, setSelectedNodeId] = useState("")
    const { metrics, loading: metricsLoading } = useNodeResources(
        policyType === "specific" ? selectedNodeId : null
    )
    const [formError, setFormError] = useState(null)
    const [saving, setSaving] = useState(false)

    const [form, setForm] = useState({
        name: "",
        policy_type: "global",
        node_filter: "",
        node_id: "",
        resource_id: "",
        metric: "",
        operator: ">",
        threshold: "",
        action: "alert",
    })

    const inputClass = "w-full bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
    const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1"

    const handlePolicyTypeChange = (type) => {
        setPolicyType(type)
        setForm(prev => ({ ...prev, policy_type: type, node_filter: "", node_id: "", resource_id: "", metric: "" }))
        setSelectedNodeId("")
    }

    const handleNodeSelect = (nodeId) => {
        setSelectedNodeId(nodeId)
        setForm(prev => ({ ...prev, node_id: nodeId, resource_id: "", metric: "" }))
    }

    const handleMetricSelect = (metricStr) => {
        const selected = metrics.find(m => m.metric === metricStr)
        setForm(prev => ({ ...prev, metric: metricStr, resource_id: selected?.resource_id ?? "" }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
        setSaving(true)
        try {
            await onSubmit({ ...form, threshold: parseFloat(form.threshold) })
        } catch (err) {
            setFormError(err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
                <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Define Rule</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Threshold Logic Layer</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-300 hover:text-slate-900 transition-all">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="px-10 py-8 overflow-y-auto max-h-[70vh]">
                    {formError && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 italic">{formError}</div>}

                    <form id="threshold-form" onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className={labelClass}>Rule Identifier</label>
                            <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} placeholder="e.g. Critical Core Load" />
                        </div>

                        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 space-y-6">
                            <div>
                                <label className={labelClass}>Target Architecture</label>
                                <div className="grid grid-cols-2 gap-3 p-1 bg-white rounded-2xl border border-slate-200">
                                    {["global", "specific"].map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => handlePolicyTypeChange(type)}
                                            className={`py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                                                policyType === type ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {policyType === "global" ? (
                                <select required value={form.node_filter} onChange={e => setForm({...form, node_filter: e.target.value})} className={inputClass}>
                                    <option value="">Select Asset Class...</option>
                                    <option value="router">Routers</option>
                                    <option value="switch">Switches</option>
                                    <option value="server">Servers</option>
                                    <option value="firewall">Firewalls</option>
                                </select>
                            ) : (
                                <select required value={selectedNodeId} onChange={e => handleNodeSelect(e.target.value)} className={inputClass}>
                                    <option value="">Select Instance...</option>
                                    {nodes.map(node => <option key={node.id} value={node.id}>{node.label}</option>)}
                                </select>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className={labelClass}>Metric Telementry</label>
                                {policyType === "specific" && selectedNodeId ? (
                                    <select required value={form.metric} onChange={e => handleMetricSelect(e.target.value)} className={inputClass}>
                                        <option value="">Select Metric...</option>
                                        {metrics.map(m => <option key={m.metric} value={m.metric}>{m.metric} ({m.resource_type})</option>)}
                                    </select>
                                ) : (
                                    <select required value={form.metric} onChange={e => setForm({...form, metric: e.target.value})} className={inputClass} disabled={policyType === "specific" && !selectedNodeId}>
                                        <option value="">Select Global Metric...</option>
                                        <option value="MemPctUsage">Memory Usage %</option>
                                        <option value="CpuRawUser">CPU Usage</option>
                                        <option value="hrStorageUsed">Disk Usage</option>
                                    </select>
                                )}
                            </div>
                            <div>
                                <label className={labelClass}>Operator</label>
                                <select required value={form.operator} onChange={e => setForm({...form, operator: e.target.value})} className={inputClass}>
                                    <option value=">">&gt; Greater</option>
                                    <option value="<">&lt; Less</option>
                                    <option value=">=">&ge; Equal+</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Threshold</label>
                                <input required type="number" step="0.1" value={form.threshold} onChange={e => setForm({...form, threshold: e.target.value})} className={inputClass} placeholder="90.0" />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Protocol Action</label>
                            <select required value={form.action} onChange={e => setForm({...form, action: e.target.value})} className={inputClass}>
                                <option value="alert">Telemetry Alert Only</option>
                                <option value="quarantine">Quarantine Node</option>
                                <option value="shutdown">Initiate SNMP Shutdown</option>
                            </select>
                        </div>
                    </form>
                </div>

                <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-6 items-center">
                    <button type="button" onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Abort</button>
                    <button
                        form="threshold-form"
                        type="submit"
                        disabled={saving}
                        className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {saving ? "Deploying..." : "Deploy Rule"}
                    </button>
                </div>
            </div>
        </div>
    )
}