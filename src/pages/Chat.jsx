
import "./Chat.css";
import { useState, useEffect, useRef } from "react";

function Chat({ files, setFiles }) {
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  const [documentDropdownOpen, setDocumentDropdownOpen] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const uploadInputRef = useRef(null);

  const attachmentRef = useRef(null);
const documentRef = useRef(null);

useEffect(() => {
  const handleOutsideClick = (event) => {
    if (
      attachmentRef.current &&
      !attachmentRef.current.contains(event.target) &&
      documentRef.current &&
      !documentRef.current.contains(event.target)
    ) {
      setAttachmentMenuOpen(false);
      setDocumentDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, []);

  const quickActions = [
    { name: "Summary", prompt: "Summarize the selected documents." },
    { name: "Key Points", prompt: "Extract the key points from the selected documents." },
    { name: "Explain", prompt: "Explain the selected documents in simple words." },
    { name: "Quiz", prompt: "Create a quiz based on the selected documents." },
    { name: "Study Notes", prompt: "Create study notes from the selected documents." },
    { name: "Translate", prompt: "Translate the selected documents." }
  ];

  // Combine existing library documents and temporary attachments for preview
  const selectedAttachments = selectedDocuments
    .map((id) =>
      pendingFiles.find((file) => file.id === id) ||
      files.find((file) => file.id === id)
    )
    .filter(Boolean);

  // Handle new document selection
  const handleChatUpload = (e) => {
    const chosenFiles = Array.from(e.target.files);
    const allowedExtensions = ["pdf", "doc", "docx", "xls", "xlsx"];

    let newPendingFiles = [...pendingFiles];
    let newSelectedDocuments = [...selectedDocuments];
    let addedCount = 0;
    let duplicateCount = 0;
    let invalidCount = 0;

    chosenFiles.forEach((file) => {
      const extension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        invalidCount++;
        return;
      }

      const existingFile = files.find(
        (item) => item.name.toLowerCase() === file.name.toLowerCase()
      );

      const pendingFile = newPendingFiles.find(
        (item) => item.name.toLowerCase() === file.name.toLowerCase()
      );

      // Reuse an existing library document instead of uploading it again
      if (existingFile || pendingFile) {
        const existingId = existingFile?.id || pendingFile?.id;

        if (!newSelectedDocuments.includes(existingId)) {
          if (newSelectedDocuments.length < 2) {
            newSelectedDocuments.push(existingId);
            duplicateCount++;
          }
        }
        return;
      }

      if (newSelectedDocuments.length >= 2) return;

      const newFile = {
        id: crypto.randomUUID(),
        file: file,
        name: file.name,
        size: file.size
      };

      newPendingFiles.push(newFile);
      newSelectedDocuments.push(newFile.id);
      addedCount++;
    });

    setPendingFiles(newPendingFiles);
    setSelectedDocuments(newSelectedDocuments);

    if (addedCount || duplicateCount) {
      setUploadMessage(
        `${addedCount + duplicateCount} document(s) attached successfully.`
      );
    } else if (invalidCount) {
      setUploadMessage("Please select supported PDF, Word or Excel files.");
    } else if (newSelectedDocuments.length >= 2) {
      setUploadMessage("Maximum 2 documents can be attached per message.");
    }

    e.target.value = "";
  };

  // Select or unselect an existing library document
  const handleDocumentSelect = (id) => {
    setSelectedDocuments((prev) => {
      if (prev.includes(id)) {
        return prev.filter((documentId) => documentId !== id);
      }

      if (prev.length >= 2) {
        setUploadMessage("Maximum 2 documents can be attached per message.");
        return prev;
      }

      setUploadMessage("");
      return [...prev, id];
    });
  };

  // Remove an attachment without deleting it from My Documents
  const handleRemoveAttachment = (id) => {
    setSelectedDocuments((prev) => prev.filter((item) => item !== id));

    setPendingFiles((prev) =>
      prev.filter((file) => file.id !== id)
    );
  };

  // Send message and add new attachments to the shared document library
  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage && selectedAttachments.length === 0) return;

    const newMessage = {
      id: crypto.randomUUID(),
      content: trimmedMessage,
      attachments: selectedAttachments.map((file) => ({
        id: file.id,
        name: file.name
      }))
    };

    setMessages((prev) => [...prev, newMessage]);

    if (pendingFiles.length > 0) {
      setFiles((prev) => {
        const newFiles = pendingFiles.filter(
          (newFile) => !prev.some((file) => file.id === newFile.id)
        );

        return [...prev, ...newFiles];
      });
    }

    setPendingFiles([]);
    setSelectedDocuments([]);
    setMessage("");
    setSelectedAction("");
    setUploadMessage("");
  };

  const handleQuickAction = (action) => {
    setSelectedAction(action.name);
    setMessage(action.prompt);
  };

  return (
    <div className="chat-page">

      {/* Page Header */}
      <div className="chat-header">
        <h1>Chat with Documents</h1>
        <p>Ask questions and get answers from your documents.</p>
      </div>

      {/* Quick Actions */}
      <div className="chat-quick-actions">
        <h3>Quick Actions</h3>

        <div className="quick-action-buttons">
          {quickActions.map((action) => (
            <button
              type="button"
              key={action.name}
              className={selectedAction === action.name ? "active" : ""}
              onClick={() => handleQuickAction(action)}
            >
              {action.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-container">

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="chat-empty-state">
              <i className="fa-regular fa-comments"></i>
              <p>Start a conversation with your documents.</p>
            </div>
          ) : (
            messages.map((item) => (
              <div className="user-message" key={item.id}>
                {item.content && <p>{item.content}</p>}

                {item.attachments.length > 0 && (
                  <div className="message-attachments">
                    {item.attachments.map((attachment) => (
                      <span key={attachment.id}>
                        <i className="fa-regular fa-file-lines"></i>
                        {attachment.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Message Composer */}
        <div className="chat-composer">

          {/* Selected Document Previews */}
          {selectedAttachments.length > 0 && (
            <div className="attachment-preview">
              {selectedAttachments.map((file) => (
                <div className="attachment-card" key={file.id}>
                  <i className="fa-regular fa-file-lines"></i>

                  <span title={file.name}>{file.name}</span>

                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(file.id)}
                    aria-label={`Remove ${file.name}`}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploadMessage && (
            <p className="upload-status">{uploadMessage}</p>
          )}

          {/* Input Area */}
          <div className="chat-input-area">

            {/* Attachment Menu */}
            <div className="attachment-menu-wrapper" ref={attachmentRef}>
              <button
  type="button"
  className="attachment-icon-btn"
  onClick={() => {
    setAttachmentMenuOpen((prev) => !prev);
    setDocumentDropdownOpen(false);
  }}
  aria-label="Attach documents"
  title="Attach documents"
>
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.82l8.49-8.48" />
  </svg>
</button>

              {attachmentMenuOpen && (
                <div className="attachment-menu">

                 <button
  type="button"
  className="attachment-menu-item"
  onClick={() => {
    setAttachmentMenuOpen(false);
    uploadInputRef.current?.click();
  }}
>
  <i className="fa-solid fa-upload"></i>
  Upload New Document
</button>
                  <button
                    type="button"
                    className="attachment-menu-item"
                    onClick={() => {
                      setDocumentDropdownOpen((prev) => !prev);
                      setAttachmentMenuOpen(false);
                    }}
                  >
                    <i className="fa-regular fa-folder-open"></i>
                    Choose from My Documents
                  </button>

                </div>
              )}

             <input
  ref={uploadInputRef}
  id="chat-file-upload"
  type="file"
  accept=".pdf,.doc,.docx,.xls,.xlsx"
  multiple
  hidden
  onChange={handleChatUpload}
/>
            </div>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Ask anything about your documents..."
            />

            <button type="button" onClick={handleSend}>
              Send
            </button>
          </div>

          {/* Existing Document Dropdown */}
          {documentDropdownOpen && (
            <div className="document-dropdown" ref={documentRef}>
              <div className="document-dropdown-header">
                <strong>My Documents</strong>
                <button
                  type="button"
                  onClick={() => setDocumentDropdownOpen(false)}
                  aria-label="Close document list"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {files.length === 0 ? (
                <p className="no-documents">
                  No documents available. Upload documents first.
                </p>
              ) : (
                <div className="document-dropdown-list">
                  {files.map((file) => (
                    <label className="document-option" key={file.id}>
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(file.id)}
                        onChange={() => handleDocumentSelect(file.id)}
                        disabled={
                          !selectedDocuments.includes(file.id) &&
                          selectedDocuments.length >= 2
                        }
                      />
                      <span>{file.name}</span>
                    </label>
                  ))}
                </div>
              )}

              <p className="document-limit">Select up to 2 documents per message.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Chat;
