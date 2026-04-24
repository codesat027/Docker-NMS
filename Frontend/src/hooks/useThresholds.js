// src/hooks/useThresholds.js
import { useState, useEffect, useCallback } from "react"
import { api } from "../api/opennms"

export const useThresholds = () => {
    const [rules, setRules]     = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

    const fetchRules = useCallback(async () => {
        try {
            setLoading(true)
            const data = await api.get("/thresholds/")
            setRules(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchRules()
    }, [fetchRules])

    const createRule = async (payload) => {
        await api.post("/thresholds/", payload)
        fetchRules()
    }

    const updateRule = async (id, payload) => {
        await api.patch(`/thresholds/${id}/`, payload)
        fetchRules()
    }

    const deleteRule = async (id) => {
        await api.delete(`/thresholds/${id}/`)
        fetchRules()
    }

    return {
        rules, loading, error,
        createRule, updateRule, deleteRule,
        refetch: fetchRules
    }
}