// import "./App.css";
// import Details from "./components/Details";
// import SearchBar from "./components/SearchBar";
// import SideBar from "./components/SideBar";

// function App() {
//   return (
//     <>

//       <SearchBar></SearchBar>

//       <SideBar></SideBar>
//       <Details></Details>
//     </>
//   );
// }

// export default App;

// import "./App.css";
// import Details from "./components/Details";
// // import Alarms from "./components/Alarms";
// // import SearchBar from "./components/SearchBar";
// // import SideBar from "./components/SideBar";
// // import NodeGrid from "./components/NodeGrid";
// // import NodeDetailView from "./components/NodeDetailView";
// import { Router, Route, Routes } from "react-router-dom";

// function App() {
//   return (
//     // 1. Outer container: stacks SearchBar on top, and the "Bottom Half" below
//     <div className="flex flex-col h-screen w-full overflow-hidden">
//       {/* Top Bar */}
//       {/* <SearchBar /> */}

//       {/* 2. Inner Wrapper: This is the "magnet" that pulls Sidebar and Details into a row */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar stays fixed to the left */}

//         {/* <SideBar /> */}

//         {/* 3. Main Content: Takes up all remaining space */}
//         <main className="flex-1 overflow-y-auto bg-gray-50">
//           <Routes>
//             <Route path="/" element={<Details />} />
           
//             {/* <Route path="/alarms" element={<Alarms />} />
//             <Route path="/nodes" element={<NodeGrid></NodeGrid>} />
//             <Route path= "/nodes/:id" element={<NodeDetailView/>} /> */}


//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;


import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppSidebar } from "./components/SideBar";
import { useAuth } from "./Context/useAuth";

// new pages — create these as empty placeholders for now
import DashboardPage  from "./pages/DashboardPage";
import NodesPage      from "./pages/NodesPage";
import AlarmsPage     from "./pages/AlarmsPage";
import OutagesPage    from "./pages/OutagesPage";
import ThresholdsPage from "./pages/ThresholdsPage";
import ReportsPage    from "./pages/ReportsPage";
import ActionLogPage  from "./pages/ActionLogPage";
import DiscoveryPage  from "./pages/DiscoveryPage";
import UsersPage      from "./pages/UsersPage";
import LoginPage      from "./pages/LoginPage"
import RegisterPage   from "./pages/RegisterPage";
import { LandingPage } from "./pages/LandingPage";

const NO_SIDEBAR_PATHS = ["/login", "/register", "/"]

function App() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const showSidebar = !NO_SIDEBAR_PATHS.includes(location.pathname)

  return (
      <div className="flex h-screen w-full overflow-hidden">
        {showSidebar && <AppSidebar user={user} onLogout={logout} />}
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <Routes>
              {/* public */}
              <Route path="/login"    element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* <Route path="/test"   element={<Details />} /> */}
              <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />

              {/* protected — all roles */}
              <Route path="/dashboard" element={
                <ProtectedRoute><DashboardPage /></ProtectedRoute>
              }/>
              <Route path="/nodes" element={
                <ProtectedRoute><NodesPage /></ProtectedRoute>
              }/>
              <Route path="/alarms" element={
                <ProtectedRoute><AlarmsPage /></ProtectedRoute>
              }/>
              <Route path="/outages" element={
                <ProtectedRoute><OutagesPage /></ProtectedRoute>
              }/>
              <Route path="/reports" element={
                <ProtectedRoute><ReportsPage /></ProtectedRoute>
              }/>
              <Route path="/actions" element={
                <ProtectedRoute><ActionLogPage /></ProtectedRoute>
              }/>

              {/* protected — admin only */}
              <Route path="/thresholds" element={
                <ProtectedRoute requiredRole="admin"><ThresholdsPage /></ProtectedRoute>
              }/>
              <Route path="/discovery" element={
                <ProtectedRoute requiredRole="admin"><DiscoveryPage /></ProtectedRoute>
              }/>

              {/* protected — superadmin only */}
              <Route path="/users" element={
                <ProtectedRoute requiredRole="superadmin"><UsersPage /></ProtectedRoute>
              }/>
            </Routes>
          </main>
        </div>
      </div>
  
  )
}

export default App;
