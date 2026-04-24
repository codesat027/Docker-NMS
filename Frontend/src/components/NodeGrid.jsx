
// import { useNodes } from '../hooks/useNodes';
// import { Link } from 'react-router-dom';

// const NodeGrid = () => {
//   const { nodes, loading } = useNodes();

//   if (loading) return <div className="p-10 text-center text-gray-500 italic">Scanning Inventory...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Network Inventory ({nodes.length})</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {nodes.map((node) => (
//           <div key={node.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-lg font-bold text-indigo-700">{node.label}</h3>
//                 <p className="text-sm text-gray-500">IP: {node.mainIp || 'Unknown'}</p>
//               </div>
//               {/* Status Dot: Logic based on if alarms exist */}
//               <span className="flex h-3 w-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
//             </div>

//             <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
//               <span className="text-xs font-mono text-gray-400">ID: {node.id}</span>
              
//               <Link 
//                 to={`/nodes/${node.id}`}
//                 className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
//               >
//                 View Details →
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NodeGrid;