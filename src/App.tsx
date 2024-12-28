import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeatherForecast from "./components/WeatherForecast";
import "./App.css";
import JSONVisualizer from "./JSONVisualizer/JSONVisualizer";

const App: React.FC = () => {
  return (
      <>
        <Header />
        <div className="app-container">
          <WeatherForecast />
        </div>

        <div className="separator">
          <hr />
          <p>Explore JSON Visualization Below</p>
        </div>
  
        <div className="json-container">
          <JSONVisualizer />
        </div>
        <Footer />
      </>
    
  );
};

export default App;
