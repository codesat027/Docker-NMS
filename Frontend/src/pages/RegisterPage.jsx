// import { useState } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import { useAuth } from "../Context/useAuth"

// export default function RegisterPage() {
//     const [form, setForm] = useState({
//         username:     "",
//         email:        "",
//         password:     "",
//         password2:    "",
//         role:         "viewer",
//         organization: "",
//     })
//     const [error, setError]     = useState(null)
//     const [loading, setLoading] = useState(false)

//     const { login } = useAuth()
//     const navigate  = useNavigate()

//     const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         if (form.password !== form.password2) {
//             setError("Passwords do not match")
//             return
//         }
//         setError(null)
//         setLoading(true)
//         try {
//             const res = await fetch("/api/auth/register/", {
//                 method:  "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body:    JSON.stringify(form),
//             })
//             const data = await res.json()
//             if (!res.ok) {
//                 const msg = Object.values(data).flat().join(" ")
//                 throw new Error(msg || "Registration failed")
//             }
//             // auto-login after register
//             await login(form.username, form.password)
//             navigate("/dashboard")
//         } catch (err) {
//             setError(err.message)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//                 <h1 className="text-2xl font-bold mb-2 text-center">Create Account</h1>
//                 <p className="text-sm text-gray-500 text-center mb-6">PulseMonitor</p>

//                 {error && (
//                     <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded px-3 py-2">
//                         {error}
//                     </p>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-2 gap-3">
//                         <div>
//                             <label className="block text-sm font-medium mb-1">Username *</label>
//                             <input
//                                 required
//                                 value={form.username}
//                                 onChange={set("username")}
//                                 className="w-full border rounded px-3 py-2 text-sm"
//                                 placeholder="johndoe"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium mb-1">Email</label>
//                             <input
//                                 type="email"
//                                 value={form.email}
//                                 onChange={set("email")}
//                                 className="w-full border rounded px-3 py-2 text-sm"
//                                 placeholder="john@example.com"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium mb-1">Organization</label>
//                         <input
//                             value={form.organization}
//                             onChange={set("organization")}
//                             className="w-full border rounded px-3 py-2 text-sm"
//                             placeholder="Acme Corp"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium mb-1">Role *</label>
//                         <select
//                             value={form.role}
//                             onChange={set("role")}
//                             className="w-full border rounded px-3 py-2 text-sm"
//                         >
//                             <option value="viewer">Viewer — read only</option>
//                             <option value="admin">Admin — manage nodes &amp; thresholds</option>
//                             <option value="superadmin">Super Admin — full access</option>
//                         </select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                         <div>
//                             <label className="block text-sm font-medium mb-1">Password *</label>
//                             <input
//                                 required
//                                 type="password"
//                                 value={form.password}
//                                 onChange={set("password")}
//                                 className="w-full border rounded px-3 py-2 text-sm"
//                                 placeholder="Min 8 characters"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium mb-1">Confirm Password *</label>
//                             <input
//                                 required
//                                 type="password"
//                                 value={form.password2}
//                                 onChange={set("password2")}
//                                 className="w-full border rounded px-3 py-2 text-sm"
//                                 placeholder="Repeat password"
//                             />
//                         </div>
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50 mt-2"
//                     >
//                         {loading ? "Creating account..." : "Create Account"}
//                     </button>
//                 </form>

//                 <p className="text-sm text-center text-gray-500 mt-4">
//                     Already have an account?{" "}
//                     <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
//                 </p>
//             </div>
//         </div>
//     )
// }






import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../Context/useAuth"

export default function RegisterPage() {
    const [form, setForm] = useState({
        username:     "",
        email:        "",
        password:     "",
        password2:    "",
        role:         "viewer",
        organization: "",
    })
    const [error, setError]     = useState(null)
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate  = useNavigate()

    const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.password !== form.password2) {
            setError("Passwords do not match")
            return
        }
        setError(null)
        setLoading(true)
        try {
            const res = await fetch("/api/auth/register/", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(form),
            })
            const data = await res.json()
            if (!res.ok) {
                const msg = Object.values(data).flat().join(" ")
                throw new Error(msg || "Registration failed")
            }
            // auto-login after register
            await login(form.username, form.password)
            navigate("/dashboard")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
            {/* Soft decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-3xl opacity-50" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-3xl opacity-50" />
            </div>

            <div className="relative bg-white p-10 rounded-2xl shadow-xl shadow-blue-900/5 w-full max-w-lg border border-gray-100">
                {/* Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4 shadow-lg shadow-blue-200">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
                   
                </div>

                {error && (
                    <div className="mb-6 flex items-start gap-3 bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded shadow-sm animate-in fade-in slide-in-from-top-1">
                        <svg className="w-5 h-5 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Username *</label>
                            <input
                                required
                                value={form.username}
                                onChange={set("username")}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/30"
                                placeholder="johndoe"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={set("email")}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/30"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Organization</label>
                        <input
                            value={form.organization}
                            onChange={set("organization")}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/30"
                            placeholder="Acme Corp"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Access Role *</label>
                        <div className="relative">
                            <select
                                value={form.role}
                                onChange={set("role")}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/30 appearance-none cursor-pointer"
                            >
                                <option value="viewer">Viewer — read only</option>
                                <option value="admin">Admin — manage nodes & thresholds</option>
                                <option value="superadmin">Super Admin — full access</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Password *</label>
                            <input
                                required
                                type="password"
                                value={form.password}
                                onChange={set("password")}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/30"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Confirm *</label>
                            <input
                                required
                                type="password"
                                value={form.password2}
                                onChange={set("password2")}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/30"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-blue-200 transition-all mt-4 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </>
                        ) : "Create Account"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm font-medium text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
