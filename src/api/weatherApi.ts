import axios from "axios";
import { ApiResponse } from "../interface/WeatherEntry";

const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "79efc1c2ffc94b3a9416e132517dfe44"; 

//API key of public weather PAI for 5day forecast

export const getWeatherData = async (city: string): Promise<ApiResponse> => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      return response.data;
    } catch (error) {
        // Re-throw the error for the calling function to handle
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message || "Failed to fetch weather data.");
        } else if (error instanceof Error) {
          throw error;
        } else {
          throw new Error("Unknown error occurred.");
        }
      }
  };


