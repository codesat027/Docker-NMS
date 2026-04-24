// import { useState } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import { useAuth } from "../Context/useAuth"

// export default function LoginPage() {
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")
//     const [error, setError]       = useState(null)
//     const [loading, setLoading]   = useState(false)

//     const { login } = useAuth()
//     const navigate  = useNavigate()

//     const handleLogin = async (e) => {
//         e.preventDefault()
//         setError(null)
//         setLoading(true)

//         try {
//             await login(username, password)
//             navigate("/dashboard")
//         } catch (err) {
//             setError(err.message)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
//                 <h1 className="text-2xl font-bold mb-6 text-center">
//                     PulseMonitor
//                 </h1>

//                 {error && (
//                     <p className="text-red-500 text-sm mb-4 text-center">
//                         {error}
//                     </p>
//                 )}

//                 <form onSubmit={handleLogin} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-1">
//                             Username
//                         </label>
//                         <input
//                             type="text"
//                             value={username}
//                             onChange={e => setUsername(e.target.value)}
//                             className="w-full border rounded px-3 py-2 text-sm"
//                             placeholder="Enter username"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium mb-1">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                             className="w-full border rounded px-3 py-2 text-sm"
//                             placeholder="Enter password"
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
//                     >
//                         {loading ? "Logging in..." : "Login"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// }



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

/**
 * LOGIN PAGE
 * A refined, modern authentication interface with improved UX.
 */
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      {/* Abstract background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600" />
      
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          <div className="p-8">
            {/* Logo Section */}
            <header className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-xl mb-4 shadow-lg shadow-blue-200">
                <ActivityIcon className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                PulseMonitor
              </h1>
              <p className="text-gray-500 mt-2">Sign in to manage your infrastructure</p>
            </header>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 flex items-center">
                <p className="text-red-700 text-sm font-medium ml-2">
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
                    Password
                  </label>
                  
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-sm transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-100"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>

          {/* Footer Area */}
          <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              New to PulseMonitor? <a href="#" className="text-blue-600 font-semibold hover:underline">Contact Admin</a>
            </p>
          </div>
        </div>
        
        <p className="text-center text-gray-400 text-xs mt-8 uppercase tracking-widest font-medium">
          &copy; 2026 PulseMonitor Enterprise
        </p>
      </div>
    </div>
  );
}

// Simple internal icon component for the "Activity/Pulse" logo
function ActivityIcon({ className }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2.5}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M13 10V3L4 14h7v7l9-11h-7z" 
      />
    </svg>
  );
}