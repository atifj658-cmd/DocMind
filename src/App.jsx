
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";
import Search from "./pages/Search";

function App() {

  // Shared document library for Documents and Chat pages
  const [files, setFiles] = useState([]);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/documents"
            element={
              <Documents
                files={files}
                setFiles={setFiles}
              />
            }
          />

          <Route
            path="/chat"
            element={
              <Chat
                files={files}
                setFiles={setFiles}
              />
            }
          />

          <Route path="/search" element={<Search />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
