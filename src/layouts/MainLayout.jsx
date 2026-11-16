
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {

  const [theme, setTheme] = useState("light");

  return (
    <div className={`app-shell ${theme}`}>

      <Sidebar />

      <div className="main-content">

        <Navbar
          theme={theme}
          setTheme={setTheme}
        />

        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;
