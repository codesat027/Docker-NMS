// src/hooks/useAlarms.js
import { useState, useEffect, useCallback, useMemo } from "react"
import { api } from "../api/opennms"

export const useAlarms = (filters = {}) => {
    const [alarms, setAlarms]   = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

    const stableFilters = useMemo(
        () => filters,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(filters)]
    )

    const fetchAlarms = useCallback(async () => {
        try {
            setLoading(true)
            const data = await api.get("/alarms/", stableFilters)
            const list = data?.alarm ?? data ?? []
            setAlarms(list)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [stableFilters])

    useEffect(() => {
        fetchAlarms()
    }, [fetchAlarms])

    return { alarms, loading, error, refetch: fetchAlarms }
}