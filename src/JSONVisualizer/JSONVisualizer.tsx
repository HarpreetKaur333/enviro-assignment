import React, { useState } from "react";

// JSONVisualizer Component
const JSONVisualizer: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>(""); // Stores the JSON input from the textarea
  const [parsedJSON, setParsedJSON] = useState<Record<string, unknown> | null>(null); // Stores the parsed JSON
  const [error, setError] = useState<string | null>(null); // Stores any error message

  // Handle input change from textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setJsonInput(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        try {
          const parsed = JSON.parse(fileContent) as Record<string, unknown>;
          setParsedJSON(parsed);
          setError(null); // Clear error if JSON is valid
        } catch (err: unknown) {
          if (err instanceof SyntaxError) {
            setError("Invalid JSON file.");
          } else {
            setError("Error while Working on File.");
          }
          setParsedJSON(null); // Reset parsed output
        }
      };
      reader.readAsText(file);
    }
  };

  // Parse and validate JSON input from textarea
  const handleVisualize = (): void => {
    try {
      const parsed = JSON.parse(jsonInput) as Record<string, unknown>;
      setParsedJSON(parsed);
      setError(null); // Clear error if JSON is valid
    } catch (err: unknown) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON.");
      } else {
        setError("Error while working on file.");
      }
      setParsedJSON(null); // Reset parsed output
    }
  };

  // Render JSON recursively in a hierarchical structure
  const renderJSON = (data: Record<string, unknown> | null, depth = 0): JSX.Element | null => {
    if (!data) return null;

    return (
      <ul style={{ marginLeft: depth * 20, listStyleType: "none" }}>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong>{" "}
            {value && typeof value === "object"
              ? renderJSON(value as Record<string, unknown>, depth + 1)
              : String(value)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>

      {/* Textarea for JSON Input */}
      <textarea
        placeholder="Paste JSON here.."
        value={jsonInput}
        onChange={handleInputChange}
        rows={8}
        style={{
          width: "100%",
          fontSize: "16px",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      {/* File Upload Input */}
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        style={{ display: "block", marginBottom: "10px" }}
      />

      {/* Visualize Button */}
      <button
        onClick={handleVisualize}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Visualize JSON
      </button>

      {/* Error Message */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {/* Render Parsed JSON */}
      {parsedJSON && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>Parsed JSON:</h3>
          {renderJSON(parsedJSON)}
        </div>
      )}
    </div>
  );
};

export default JSONVisualizer;
