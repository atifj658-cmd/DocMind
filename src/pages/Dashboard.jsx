
import {
  FileText,
  MessageSquare,
  HardDrive,
  Upload
} from "lucide-react";

function Dashboard() {

  const stats = [
    { title: "Total Documents", value: "24", icon: FileText },
    { title: "AI Conversations", value: "18", icon: MessageSquare },
    { title: "Storage Used", value: "120 MB", icon: HardDrive }
  ];

  return (
    <div className="dashboard">

      <div className="welcome-section">
        <div>
          <h1>Welcome to DocMind 👋</h1>
          <p>Your intelligent document workspace.</p>
        </div>

        <button className="upload-btn">
          <Upload size={18} />
          Upload Document
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div className="stat-card" key={item.title}>
              <div className="stat-icon">
                <Icon size={22} />
              </div>

              <p>{item.title}</p>
              <h2>{item.value}</h2>
            </div>
          );
        })}
      </div>

      <div className="recent-section">
        <h2>Recent Documents</h2>
        <p>Your recently uploaded documents will appear here.</p>
      </div>

    </div>
  );
}

export default Dashboard;
