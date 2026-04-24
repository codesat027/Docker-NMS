import { useState, useEffect } from "react"
import { api } from "../api/opennms"

const RESOURCE_TYPE_LABELS = {
    cpu:         "CPU",
    mem_total:   "Memory",
    mem_free:    "Memory",
    disk:        "Disk",
    traffic_in:  "Interface",
    traffic_out: "Interface",
}

const FALLBACK_METRICS = [
    { metric: "ssCpuRawUser", resource_id: null, resource_type: "CPU" },
    { metric: "MemPctUsage",  resource_id: null, resource_type: "Memory" },
    { metric: "memAvailReal", resource_id: null, resource_type: "Memory" },
    { metric: "dskPercent",   resource_id: null, resource_type: "Disk" },
    { metric: "ifInOctets",   resource_id: null, resource_type: "Interface" },
    { metric: "ifOutOctets",  resource_id: null, resource_type: "Interface" },
]

// backend returns { cpu: {id, attr} | null, mem_total: ..., ... }
// transform into [{metric, resource_id, resource_type}] for the dropdown
const transformResourceDict = (data) => {
    if (Array.isArray(data)) return data.length > 0 ? data : FALLBACK_METRICS
    const list = Object.entries(data)
        .filter(([, val]) => val !== null)
        .map(([key, val]) => ({
            metric:        val.attr,
            resource_id:   val.id,
            resource_type: RESOURCE_TYPE_LABELS[key] ?? key,
        }))
    return list.length > 0 ? list : FALLBACK_METRICS
}

export const useNodeResources = (nodeId) => {
    const [metrics, setMetrics] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState(null)

    useEffect(() => {
        if (!nodeId) return

        const fetchResources = async () => {
            setLoading(true)
            try {
                const data = await api.get(`/nodes/${nodeId}/resources/`)
                setMetrics(transformResourceDict(data))
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchResources()
    }, [nodeId])

    return { metrics, loading, error }
}