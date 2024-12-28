React + TypeScript + Vite
Enviro-Assignment
This project is a simple weather forecast and JSON visualization tool built using React and TypeScript. It allows users to:

React and TypeScript: Used for its strong typing and component-based architecture.
Axios: Chosen for handling API requests quickly and efficiently.
Vite: Preferred for fast builds and a smooth development experience.
OpenWeatherMap API: Provides reliable weather data.
Features
1. Weather Forecast
Get weather forecasts for a city using the OpenWeatherMap API.
API Used: 5-Day / 3-Hour Forecast Free API.
Key Functionalities:
Search for weather data for any city.
Display a 5-day weather forecast with key details like temperature and conditions.
Filter forecasts by periods like morning, evening, and midnight.
Code Structure
API Integration:

Weather data (weatherApi.ts) is fetched from the OpenWeatherMap API using Axios.
API-related logic is organized in src/api/weatherApi.ts.
Components:

Header and Footer: Reusable components for the application layout.
WeatherForecast (WeatherForecast.tsx): Handles weather functionality, including search, display, and error handling.
Interfaces:

Defined in src/interface/ for strong typing (e.g., WeatherEntry.ts).
2. JSON Visualization and Validation
Visualize and validate JSON data in a hierarchical, collapsible structure.
JSONVisualizer Component (JSONVisualizer.tsx):
Allows users to upload, validate, and view JSON data hierarchically.
Paste or upload JSON data to view it in a collapsible format.
Validates JSON and displays error messages for invalid input.
Deployment
Steps to Run Locally
Clone the Repository:

bash
Copy code
git clone https://github.com/HarpreetKaur333/enviro-assignment.git
Install Dependencies:

bash
Copy code
npm install
Start the Development Server:

bash
Copy code
npm run dev
Open your browser and navigate to:

arduino
Copy code
http://localhost:3000
Steps to Deploy to GitHub Pages
Open the vite.config.ts file and ensure the base is set to the repository name:

ts
Copy code
base: '/enviro-assignment/'
Build the project:

bash
Copy code
npm run build
Deploy to GitHub Pages using the gh-pages package:

bash
Copy code
npm run deploy
Go to your repository settings on GitHub:

Navigate to Settings > Pages.
Under the "Source", select gh-pages as the branch.
Your project will be live at:

arduino
Copy code
https://HarpreetKaur333.github.io/enviro-assignment/
Summary
This project is designed with a focus on clarity and usability, making it a great learning experience for developers. It provides hands-on experience with integrating APIs, building reusable components, and deploying to GitHub Pages.
