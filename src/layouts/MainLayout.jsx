
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {

  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <div className={`app-shell ${mode}`}>

      <Sidebar />

      <div className="main-content">

        <Navbar
          mode={mode}
          toggleMode={toggleMode}
        />

        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;
