import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Server,
  AlertTriangle,
  Power,
  FileText,
  Gauge,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard",   path: "/dashboard", icon: LayoutDashboard },
  { label: "Nodes",       path: "/nodes",      icon: Server },
  { label: "Alarms",      path: "/alarms",     icon: AlertTriangle },
  { label: "Outages",     path: "/outages",    icon: Power },
  { label: "Reports",     path: "/reports",    icon: FileText },
];

const adminMenuItems = [
  { label: "Thresholds", path: "/thresholds", icon: Gauge },
];

const superadminMenuItems = [
  { label: "Users", path: "/users", icon: Users },
];

export function AppSidebar({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate  = useNavigate();
  const userRole  = user?.role || "user";
  const isAdmin      = userRole === "admin" || userRole === "superadmin";
  const isSuperadmin = userRole === "superadmin";

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      collapsed ? "justify-center" : "gap-3"
    } ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const NavItem = ({ item }) => (
    <li>
      <NavLink to={item.path} className={linkClasses} title={collapsed ? item.label : undefined}>
        <item.icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span>{item.label}</span>}
      </NavLink>
    </li>
  );

  return (
    <aside
      className={`relative flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(v => !v)}
        className="absolute -right-3 top-5 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-900"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {/* Logo / Brand */}
      <div className={`flex h-16 items-center border-b border-gray-200 ${collapsed ? "justify-center px-3" : "gap-2 px-6"}`}>
        <Server className="h-6 w-6 shrink-0 text-blue-600" />
        {!collapsed && (
          <span className="text-lg font-semibold text-gray-900 whitespace-nowrap">Pulse Monitor</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2">
        <ul className="flex flex-col gap-1">
          {menuItems.map(item => <NavItem key={item.path} item={item} />)}
        </ul>

        {isAdmin && (
          <>
            {!collapsed && (
              <div className="mt-6 mb-2 px-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Admin
                </span>
              </div>
            )}
            {collapsed && <div className="my-3 border-t border-gray-100" />}
            <ul className="flex flex-col gap-1">
              {adminMenuItems.map(item => <NavItem key={item.path} item={item} />)}
            </ul>
          </>
        )}

        {isSuperadmin && (
          <>
            {!collapsed && (
              <div className="mt-6 mb-2 px-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Superadmin
                </span>
              </div>
            )}
            {collapsed && <div className="my-3 border-t border-gray-100" />}
            <ul className="flex flex-col gap-1">
              {superadminMenuItems.map(item => <NavItem key={item.path} item={item} />)}
            </ul>
          </>
        )}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-gray-200 p-3">
        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-medium text-blue-600">
            {(user?.username ?? user?.name)?.charAt(0)?.toUpperCase() || "U"}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-gray-900">
                {user?.username || user?.name || "User"}
              </p>
              <p className="truncate text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 ${collapsed ? "mt-2" : ""}`}
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
