// import React from "react";
// import { useParams } from "react-router-dom";
// import { useNodeDetails } from "../hooks/useNodeDetails";

// const NodeDetailView = () => {
//   const { id } = useParams();
//   const { node, interfaces, alarms, loading, error } = useNodeDetails(id);

//   if (loading)
//     return <p className="p-10 text-center">Loading device details...</p>;
//   if (error) return <p className="p-10 text-red-500">Error: {error}</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* 1. Header Summary */}
//       <div className="bg-white p-6 rounded-t-xl border border-b-0 border-gray-200">
//         <h1 className="text-3xl font-bold text-gray-900">{node.label}</h1>
//         <p className="text-gray-500">
//           Foreign ID: {node.foreignId || "None"} | Created:{" "}
//           {new Date(node.createTime).toLocaleDateString()}
//         </p>
//       </div>

//       {/* 2. The Detailed Table */}
//       <div className="bg-white border border-gray-200 shadow-sm overflow-hidden rounded-b-xl">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                 IP Address
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                 Hostname
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                 Management
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                 Primary
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {interfaces.map((iface, idx) => (
//               <tr key={idx} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-indigo-600">
//                   {iface.ipAddress?.address || iface.ipAddress || "No address"}
//                 </td>

//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                   {iface.hostName || "---"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`px-2 py-1 text-xs font-bold rounded ${(iface.isManaged?.l)||String(iface.isManaged) === "MANAGED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
//                   >
//                     {iface.isManaged?.l||iface.isManaged}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
//                   {iface.snmpPrimary?.l || String(iface.snmpPrimary)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 3. Associated Alarms Table (Brief) */}
//       <div className="mt-8">
//         <h3 className="text-xl font-bold mb-4">Active Issues for this Node</h3>
//         {alarms.length === 0 ? (
//           <p className="text-gray-500 italic">
//             No active alarms for this device.
//           </p>
//         ) : (
//           <div className="bg-red-50 border border-red-100 rounded-lg p-4">
//             {/* Map through your alarms here */}
//             <p className="text-red-700 font-medium">
//               This node has {alarms.length} active alarm(s).
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NodeDetailView;
