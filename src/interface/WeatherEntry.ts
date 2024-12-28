
export interface WeatherEntry {
    date: string;
    time: string;
    temp: number;
    condition: string;
  }
  
  export interface ApiResponse {
    list: Array<{
      dt: number;
      main: {
        temp: number;
      };
      weather: Array<{
        description: string;
      }>;
    }>;
  }
  