// src/hooks/useOutages.js
import { useState, useEffect, useCallback, useMemo } from "react"
import { api } from "../api/opennms"

export const useOutages = (filters = {}) => {
    const [outages, setOutages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

    const stableFilters = useMemo(
        () => filters,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(filters)]
    )

    const fetchOutages = useCallback(async () => {
        try {
            setLoading(true)
            const data = await api.get("/outages/", stableFilters)
            const list = data?.outage ?? data ?? []
            // dedupe: OpenNMS creates one record per service per interface on the same node
            const seen = new Set()
            const deduped = list.filter(o => {
                const key = `${o.nodeId}-${o.ifLostService}`
                if (seen.has(key)) return false
                seen.add(key)
                return true
            })
            setOutages(deduped)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [stableFilters])

    useEffect(() => {
        fetchOutages()
    }, [fetchOutages])

    return { outages, loading, error, refetch: fetchOutages }
}