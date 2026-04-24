import { createContext,  useState, useEffect } from "react"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser]   = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // check if token exists on app startup
        const token = localStorage.getItem("access_token")
        const savedUser = localStorage.getItem("user")
        if (token && savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const login = async (username, password) => {
        const res = await fetch("/api/auth/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })

        if (!res.ok) {
            const err = await res.json()
            throw new Error(err.non_field_errors?.[0] || "Login failed")
        }

        const data = await res.json()

        // store tokens
        localStorage.setItem("access_token",  data.tokens.access)
        localStorage.setItem("refresh_token", data.tokens.refresh)
        localStorage.setItem("user", JSON.stringify(data.user))

        setUser(data.user)
        return data.user
    }

    const logout = async () => {
        try {
            const refresh = localStorage.getItem("refresh_token")
            await fetch("/api/auth/logout/", {
                method: "POST",
                headers: {
                    "Content-Type":  "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify({ refresh })
            })
        } catch  {
            // logout anyway even if request fails
        } finally {
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            localStorage.removeItem("user")
            setUser(null)
        }
    }

    const refreshToken = async () => {
        const refresh = localStorage.getItem("refresh_token")
        if (!refresh) return false

        const res = await fetch("/api/auth/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh })
        })

        if (!res.ok) {
            logout()
            return false
        }

        const data = await res.json()
        localStorage.setItem("access_token", data.access)
        return true
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            refreshToken,
            isAuthenticated: !!user,
            isSuperAdmin:    user?.role === "superadmin",
            isAdmin:         user?.role === "admin" || user?.role === "superadmin",
            isViewer:        !!user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

