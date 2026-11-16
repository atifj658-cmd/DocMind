
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />}
           />
          <Route path="/documents" element={<Documents />} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
