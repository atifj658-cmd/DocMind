
import { useState } from "react";
import {
  Search as SearchIcon,
  Sparkles,
  FileText
} from "lucide-react";
import "./Search.css";

// TEMPORARY: Demo data for frontend testing.
// Replace this data with real RAG API results during backend integration.
const sampleResults = [
  {
    id: 1,
    document: "Research_Paper.pdf",
    page: "Page 4",
    snippet:
      "Artificial Intelligence enables computer systems to perform tasks that normally require human intelligence."
  },
  {
    id: 2,
    document: "Machine_Learning_Notes.pdf",
    page: "Page 7",
    snippet:
      "Machine learning is a branch of AI that allows systems to learn patterns from data and improve their performance."
  },
  {
    id: 3,
    document: "AI_Study_Guide.pdf",
    page: "Page 12",
    snippet:
      "Deep learning uses neural networks with multiple layers to process complex information and identify patterns."
  }
];

function Search() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [error, setError] = useState("");

  const suggestions = [
    "Summarize my documents",
    "Find important topics",
    "Key information"
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Please enter something to search.");
      setSubmittedQuery("");
      return;
    }

    setError("");
    setSubmittedQuery(trimmedQuery);
  };

  const handleSuggestion = (suggestion) => {
    setQuery(suggestion);
    setError("");
  };

  return (
    <div className="search-page">

      {/* Search Header */}
      <div className="search-header">
        <div className="search-heading">
          <Sparkles size={24} />
          <h1>AI Search</h1>
        </div>

        <p>
          Find answers and discover information across your documents.
        </p>
      </div>

      {/* Search Input */}
      <div className="ai-search-container">

        <form className="ai-search-box" onSubmit={handleSearch}>
          <SearchIcon size={21} />

          <input
            type="text"
            placeholder="Ask anything about your documents..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setError("");
            }}
          />

          <button
            type="submit"
            className="ai-search-button"
          >
            <SearchIcon size={17} />
            Search
          </button>
        </form>

        {error && (
          <p className="search-error">{error}</p>
        )}

        {/* Suggested Queries */}
        <div className="search-suggestions">
          <span>Try asking:</span>

          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestion(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>

      </div>

      {/* Search Results */}
      <div className="search-results">

        <div className="search-results-header">
          <h2>
            {submittedQuery ? "Results for your search" : "Search Results"}
          </h2>
        </div>

        {!submittedQuery ? (

          <div className="search-empty-state">
            <div className="search-empty-icon">
              <SearchIcon size={30} />
            </div>

            <h3>Discover Your Documents</h3>

            <p>
              Enter a question above to find relevant information
              from your uploaded documents.
            </p>
          </div>

        ) : (

          <div className="search-results-content">

            <p className="search-query-label">
              Showing temporary demo results for: <strong>{submittedQuery}</strong>
            </p>

            {sampleResults.map((result) => (
              <div className="search-result-card" key={result.id}>

                <div className="search-result-top">
                  <div className="search-result-file">
                    <FileText size={19} />
                    <span>{result.document}</span>
                  </div>

                  <span className="search-result-page">
                    {result.page}
                  </span>
                </div>

                <p className="search-result-snippet">
                  {result.snippet}
                </p>

                <span className="demo-result-label">
                  Demo Result
                </span>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Search;
