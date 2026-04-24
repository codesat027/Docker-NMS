import { Navigate } from "react-router-dom"
import { useAuth } from "../Context/useAuth"

export const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, loading, user } = useAuth()

    if (loading) return <div>Loading...</div>

    if (!isAuthenticated) return <Navigate to="/login" replace />

    // role check if required
    if (requiredRole === "superadmin" && user?.role !== "superadmin") {
        return <Navigate to="/dashboard" replace />
    }

    if (requiredRole === "admin" &&
        !["admin", "superadmin"].includes(user?.role)) {
        return <Navigate to="/dashboard" replace />
    }

    return children
}