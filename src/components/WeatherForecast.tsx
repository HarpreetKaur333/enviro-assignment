import React, { useState } from "react";
import { getWeatherData } from "../api/weatherApi";
import { WeatherEntry } from "../interface/WeatherEntry";
import axios from "axios";

const WeatherForecast: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [forecastData, setForecastData] = useState<WeatherEntry[]>([]);
  const [filteredData, setFilteredData] = useState<WeatherEntry[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const recordsPerPage = 5;

  // Fetch weather data
  const fetchWeather = async () => {
    try {
      setError("");
      const data = await getWeatherData(city);

      // Process data to group by day and time
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const processedData = data.list.map((entry: any) => ({
        date: new Date(entry.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        time: new Date(entry.dt * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Use 24-hour format for easier filtering
        }),
        temp: Math.round(entry.main.temp),
        condition: entry.weather[0].description,
      }));

      setForecastData(processedData);
      setFilteredData(processedData); // Initialize filtered data with all data
      setCurrentPage(0); // Reset pagination
    } catch (error) {
      // Check if the error is an instance of AxiosError (if using Axios)
      if (axios.isAxiosError(error) && error.response) {
        setError(`API Error: ${error.response.data.message}`);
      } else if (error instanceof Error) {
        // If the error has a message property
        setError(error.message);
      } else {
        setError("Unknown error occurred.");
      }
    }
  };

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    setSelectedFilter(filter);

    // Filter data by time interval
    const filtered = forecastData.filter((item) => {
      const timeHour = new Date(`1970-01-01T${item.time}`).getHours(); // Extract hour
      if (filter === "Morning") return timeHour >= 6 && timeHour < 12;
      if (filter === "Afternoon") return timeHour >= 12 && timeHour < 18;
      if (filter === "Evening") return timeHour >= 18 && timeHour < 24;
      if (filter === "Night") return timeHour >= 0 && timeHour < 6;
      return true; // Default to "All"
    });

    setFilteredData(filtered);
    setCurrentPage(0); // Reset pagination
  };

  // Paginate filtered data
  const paginatedData = filteredData.slice(
    currentPage * recordsPerPage,
    currentPage * recordsPerPage + recordsPerPage
  );

  // Handle pagination
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
          <h3>5-Day Weather Forecast</h3>

          {/* Filter Dropdown */}
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

          {/* Forecast Table */}
          <div className="forecast-container">
            {paginatedData.map((item, index) => (
              <div className="forecast-item" key={index}>
                <p>{item.date}</p>
                <p>{item.time}</p>
                <p>{item.temp}°C</p>
                <p>{item.condition}</p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
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
        </>
      )}
    </div>
  );
};

export default WeatherForecast;
