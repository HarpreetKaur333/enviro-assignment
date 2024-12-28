import React, { useState } from "react";

// JSONVisualizer Component
const JSONVisualizer: React.FC = () => {
  const [jsonInput, setJsonInput] = useState(""); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [parsedJSON, setParsedJSON] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null); 


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          setParsedJSON(json);
          setError(null);
        } catch {
          setError("Invalid JSON file!");
          setParsedJSON(null);
        }
      };
      reader.readAsText(file);
    }
  };


  const handleVisualize = () => {
    try {
      const json = JSON.parse(jsonInput);
      setParsedJSON(json);
      setError(null);
    } catch {
      setError("Invalid JSON input!");
      setParsedJSON(null);
    }
  };

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderJSON = (data: any, depth = 0): JSX.Element => {
    if (typeof data !== "object" || data === null) {
      return <span>{String(data)}</span>;
    }

    return (
      <ul style={{ marginLeft: depth * 20 }}>
        {Object.keys(data).map((key) => (
          <li key={key}>
            <strong>{key}:</strong>{" "}
            {typeof data[key] === "object" && data[key] !== null
              ? renderJSON(data[key], depth + 1)
              : String(data[key])}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>JSON Visualizer</h1>

      <textarea
        placeholder="Enter your JSON here..."
        value={jsonInput}
        onChange={handleInputChange}
        rows={8}
        style={{
          width: "100%",
          marginBottom: "10px",
          fontSize: "16px",
          padding: "10px",
        }}
      />


      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        style={{ marginBottom: "10px" }}
      />


      <button
        onClick={handleVisualize}
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Visualize JSON
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {parsedJSON && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
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
