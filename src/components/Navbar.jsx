
import { useState } from "react";
import {
  Search,
  Bell,
  User,
  Palette,
  Check
} from "lucide-react";
import { useLocation } from "react-router-dom";

function Navbar({ theme, setTheme }) {

  const location = useLocation();
  const [showThemes, setShowThemes] = useState(false);

  let pageTitle;

  if (location.pathname === "/") pageTitle = "Dashboard";
  else if (location.pathname === "/documents") pageTitle = "My Documents";
  else if (location.pathname === "/chat") pageTitle = "AI Chat";
  else if (location.pathname === "/search") pageTitle = "AI Search";
  else if (location.pathname === "/history") pageTitle = "Chat History";
  else if (location.pathname === "/settings") pageTitle = "Settings";
  else pageTitle = "DocMind";

  const themes = [
    { name: "Light", value: "light", color: "#F8FAFC" },
    { name: "Midnight Blue", value: "midnight", color: "#2563EB" },
    { name: "Emerald Green", value: "emerald", color: "#059669" },
    { name: "Royal Purple", value: "purple", color: "#8B5CF6" },
    { name: "Warm Graphite", value: "graphite", color: "#D97706" }
  ];

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    setShowThemes(false);
  };

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

        <div className="theme-selector">

          <button
            className="icon-button"
            onClick={() => setShowThemes(!showThemes)}
            title="Change Theme"
            aria-label="Change Theme"
            aria-expanded={showThemes}
          >
            <Palette size={19} />
          </button>

          {showThemes && (
            <div className="theme-dropdown">

              <h3>Choose Theme</h3>

              {themes.map((item) => (
               <button
  key={item.value}
  className={`theme-option ${
    theme === item.value ? "selected" : ""
  }`}
  onClick={() => handleThemeChange(item.value)}
>
                  <span
                    className="theme-color"
                    style={{ background: item.color }}
                  />

                  <span>{item.name}</span>

                  {theme === item.value && (
                    <Check size={17} />
                  )}
                </button>
              ))}

            </div>
          )}

        </div>

        <button className="icon-button" title="Notifications">
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
