
import { useState, useEffect, useMemo } from "react";

function Documents() {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Preview ke liye currently selected document
  const [previewFile, setPreviewFile] = useState(null);

  // =====================================
  // 1. Upload Documents
  // =====================================

  const handleUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Sirf allowed extensions wali files accept hongi
    const allowedExtensions = ["pdf", "doc", "docx", "xls", "xlsx"];

    const validFiles = selectedFiles.filter((file) => {
      const extension = file.name.split(".").pop().toLowerCase();

      return allowedExtensions.includes(extension);
    });

    // Pehle se uploaded files ke names ka Set banana
    const existingNames = new Set(
      files.map((file) => file.name.toLowerCase())
    );

    // Duplicate files ko skip karna
    const uniqueFiles = validFiles.filter((file) => {
      const fileName = file.name.toLowerCase();

      if (existingNames.has(fileName)) {
        return false;
      }

      // Naye filename ko Set mein add karna
      existingNames.add(fileName);

      return true;
    });

    // Sirf unique files ko existing list mein add karna
    setFiles((prev) => [...prev, ...uniqueFiles]);

    // Upload result ke mutabiq feedback dena
    if (uniqueFiles.length === 0) {
      setFeedbackMessage(
        "File Already Exists."
      );
    } else if (uniqueFiles.length < selectedFiles.length) {
      setFeedbackMessage(
        "Kuch files add hui hain, jabke duplicate ya unsupported files skip kar di gayi hain."
      );
    } else {
      setFeedbackMessage("Files successfully added.");
    }

    // Input reset karna taake same file dobara select karne par event chale
    e.target.value = "";
  };

  // =====================================
  // 2. Delete Document
  // =====================================

  const handleDelete = (indexToDelete) => {
    // Filter ke zariye selected index wali file remove karna
    setFiles((prev) =>
      prev.filter((file, index) => index !== indexToDelete)
    );

    setFeedbackMessage("Document deleted successfully!");
  };

  // =====================================
  // 3. Format File Size
  // =====================================

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // =====================================
  // 4. Search and Filter
  // =====================================

  const filteredFiles = files.filter((file) => {
    // Search text ko filename mein check karna
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // File ki extension nikalna
    const extension = file.name.split(".").pop().toLowerCase();

    // Selected category ke mutabiq file check karna
    const matchesFilter =
      filterType === "all" ||
      (filterType === "pdf" && extension === "pdf") ||
      (filterType === "word" && ["doc", "docx"].includes(extension)) ||
      (filterType === "excel" && ["xls", "xlsx"].includes(extension));

    return matchesSearch && matchesFilter;
  });

  // =====================================
  // 5. Feedback Message Timer
  // =====================================

  useEffect(() => {
    if (!feedbackMessage) return;

    // Message ko 3 seconds baad automatically hide karna
    const timer = setTimeout(() => {
      setFeedbackMessage("");
    }, 3000);

    // Purana timer cleanup karna
    return () => clearTimeout(timer);
  }, [feedbackMessage]);

  // =====================================
  // 6. PDF Preview URL
  // =====================================

  const previewUrl = useMemo(() => {
  if (!previewFile) return "";

  return URL.createObjectURL(previewFile);
}, [previewFile]);

useEffect(() => {
  return () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };
}, [previewUrl]);
  // =====================================
  // 7. Download Document
  // =====================================

  const handleDownload = (file) => {
    // File ka temporary download URL banana
    const url = URL.createObjectURL(file);

    // Download ke liye temporary link create karna
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;

    // Link click karke download start karna
    document.body.appendChild(link);
    link.click();

    // Temporary link remove karna
    link.remove();

    // Download start hone ke baad URL release karna
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  // =====================================
  // 8. Main UI
  // =====================================

  return (
    <div className="documents-page">

      {/* Page Header */}
      <div className="documents-header">
        <div>
          <h1>My Documents</h1>
          <p>Upload and manage your documents in one place.</p>
        </div>

        <label htmlFor="file-upload" className="upload-btn">
          + Upload Document
        </label>

        <input
          type="file"
          id="file-upload"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          multiple
          hidden
          onChange={handleUpload}
        />
      </div>

      {/* Feedback Message */}
      {feedbackMessage && (
        <p className="upload-message">{feedbackMessage}</p>
      )}

      {/* Search and Filter */}
      <div className="documents-toolbar">
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Documents</option>
          <option value="pdf">PDF</option>
          <option value="word">Word Documents</option>
          <option value="excel">Excel Spreadsheets</option>
        </select>
      </div>

      {/* Documents List */}
      <div className="documents-list">
        {files.length === 0 ? (
          <div className="documents-empty">
            <h3>No documents yet</h3>
            <p>Upload your first document to get started.</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="documents-empty">
            <h3>No matching documents</h3>
            <p>Try another search term.</p>
          </div>
        ) : (
          filteredFiles.map((file) => {
            // Original array mein file ka index find karna
            // Taake search/filter ke baad bhi correct file delete ho
            const originalIndex = files.indexOf(file);

            return (
              <div className="document-item" key={originalIndex}>

                {/* Document Information */}
                <div className="document-info">
                  <span className="document-icon">
                    {file.name.split(".").pop().toUpperCase()}
                  </span>

                  <div>
                    <h4>{file.name}</h4>
                    <p>{formatFileSize(file.size)}</p>
                  </div>
                </div>

                {/* Document Actions */}
                <div className="document-actions">

                  {/* Preview sirf PDF files ke liye */}
                  {file.name.toLowerCase().endsWith(".pdf") && (
                    <button
                      className="preview-btn"
                      onClick={() => setPreviewFile(file)}
                    >
                      Preview
                    </button>
                  )}

                  <button
                    className="download-btn"
                    onClick={() => handleDownload(file)}
                  >
                    Download
                  </button>

                  <button onClick={() => handleDelete(originalIndex)}>
                    Delete
                  </button>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* PDF Preview Modal */}
      {previewFile && (
        <div className="preview-modal">
          <div className="preview-container">

            <div className="preview-header">
              <h3>{previewFile.name}</h3>

              <button
                className="close-preview"
                onClick={() => setPreviewFile(null)}
              >
                ✕
              </button>
            </div>

            {previewUrl && (
              <iframe
                src={previewUrl}
                title="PDF Document Preview"
                className="pdf-viewer"
              />
            )}

          </div>
        </div>
      )}

      {/*
        FRONTEND PHASE:
        File selection, temporary listing, search, filter, delete,
        download and PDF preview are implemented.

        BACKEND PHASE:
        Permanent storage, actual document validation, text extraction
        and RAG processing will be implemented later.
      */}

    </div>
  );
}

export default Documents;
