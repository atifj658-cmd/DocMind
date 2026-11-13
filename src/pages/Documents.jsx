import {useState} from "react";
function Documents() {
  const [files, setFiles] = useState([]);
  return (
    <div className="documents-page">
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
  accept=".pdf"
  multiple
  hidden
  onChange={(e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    e.target.value = "";
  }}
/>
      </div>

      <div className="documents-toolbar">
        <input type="text" placeholder="Search documents..." />
        <select>
          <option>All Documents</option>
          <option>PDF</option>
          <option>Word</option>
        </select>
      </div>

    <div className="documents-list">
  {files.length === 0 ? (
    <>
      <h3>No documents yet</h3>
      <p>Upload your first document to get started.</p>
    </>
  ) : (
    files.map((file, index) => (
      <div className="document-item" key={`${file.name}-${index}`}>
        <span>📄 {file.name}</span>

        <button onClick={() => {
          setFiles((prev) => prev.filter((_, i) => i !== index));
        }}>
          Delete
        </button>
      </div>
    ))
  )}
</div>
    </div>
  );}


export default Documents;