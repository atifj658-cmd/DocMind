import {
  LayoutDashboard,
  Files,
  MessageSquare,
  Search,
  History,
  Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {

  const menuItems = [
    { name: "Dashboard", exact: true, path: "/", icon: LayoutDashboard },
    { name: "My Documents", exact: false, path: "/documents", icon: Files },
    { name: "AI Chat", exact: false, path: "/chat", icon: MessageSquare },
    { name: "AI Search", exact: false, path: "/search", icon: Search },
    { name: "Chat History", exact: false, path: "/history", icon: History },
    { name: "Settings", exact: false, path: "/settings", icon: Settings }
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">D</div>
        <h2>DocMind</h2>
      </div>

      <p className="menu-heading">WORKSPACE</p>

      <nav className="sidebar-menu">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      <div className="sidebar-footer">
        <p>AI Powered Document Workspace</p>
        <span>Version 1.0</span>
      </div>

    </aside>
  );
}

export default Sidebar;