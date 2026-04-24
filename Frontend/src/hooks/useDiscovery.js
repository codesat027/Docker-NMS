// src/hooks/useDiscovery.js
import { useState } from "react"
import { api } from "../api/opennms"

export const useDiscovery = () => {
    const [job, setJob]         = useState(null)
    const [polling, setPolling] = useState(false)
    const [error, setError]     = useState(null)

    const startDiscovery = async (ip_range) => {
        try {
            setError(null)
            const newJob = await api.post("/discovery/", { ip_range })
            setJob(newJob)
            pollStatus(newJob.id)
        } catch (err) {
            setError(err.message)
        }
    }

    const pollStatus = (jobId) => {
        setPolling(true)
        const interval = setInterval(async () => {
            try {
                const status = await api.get(`/discovery/${jobId}/status/`)
                setJob(status)
                if (status.status === "completed" || status.status === "failed") {
                    clearInterval(interval)
                    setPolling(false)
                }
            } catch {
                clearInterval(interval)
                setPolling(false)
            }
        }, 5000)
    }

    return { job, polling, error, startDiscovery }
}