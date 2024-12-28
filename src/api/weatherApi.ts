import axios from "axios";
import { ApiResponse } from "../interface/WeatherEntry";

const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "79efc1c2ffc94b3a9416e132517dfe44"; // API key for OpenWeatherMap

export const getWeatherData = async (city: string): Promise<ApiResponse> => {
  try {
    console.log("No Data:", city); // Debugging log
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch weather data.");
  }
};
