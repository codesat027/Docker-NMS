// import { useState, useEffect, useCallback } from "react"
// import { api } from "../api/opennms"

// const ROLES = ["viewer", "admin", "superadmin"]

// const ROLE_COLORS = {
//     superadmin: "bg-purple-100 text-purple-700",
//     admin:      "bg-blue-100 text-blue-700",
//     viewer:     "bg-gray-100 text-gray-600",
// }

// export default function UsersPage() {
//     const [users, setUsers]       = useState([])
//     const [loading, setLoading]   = useState(true)
//     const [error, setError]       = useState(null)
//     const [showForm, setShowForm] = useState(false)
//     const [editUser, setEditUser] = useState(null)

//     const fetchUsers = useCallback(async () => {
//         try {
//             setLoading(true)
//             const data = await api.get("/auth/users/")
//             setUsers(Array.isArray(data) ? data : [])
//         } catch (err) {
//             setError(err.message)
//         } finally {
//             setLoading(false)
//         }
//     }, [])

//     useEffect(() => { fetchUsers() }, [fetchUsers])

//     const handleDelete = async (user) => {
//         if (!confirm(`Delete user "${user.username}"? This cannot be undone.`)) return
//         try {
//             await api.delete(`/auth/users/${user.id}/`)
//             fetchUsers()
//         } catch (err) {
//             alert(err.message)
//         }
//     }

//     const handleToggleActive = async (user) => {
//         try {
//             await api.patch(`/auth/users/${user.id}/`, { is_active: !user.is_active })
//             fetchUsers()
//         } catch (err) {
//             alert(err.message)
//         }
//     }

//     if (loading) return <div className="p-4">Loading users...</div>
//     if (error)   return <div className="p-4 text-red-500">Error: {error}</div>

//     return (
//         <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h1 className="text-2xl font-bold">User Management</h1>
//                     <p className="text-sm text-gray-500 mt-1">{users.length} users registered</p>
//                 </div>
//                 <button
//                     onClick={() => { setEditUser(null); setShowForm(true) }}
//                     className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
//                 >
//                     Add User
//                 </button>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 text-left border">Username</th>
//                             <th className="p-3 text-left border">Email</th>
//                             <th className="p-3 text-left border">Organization</th>
//                             <th className="p-3 text-left border">Role</th>
//                             <th className="p-3 text-left border">Status</th>
//                             <th className="p-3 text-left border">Joined</th>
//                             <th className="p-3 text-left border">Last Login</th>
//                             <th className="p-3 text-left border">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user.id} className={`hover:bg-gray-50 ${!user.is_active ? "opacity-50" : ""}`}>
//                                 <td className="p-3 border font-medium">{user.username}</td>
//                                 <td className="p-3 border text-gray-500">{user.email || "—"}</td>
//                                 <td className="p-3 border text-gray-500">{user.organization || "—"}</td>
//                                 <td className="p-3 border">
//                                     <span className={`text-xs px-2 py-1 rounded font-medium ${ROLE_COLORS[user.role] ?? "bg-gray-100 text-gray-600"}`}>
//                                         {user.role}
//                                     </span>
//                                 </td>
//                                 <td className="p-3 border">
//                                     <span className={`text-xs font-medium ${user.is_active ? "text-green-600" : "text-red-500"}`}>
//                                         {user.is_active ? "Active" : "Disabled"}
//                                     </span>
//                                 </td>
//                                 <td className="p-3 border text-gray-500">
//                                     {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
//                                 </td>
//                                 <td className="p-3 border text-gray-500">
//                                     {user.last_login ? new Date(user.last_login).toLocaleString() : "Never"}
//                                 </td>
//                                 <td className="p-3 border">
//                                     <div className="flex gap-2">
//                                         <button
//                                             onClick={() => { setEditUser(user); setShowForm(true) }}
//                                             className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleToggleActive(user)}
//                                             className={`text-xs px-2 py-1 rounded ${
//                                                 user.is_active
//                                                     ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
//                                                     : "bg-green-100 text-green-700 hover:bg-green-200"
//                                             }`}
//                                         >
//                                             {user.is_active ? "Disable" : "Enable"}
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(user)}
//                                             className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                         {users.length === 0 && (
//                             <tr>
//                                 <td colSpan={8} className="p-4 text-center text-gray-400">
//                                     No users found
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {showForm && (
//                 <UserForm
//                     user={editUser}
//                     onClose={() => setShowForm(false)}
//                     onSaved={() => { setShowForm(false); fetchUsers() }}
//                 />
//             )}
//         </div>
//     )
// }


// function UserForm({ user, onClose, onSaved }) {
//     const isEdit = !!user

//     const [form, setForm] = useState({
//         username:     user?.username     ?? "",
//         email:        user?.email        ?? "",
//         organization: user?.organization ?? "",
//         role:         user?.role         ?? "viewer",
//         password:     "",
//         password2:    "",
//     })
//     const [error, setError]     = useState(null)
//     const [loading, setLoading] = useState(false)

//     const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setError(null)

//         if (!isEdit && form.password !== form.password2) {
//             setError("Passwords do not match")
//             return
//         }

//         setLoading(true)
//         try {
//             if (isEdit) {
//                 await api.patch(`/auth/users/${user.id}/`, {
//                     email:        form.email,
//                     organization: form.organization,
//                     role:         form.role,
//                 })
//             } else {
//                 const res = await fetch("/api/auth/users/", {
//                     method:  "POST",
//                     headers: {
//                         "Content-Type":  "application/json",
//                         "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//                     },
//                     body: JSON.stringify(form),
//                 })
//                 const data = await res.json()
//                 if (!res.ok) {
//                     const msg = Object.values(data).flat().join(" ")
//                     throw new Error(msg || "Failed to create user")
//                 }
//             }
//             onSaved()
//         } catch (err) {
//             setError(err.message)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-lg font-bold">{isEdit ? "Edit User" : "Add User"}</h2>
//                     <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
//                 </div>

//                 {error && (
//                     <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded px-3 py-2">
//                         {error}
//                     </p>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-1">Username *</label>
//                         <input
//                             required
//                             value={form.username}
//                             onChange={set("username")}
//                             disabled={isEdit}
//                             className="w-full border rounded px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-400"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium mb-1">Email</label>
//                         <input
//                             type="email"
//                             value={form.email}
//                             onChange={set("email")}
//                             className="w-full border rounded px-3 py-2 text-sm"
//                             placeholder="user@example.com"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium mb-1">Organization</label>
//                         <input
//                             value={form.organization}
//                             onChange={set("organization")}
//                             className="w-full border rounded px-3 py-2 text-sm"
//                             placeholder="Company name"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium mb-1">Role *</label>
//                         <select
//                             value={form.role}
//                             onChange={set("role")}
//                             className="w-full border rounded px-3 py-2 text-sm"
//                         >
//                             {ROLES.map(r => (
//                                 <option key={r} value={r}>{r}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {!isEdit && (
//                         <div className="grid grid-cols-2 gap-3">
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">Password *</label>
//                                 <input
//                                     required
//                                     type="password"
//                                     value={form.password}
//                                     onChange={set("password")}
//                                     className="w-full border rounded px-3 py-2 text-sm"
//                                     placeholder="Min 8 characters"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">Confirm *</label>
//                                 <input
//                                     required
//                                     type="password"
//                                     value={form.password2}
//                                     onChange={set("password2")}
//                                     className="w-full border rounded px-3 py-2 text-sm"
//                                     placeholder="Repeat password"
//                                 />
//                             </div>
//                         </div>
//                     )}

//                     <div className="flex justify-end gap-3 pt-2">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//                         >
//                             {loading ? "Saving..." : isEdit ? "Save Changes" : "Create User"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }





import { useState, useEffect, useCallback } from "react"
import { api } from "../api/opennms"

const ROLES = ["viewer", "admin", "superadmin"]

const ROLE_COLORS = {
    superadmin: "bg-purple-100 text-purple-700 ring-1 ring-purple-200",
    admin:      "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
    viewer:     "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
}

export default function UsersPage() {
    const [users, setUsers]       = useState([])
    const [loading, setLoading]   = useState(true)
    const [error, setError]       = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [editUser, setEditUser] = useState(null)

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true)
            const data = await api.get("/auth/users/")
            setUsers(Array.isArray(data) ? data : [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchUsers() }, [fetchUsers])

    const handleDelete = async (user) => {
        if (!confirm(`Delete user "${user.username}"? This cannot be undone.`)) return
        try {
            await api.delete(`/auth/users/${user.id}/`)
            fetchUsers()
        } catch (err) {
            alert(err.message)
        }
    }

    const handleToggleActive = async (user) => {
        try {
            await api.patch(`/auth/users/${user.id}/`, { is_active: !user.is_active })
            fetchUsers()
        } catch (err) {
            alert(err.message)
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-100">
            <div className="animate-pulse text-gray-400 font-medium">Loading user directory...</div>
        </div>
    )
    
    if (error) return (
        <div className="p-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-bold">Error loading users</p>
                <p className="text-sm">{error}</p>
            </div>
        </div>
    )

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
                    <p className="text-gray-500 mt-1 font-medium">
                        Manage permissions and account access for {users.length} registered users.
                    </p>
                </div>
                <button
                    onClick={() => { setEditUser(null); setShowForm(true) }}
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm shadow-blue-200 transition-all active:scale-95"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add New User
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-200">
                                <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Username</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Contact & Org</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Role</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Status</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Timeline</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-xs text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map(user => (
                                <tr key={user.id} className={`group hover:bg-blue-50/30 transition-colors ${!user.is_active ? "bg-gray-50/50" : ""}`}>
                                    <td className="p-4 align-middle">
                                        <div className="font-bold text-gray-900">{user.username}</div>
                                        <div className="text-xs text-gray-400 mt-0.5 font-mono">ID: {user.id.toString().substring(0, 8)}</div>
                                    </td>
                                    <td className="p-4 align-middle text-gray-600">
                                        <div className="truncate max-w-45">{user.email || "—"}</div>
                                        <div className="text-xs text-gray-400">{user.organization || "No Organization"}</div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${ROLE_COLORS[user.role] ?? "bg-gray-100 text-gray-600"}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center">
                                            <div className={`h-2 w-2 rounded-full mr-2 ${user.is_active ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-gray-300"}`} />
                                            <span className={`text-xs font-bold ${user.is_active ? "text-green-700" : "text-gray-500"}`}>
                                                {user.is_active ? "Active" : "Disabled"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-gray-500 text-xs leading-relaxed">
                                        <div>Created: <span className="text-gray-700">{user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</span></div>
                                        <div>Login: <span className="text-gray-700 font-medium">{user.last_login ? new Date(user.last_login).toLocaleDateString() : "Never"}</span></div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setEditUser(user); setShowForm(true) }}
                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                title="Edit User"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleToggleActive(user)}
                                                className={`p-2 rounded-lg transition-colors ${user.is_active ? "text-amber-600 hover:bg-amber-100" : "text-emerald-600 hover:bg-emerald-100"}`}
                                                title={user.is_active ? "Disable Account" : "Enable Account"}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={user.is_active ? "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"} />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                title="Delete User"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="bg-gray-100 p-4 rounded-full mb-4">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 font-medium">No users found in database</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showForm && (
                <UserForm
                    user={editUser}
                    onClose={() => setShowForm(false)}
                    onSaved={() => { setShowForm(false); fetchUsers() }}
                />
            )}
        </div>
    )
}

function UserForm({ user, onClose, onSaved }) {
    const isEdit = !!user

    const [form, setForm] = useState({
        username:     user?.username     ?? "",
        email:        user?.email        ?? "",
        organization: user?.organization ?? "",
        role:         user?.role         ?? "viewer",
        password:     "",
        password2:    "",
    })
    const [error, setError]     = useState(null)
    const [loading, setLoading] = useState(false)

    const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!isEdit && form.password !== form.password2) {
            setError("Passwords do not match")
            return
        }

        setLoading(true)
        try {
            if (isEdit) {
                await api.patch(`/auth/users/${user.id}/`, {
                    email:        form.email,
                    organization: form.organization,
                    role:         form.role,
                })
            } else {
                const res = await fetch("/api/auth/users/", {
                    method:  "POST",
                    headers: {
                        "Content-Type":  "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    body: JSON.stringify(form),
                })
                const data = await res.json()
                if (!res.ok) {
                    const msg = Object.values(data).flat().join(" ")
                    throw new Error(msg || "Failed to create user")
                }
            }
            onSaved()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100"
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{isEdit ? "Update User" : "Create Account"}</h2>
                        <p className="text-sm text-gray-500 mt-1">{isEdit ? `Account: ${user.username}` : "Enter credentials for the new user."}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {error && (
                        <div className="mb-6 flex items-start gap-3 bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded">
                            <span className="text-sm font-semibold">{error}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Username</label>
                                <input required value={form.username} onChange={set("username")} disabled={isEdit} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none disabled:bg-gray-100" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Role</label>
                                <select value={form.role} onChange={set("role")} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none bg-white">
                                    {ROLES.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                            <input type="email" value={form.email} onChange={set("email")} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Organization</label>
                            <input value={form.organization} onChange={set("organization")} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none" />
                        </div>

                        {!isEdit && (
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                                    <input required type="password" value={form.password} onChange={set("password")} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Confirm</label>
                                    <input required type="password" value={form.password2} onChange={set("password2")} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Discard</button>
                        <button type="submit" disabled={loading} className="px-6 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 shadow-lg shadow-blue-200 flex items-center gap-2">
                            {loading ? "Processing..." : isEdit ? "Update User" : "Create User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}