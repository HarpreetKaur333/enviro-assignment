import React from "react";
import ReactDOM from "react-dom";
import JSONVisualizer from "./JSONVisualizer/JSONVisualizer";

ReactDOM.render(
  <React.StrictMode>
    <JSONVisualizer />
  </React.StrictMode>,
  document.getElementById("json-visualizer-root")
);
