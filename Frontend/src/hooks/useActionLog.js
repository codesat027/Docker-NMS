// src/hooks/useActionLog.js
import { useState, useEffect, useCallback } from "react"
import { api } from "../api/opennms"

export const useActionLog = () => {
    const [actions, setActions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

    const fetchActions = useCallback(async () => {
        try {
            setLoading(true)
            const data = await api.get("/actions/")
            setActions(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchActions()
    }, [fetchActions])

    const resolveAction = async (id) => {
        await api.patch(`/actions/${id}/`, { resolved: true })
        fetchActions()
    }

    return {
        actions, loading, error,
        resolveAction,
        refetch: fetchActions
    }
}