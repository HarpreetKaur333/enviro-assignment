# React + TypeScript + Vite

Enviro-Assignment:This project (Assignment Code) is a simple weather forecast and JSON visualization tool built using React and TypeScript. It allows users to:

- **React and TypeScript**: Used for its strong typing and component-based architecture.  
- **Axios**: Chosen for handling API requests quickly and efficiently.  
- **Vite**: Preferred for fast builds and a smooth development experience.  
- **OpenWeatherMap API**: Provides reliable weather data.  


_**1. Get weather forecasts for a city using the OpenWeatherMap API.**_  
- 5-Day / 3-Hour Forecast using Free API [OpenWeatherMap Forecast](https://openweathermap.org/forecast5)  
- Search for weather data for any city.  
- Displays a 5-day weather forecast with key details like temperature and conditions.  
- Filter based on periods like morning, evening, and midnight.  


- **API Integration**: Weather data (`weatherApi.ts`) is fetched from the OpenWeatherMap API using Axios.  
  API-related logic is organized in `src/api/weatherApi.ts`.  

- **Components**:  
  - `Header` and `Footer`: Reusable components for the application layout.  
  - `WeatherForecast (WeatherForecast.tsx)`: Handles the weather functionality, including search, display, and error handling.  

- **Interfaces**: Defined in `src/interface/` for strong typing (e.g., `WeatherEntry.ts`).  


This project is designed to focus on clarity and usability, making it a great learning experience for developers.

- **Deployment to GitHub Pages
- Steps to Deploy**
 -  Node.js (v14 or higher) and npm (npm v 10.2.4, Node v20.11.1)

- **Steps to Run Locally**
 - Clone the Repository: git clone https://github.com/HarpreetKaur333/enviro-assignment.git
- Install Dependencies: Npm Install
 - Start the Development Server: npm run dev
- Open your browser and navigate to [http://localhost:3000](http://localhost:3000/enviro-assignment/)

**_Deployment to GitHub Pages_**  

**Steps to Deploy**:  
- Open the `vite.config.ts` file and ensure the `base` is set to the repository name.  
  For example, in my case:  
  ```ts
  base: '/enviro-assignment/'

 -  Build the project: npm run build
  -  Deploy to GitHub Pages using the gh-pages package: npm run deploy
  -  Go to your repository settings on GitHub: Settings->Pages , Under the source select "gh-pages" as Branch
  -  the project will be live at : **https://HarpreetKaur333.github.io/enviro-assignment/**
![image](https://github.com/user-attachments/assets/9ab98faa-c830-4d50-9ebf-ba757514a19e)
![image](https://github.com/user-attachments/assets/867f2df4-e83e-46f1-892d-a00cdee9a10f)
![image](https://github.com/user-attachments/assets/adb2cefc-062f-4585-9f41-d60fef5921ea)





