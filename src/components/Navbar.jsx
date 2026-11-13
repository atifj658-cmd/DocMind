
import { Search, Bell, Sun, Moon, User } from "lucide-react";
import { useLocation } from "react-router-dom";

function Navbar({ mode, toggleMode }) {
  const location = useLocation();
  let pageTitle;

if (location.pathname === "/") {
  pageTitle = "Dashboard";
} else if (location.pathname === "/documents") {
  pageTitle = "My Documents";
} else if (location.pathname === "/chat") {
  pageTitle = "AI Chat";
} else if (location.pathname === "/search") {
  pageTitle = "AI Search";
} else if (location.pathname === "/history") {
  pageTitle = "Chat History";
} else if (location.pathname === "/settings") {
  pageTitle = "Settings";
}

  return (
    <header className="navbar">

      <div className="navbar-left">
        <h2>{pageTitle}</h2>
      </div>

      <div className="navbar-right">

        <div className="navbar-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search documents..."
          />
        </div>

        <button className="icon-button" onClick={toggleMode}>
          {mode === "light" ? <Moon size={19} /> : <Sun size={19} />}
        </button>

        <button className="icon-button">
          <Bell size={19} />
        </button>

        <div className="profile-icon">
          <User size={20} />
        </div>

      </div>

    </header>
  );
}

export default Navbar;
