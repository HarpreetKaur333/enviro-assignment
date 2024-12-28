
export interface WeatherEntry {
  date: string;
  time: string;
  tempHigh: number; 
  tempLow: number;  
  feelsLike: number; 
  condition?: string;
  windSpeed: number;
  humidity: number;
  visibility: number;
  precipitation?: number;
  sunrise?: string;
  sunset?: string;
}

  
export interface ApiResponse {
  city: {
    name: string;
    sunrise?: number; 
    sunset?: number; 
  };
  list: Array<{
    dt: number; 
    main: {
      temp: number; 
      temp_max: number; 
      temp_min: number; 
      feels_like: number; 
      humidity: number; 
    };
    weather: Array<{
      description: string; 
    }>;
    wind: {
      speed: number; 
    };
    visibility: number; 
    pop?: number; 
  }>;
}

  