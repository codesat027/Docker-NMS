import { useActionLog } from "../hooks/useActionLog"

export default function ActionLogPage() {
    const { actions, loading, error, resolveAction } = useActionLog()

    if (loading) return <div className="p-4">Loading action log...</div>
    if (error)   return <div className="p-4 text-red-500">Error: {error}</div>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Action Log</h1>

            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left border">Node</th>
                            <th className="p-3 text-left border">Action</th>
                            <th className="p-3 text-left border">Rule</th>
                            <th className="p-3 text-left border">Triggered At</th>
                            <th className="p-3 text-left border">Status</th>
                            <th className="p-3 text-left border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actions.map(action => (
                            <tr key={action.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{action.node_label}</td>
                                <td className="p-3 border">{action.action_taken_display}</td>
                                <td className="p-3 border">{action.rule ?? "—"}</td>
                                <td className="p-3 border">
                                    {new Date(action.triggered_at).toLocaleString()}
                                </td>
                                <td className="p-3 border">
                                    {action.resolved
                                        ? <span className="text-green-600 text-xs font-medium">Resolved</span>
                                        : <span className="text-orange-600 text-xs font-medium">Active</span>
                                    }
                                </td>
                                <td className="p-3 border">
                                    {!action.resolved && (
                                        <button
                                            onClick={() => resolveAction(action.id)}
                                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                                        >
                                            Resolve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {actions.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-400">
                                    No actions logged yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}