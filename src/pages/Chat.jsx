import "./Chat.css";
import { useState } from "react";
function Chat() {
    const [selectedAction, setSelectedAction] = useState("");

const quickActions = [
  { name: "Summary", prompt: "Summarize this document." },
  { name: "Key Points", prompt: "Extract the key points from this document." },
  { name: "Explain", prompt: "Explain this document in simple words." },
  { name: "Quiz", prompt: "Create a quiz based on this document." },
  { name: "Study Notes", prompt: "Create study notes from this document." },
  { name: "Translate", prompt: "Translate this document." }
];
  return (
    <div className="chat-page">

      {/* Page Header */}
      <div className="chat-header">
        <h1>Chat with Documents</h1>
        <p>Ask questions and get answers from your documents.</p>
      </div>

      {/* Document Selection */}
      <div className="chat-document-select">
        <label>Select Document</label>
        <select>
          <option value="">Choose a document</option>
        </select>
      </div>

      {/* Quick Actions */}
      <div className="chat-quick-actions">
  <h3>Quick Actions</h3>

  <div className="quick-action-buttons">
    {quickActions.map((action) => (
      <button
        key={action.name}
        className={
          selectedAction === action.name ? "active" : ""
        }
        onClick={() => setSelectedAction(action.name)}
      >
        {action.name}
      </button>
    ))}
  </div>
</div>

      {/* Chat Area */}
      <div className="chat-container">
        <div className="chat-messages">
          <p>Start a conversation with your documents.</p>
        </div>

        {/* Message Input */}
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask anything about your document..."
          />
          <button>Send</button>
        </div>
      </div>

    </div>
  );
}

export default Chat;
