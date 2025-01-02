import React, { useState } from "react";
import { getWeatherData } from "../api/weatherApi";
import { WeatherEntry, ApiResponse } from "../interface/WeatherEntry";
import axios from "axios";

const WeatherForecast: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [forecastData, setForecastData] = useState<WeatherEntry[]>([]);
  const [filteredData, setFilteredData] = useState<WeatherEntry[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const recordsPerPage = 6;

  const fetchWeather = async () => {
    try {
      setError("");
      const data: ApiResponse = await getWeatherData(city);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const processedData = data.list.map((entry: any) => ({
        date: new Date(entry.dt * 1000).toDateString().split(" ")[0], 
        time: new Date(entry.dt * 1000).toTimeString().slice(0, 5), 
        tempHigh: Math.round(entry.main.temp_max), 
        tempLow: Math.round(entry.main.temp_min), 
        feelsLike: Math.round(entry.main.feels_like), 
        windSpeed: entry.wind.speed,
        humidity: entry.main.humidity,
        visibility: entry.visibility / 1000,  
        condition: entry.weather[0].description || "Unknow",
      }));

      setForecastData(processedData);
      setFilteredData(processedData); 
      setCurrentPage(0); 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Failed to fetch weather data ${error.response.data.message}`);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to fetch weather data.");
      }


      // Edge Cases i forget to clear data if cirt is invaild 
    setForecastData([]);
    setFilteredData([]);
      

    }
  };


  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    setSelectedFilter(filter);

    const filtered = forecastData.filter((item) => {
      const timeHour = new Date(`1970-01-01T${item.time}`).getHours(); 
      if (filter === "Morning") return timeHour >= 6 && timeHour < 12;
      if (filter === "Afternoon") return timeHour >= 12 && timeHour < 18;
      if (filter === "Evening") return timeHour >= 18 && timeHour < 24;
      if (filter === "Night") return timeHour >= 0 && timeHour < 6;
      return true; 
    });

    setFilteredData(filtered);
    setCurrentPage(0); 
  };


  const paginatedData = filteredData.slice(
    currentPage * recordsPerPage,
    currentPage * recordsPerPage + recordsPerPage
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * recordsPerPage < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="weather-content">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {filteredData.length > 0 && (
        <>
        <div className="displayData">
          <div className="filter-container">
            <label htmlFor="timeFilter">Filter by Time: </label>
            <select
              id="timeFilter"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Morning">Morning (6 AM - 12 PM)</option>
              <option value="Afternoon">Afternoon (12 PM - 6 PM)</option>
              <option value="Evening">Evening (6 PM - 12 AM)</option>
              <option value="Night">Night (12 AM - 6 AM)</option>
            </select>
          </div>


          <div className="forecast-container">
            {paginatedData.map((item, index) => (
             <div className="forecast-item" key={index}>
             <p><strong>{item.date}</strong></p>
             <p>Time: {item.time}</p>
             <p>
               Temperature: H: {item.tempHigh}°C L: {item.tempLow}°C 
               (<span>Feels Like: {item.feelsLike}°C</span>)
             </p>
             <p>Wind Speed: {item.windSpeed} m/s</p>
             <p>Humidity: {item.humidity}%</p>
             <p>Visibility: {item.visibility} km</p>              
             <p className="weather-condition">{item.condition}</p>
           </div>
           
            ))}
          </div>
     

          <div className="pagination-controls">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="pagination-button"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={
                (currentPage + 1) * recordsPerPage >= filteredData.length
              }
              className="pagination-button"
            >
              Next
            </button>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherForecast;
