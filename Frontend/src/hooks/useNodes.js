// src/hooks/useNodes.js
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { api } from "../api/opennms"

export const useNodes = (filters = {}) => {
    const [nodes, setNodes]     = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)
    const debounceTimer         = useRef(null)

    const stableFilters = useMemo(
        () => filters,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(filters)]
    )

    const fetchNodes = useCallback(async () => {
        try {
            setLoading(true)
            const data = await api.get("/nodes/", stableFilters)
            const list = data?.node ?? data ?? []
            setNodes(list)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [stableFilters])

    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
        debounceTimer.current = setTimeout(() => {
            fetchNodes()
        }, 500)
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current)
        }
    }, [fetchNodes])

    const addNode = async (payload) => {
        await api.post("/nodes/", payload)
        await new Promise(resolve => setTimeout(resolve, 4000))
        fetchNodes()
    }

    const updateNode = async (id, payload) => {
        await api.patch(`/nodes/${id}/`, payload)
        fetchNodes()
    }

    const deleteNode = async (id) => {
        await api.delete(`/nodes/${id}/`)
        fetchNodes()
    }

    return {
        nodes, loading, error,
        addNode, updateNode, deleteNode,
        refetch: fetchNodes
    }
}